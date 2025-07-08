import sys
import json
import os
import re
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
import cohere
from functools import lru_cache

COHERE_API_KEY = "92hecdax2u9Ix9cGjcpEYhrMaB6Tl3UfJKCS2Fxt" 
co = cohere.ClientV2(COHERE_API_KEY)


def clean_tags(raw_tags: str) -> str:
    clean = re.sub(r'[^a-zA-Z0-9\s]', ' ', raw_tags)
    clean = clean.lower()
    clean = re.sub(r'\s+', ' ', clean).strip()
    tokens = [t for t in clean.split() if t not in ENGLISH_STOP_WORDS]
    return " ".join(tokens)


BASE_DIR = os.path.dirname(__file__)
csv_path = os.path.join(BASE_DIR, "cleaned_data.csv")
df = pd.read_csv(csv_path)

df["tags"] = df["tags"].astype(str)
df["clean_tags"] = df["tags"].apply(clean_tags)

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["clean_tags"])


def recommend(input_tag_str):
    cleaned_input = clean_tags(input_tag_str)
    query_vector = vectorizer.transform([cleaned_input])
    cos_sim = cosine_similarity(query_vector, tfidf_matrix).flatten()
    top_indices = cos_sim.argsort()[-10:][::-1]
    return df.iloc[top_indices][["code","product_name", "clean_tags", "brands", "image_url"]].to_dict(orient="records")



def extract_text_from_content(content_list):
    texts = []
    for item in content_list:
        text = getattr(item, 'text', '')
        if text:
            texts.append(text)
    return " ".join(texts).strip()

@lru_cache(maxsize=512)
def generate_description(tags: str) -> str:
    system_message = "You are a helpful assistant that writes natural and engaging product descriptions."
    user_message = (
        f"Write a detailed, natural, and factfull 100-word product description in english"
        f"based on these features: {tags}. Use varied language and avoid repetition."
    )
    try:
        response = co.chat(
            model="command-xlarge-nightly",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message},
            ],
            max_tokens=150,
            temperature=0.75,
            stop_sequences=["--"]
        )
        content = response.message.content

        if isinstance(content, list):
            description = extract_text_from_content(content)
        elif isinstance(content, str):
            description = content.strip()
        else:
            description = str(content)

        return description

    except Exception as e:
        return f"Description generation failed: {str(e)}"


if __name__ == "__main__":
    input_json = sys.argv[1] if len(sys.argv) > 1 else '{}'
    input_dict = json.loads(input_json)
    input_tags_str = input_dict.get("tags", "")

    recs = recommend(input_tags_str)

    for product in recs:
        product_tags = product.get("clean_tags", "")
        product["description"] = generate_description(product_tags)

    for product in recs:
        for k, v in product.items():
         if isinstance(v, float) and pd.isna(v):
            product[k] = None

    output = {
         "recommendations": recs
    }

    print(json.dumps(output, ensure_ascii=False, indent=2))
