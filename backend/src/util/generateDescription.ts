import { exec } from "child_process";
import path from "path";

const generateDescription = async(tags: string):Promise<string> => {
await new Promise(resolve => setTimeout(resolve, 3000));
  //   const scriptPath = path.join(__dirname, "../model/generateDescription.py");
  //   const command = `python3 "${scriptPath}" "${tags.replace(/"/g, '\\"')}"`;
  //
  //   exec("python3", 
  //     []
  //     ,(error, stdout, stderr) => {
  //     if (error) {
  //       reject(`Execution error: ${error.message}`);
  //       return;
  //     }
  //     try {
  //       const output = JSON.parse(stdout);
  //       if (output.description) {
  //         resolve(output.description);
  //       } else {
  //         reject(output.error || "Unknown error");
  //       }
  //     } catch (parseErr) {
  //       reject(`JSON parse error: ${parseErr}`);
  //     }
  //   });
  // });
 return "aditya"
}

export default generateDescription
