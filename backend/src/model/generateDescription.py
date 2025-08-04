import json
import os
import sys
import cohere
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("cohere_api_key") 
COHERE_API_KEY = api_key
co = cohere.ClientV2(COHERE_API_KEY)

def extract_text_from_content(content_list):
    texts = []
    for item in content_list:
        text = getattr(item, 'text', '')
        if text:
            texts.append(text)
    return " ".join(texts).strip()

def generate_description(tags: str):
    system_message = "You are a helpful assistant that writes natural and engaging product descriptions."
    user_message = (
        f"Write a detailed, natural, and factful 100-word product description in English "
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
            stop_sequences=["--"],
        )

        content = response.message.content

        description = content.strip() if isinstance(content, str) else str(content)
        print(json.dumps({"description": description}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))


if __name__ == "__main__":
    input_data = sys.argv[1] if len(sys.argv) > 1 else ""
    generate_description(input_data)
