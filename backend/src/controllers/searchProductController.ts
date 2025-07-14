import { Request, Response } from "express";
import pool from "../db/setupDB";
import path from "path";
import { execFile, ExecFileException } from "child_process";
import { error } from "console";

const searchProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, type, data } = req.body.input;

    let tags: string = "";

    if (type === "barcode") {
      const product = await pool.query(
        "Select * FROM product WHERE product_id = $1",
        [data],
      );
      if (product.rows.length > 0) {
        tags = product.rows[0].clean_tags;
      } else {
        const scriptPath = path.join(__dirname, "../model/barcodeSearch.py");
        const csvPath = path.join(
          __dirname,
          "../model/data_with_eco_score.csv",
        );
        execFile(
          "python3",
          [scriptPath, data, csvPath],
          (error: ExecFileException | null, stdout: string, stderr: string) => {
            if (error) {
              console.error("Python error:", stderr);
              return res
                .status(500)
                .json({ error: "Error executing Python script" });
            }

            const { found, product } = JSON.parse(stdout);

            if (found === true) {
              tags = product.tags;
            }
            else{
               return res
              .status(200)
              .json({ message: "Product not found" });
            }
          },
        );
      }
    } else if (type === "prompt") {
      tags = data;
    } else {
      res.status(400).json({
        message: "Input method is invalid",
      });
    }

    const response = await fetch(
      `http://localhost:${process.env.PORT}/api/recommend`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ tags }),
      },
    );

    const { recommendations } = await response.json();

    res.status(200).json({
      message: "Products fetched sucessfully",
      products: recommendations,
    });
  } catch (error) {
    console.error("Error in searching products: ", error);
  }
};

export default searchProductController;
