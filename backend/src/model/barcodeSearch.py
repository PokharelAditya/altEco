import json
import sys

import pandas as pd


def barcode_search(barcode, csv_file):
    try:
        df = pd.read_csv(csv_file)
        result = df[df["code"] == barcode]
        if result.empty:
            print(json.dumps({"found": False, "message": "Product not found"}))
        else:
            product = result.iloc[0].to_dict()
            print(json.dumps({"found": True, "product": product}))
    except Exception as e:
        print(json.dumps({"Error: ": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Usage: python search_product.py <barcode> <csv_file>"}))
    else:
        barcode = sys.argv[1]
        csv_file = sys.argv[2]
        barcode_search(barcode, csv_file)
