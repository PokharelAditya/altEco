# altEco: Eco-Friendly Product Recommendation System

II Year / II Semester project — a web-based recommendation system that helps users discover eco-friendly products through intelligent, tag-based matching.

## Overview

altEco uses **TF-IDF vectorization** and **cosine similarity** to match product tags and surface eco-conscious alternatives, whether you're browsing your personalized feed, searching manually, or scanning a barcode to find a greener swap.

## Features

**User Authentication & Profile**
- Secure login and registration with OTP-based verification
- Profile setup with personal eco-preferences

**Homepage Recommendations**
- Product recommendations powered by TF-IDF vectorization and cosine similarity on product tags
- Personalized feed based on preferences and recent activity

**Product Discovery**
- Manual search using cosine similarity matching
- Barcode scan — recommends alternatives based on a scanned product's tags

**Eco Score Calculator**
- Tag-based estimation of a product's environmental impact

**Collections**
- Favorites, Review Later, and Not Interested lists
- Add, view, and manage saved products

**Dashboard**
- Overview of user activity
- Visual charts and graphs of eco-contributions over time

## Tech Stack

- **Frontend:** ReactJS, TypeScript, HTML, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Machine Learning:** Python (Pandas, NumPy, Scikit-learn) for TF-IDF/cosine similarity
- **Other:** Cohere Generative AI for text generation, Open Food Facts dataset as a product data source

## Project Structure

| Folder | Purpose |
|---|---|
| `frontend/` | React client application |
| `backend/` | Express/Node API server |
| `docs/` | Project documentation |
| `file.sql` | Database schema |

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- PostgreSQL (running locally or hosted)
- Python 3.x with `pandas`, `numpy`, and `scikit-learn` installed (for the recommendation engine)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PokharelAditya/altEco.git
   cd altEco
   ```

2. **Set up the database**

   Create a PostgreSQL database and run the schema in `file.sql` against it.

3. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in `backend/` with your PostgreSQL connection details, any API keys (e.g. Cohere), and other required config.

5. **Run the app**
   ```bash
   # Terminal 1 — backend
   cd backend
   npm start

   # Terminal 2 — frontend
   cd frontend
   npm run dev
   ```

## Contributors

- Aditya Pokharel
- Rochak Adhikari
- Nikunj Pokharel
- Suyog Basnet
- Nerish Shrestha

## License

MIT — see [LICENSE](./LICENSE) for details.
