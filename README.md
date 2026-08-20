# altEco

An eco-friendly product recommendation system that helps users discover sustainable alternatives using machine learning. Built with React, Node.js, PostgreSQL, and Python.

Users can browse a personalized feed, search by text, or scan a product barcode -- and the system recommends greener alternatives using TF-IDF vectorization and cosine similarity on product tags. Product data is sourced from the [Open Food Facts](https://world.openfoodfacts.org/) dataset, and AI-generated descriptions are powered by the [Cohere](https://cohere.com/) API.

## Features

### Personalized Recommendations
- TF-IDF vectorization + cosine similarity matching on product tags
- Feed personalized to user-selected eco-preferences (vegan, organic, plastic-free, fair-trade, etc.)
- Trending and recently viewed product tabs

### Product Discovery
- **Text search** -- keyword-based search with cosine similarity matching against the product dataset
- **Barcode scanner** -- scan a product barcode with your device camera (via ZXing), look it up, and get eco-friendly alternatives based on its tags

### Eco Score Calculator
- Interactive tag selection tool (positive tags: organic, recyclable, biodegradable; negative tags: plastic, processed, sugar)
- Weighted scoring formula: `score = 50 + (100/PI) * atan(posScore - negScore)`, producing a 0-100 score

### Collections
- **Favorites**, **Review Later**, and **Not Interested** lists
- Full CRUD with cross-collection movement (e.g., move from Review Later to Favorites)

### Dashboard & Analytics
- Collection breakdown (pie chart)
- Eco score profile (radial bar chart of favorited products' scores)
- Collection journey timeline (area chart over 6 months)
- Rating distribution (bar chart)
- Metric cards: Products Explored, Favorites, Average Rating, Eco Commitment %

### Authentication
- Email/password registration with OTP verification (via Nodemailer/Gmail SMTP)
- Google OAuth sign-in via Firebase Auth
- JWT-based sessions (access token: 10 min, refresh token: 10 days)

### AI-Generated Descriptions
- Products without descriptions get a 100-word AI-generated description via the Cohere API (`command-xlarge-nightly` model)
- Descriptions are cached in the database after generation

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 6, Tailwind CSS 4, React Router DOM 7, Recharts, Lucide React, ZXing (barcode scanning), Firebase Auth |
| **Backend** | Node.js, Express 5, TypeScript, JWT, bcrypt, Nodemailer, Firebase Admin SDK |
| **Database** | PostgreSQL |
| **ML / AI** | Python 3 (Pandas, NumPy, Scikit-learn), Cohere API |

## Project Structure

```
altEco/
  backend/
    src/
      routes/          # Express route definitions
      controllers/     # Business logic
      middlewares/     # Auth (JWT + Firebase), input validation
      db/              # PostgreSQL queries and table setup
      model/           # Python ML scripts (recommendation, cosine similarity, eco score)
      util/            # Helpers (token generation, email, Python script wrappers)
      app.ts           # Express app setup
      server.ts        # Server entry point
  frontend/
    src/
      components/      # React components (pages + UI)
      context/         # Auth context provider
      utils/           # Helper functions
      App.tsx          # Router with all routes
  docs/
    ER Diagram.png
    Schema Diagram.png
    Use Case Diagram.png
    Flowchart.png
    Proposal/          # Project proposal (PDF)
    Report/            # Project report (PDF)
    Presentation/      # Presentation slides (PPTX)
  file.sql             # Full PostgreSQL schema + seed data
```

## Getting Started

### Prerequisites

- **Node.js** (latest LTS)
- **PostgreSQL** (local or hosted)
- **Python 3.x** with the following packages:
  ```
  pandas numpy scikit-learn cohere psycopg2 python-dotenv requests
  ```

### 1. Clone the repository

```bash
git clone https://github.com/PokharelAditya/altEco.git
cd altEco
```

### 2. Set up the database

Create a PostgreSQL database, then load the schema and seed data:

```bash
psql -U <username> -d <database_name> -f file.sql
```

Alternatively, you can run the seeding script after installing backend dependencies:

```bash
cd backend && npm run seed
```

### 3. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 4. Configure environment variables

**Backend** -- create `backend/.env`:

| Variable | Description |
|---|---|
| `PORT` | Server port (e.g., `6886`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `ACCESS_TOKEN_SECRET` | Secret for signing JWT access tokens |
| `REFRESH_TOKEN_SECRET` | Secret for signing JWT refresh tokens |
| `EMAIL` | Gmail address for sending OTP emails |
| `SENDMAIL_PASSWORD` | Gmail app password for SMTP |
| `cohere_api_key` | Cohere API key for description generation |

You also need a Firebase Admin private key at `backend/config/firebase-private-key.json`. Download this from your Firebase project settings (Service Accounts tab).

**Frontend** -- create `frontend/.env`:

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECTID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDERID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APPID` | Firebase app ID |

### 5. Run the app

```bash
# Terminal 1 -- backend
cd backend
npm start

# Terminal 2 -- frontend
cd frontend
npm run dev
```

The frontend dev server proxies `/api` requests to `http://localhost:4000` (configured in `vite.config.ts`).

## API Routes

All routes are mounted under `/api`.

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth` | Session check + Firebase token login |
| `POST` | `/api/login` | Email/password login |
| `POST` | `/api/signup` | User registration with OTP |
| `POST` | `/api/search-product` | Cosine similarity product search |
| `POST` | `/api/recommend` | Get personalized recommendations |
| `POST` | `/api/get_eco_score` | Calculate eco score from tags |
| `GET` | `/api/get-sample-products` | Sample products for browsing |
| `GET` | `/api/get-trending-products` | Trending products across users |
| `GET` | `/api/get-recent-products` | User's recently viewed products |
| `GET/POST/DELETE` | `/api/favorites` | Manage favorites collection |
| `GET/POST/DELETE` | `/api/review-later` | Manage review later collection |
| `GET/POST/DELETE` | `/api/not-interested` | Manage exclusion list |
| `GET` | `/api/dashboard` | Dashboard analytics data |
| `GET` | `/api/get-user-score` | User's personal eco score |

## Database Schema

The PostgreSQL database uses 12 tables:

- **users** -- user accounts (UUID PK, email, hashed password, profile info)
- **attributes** -- eco-preference categories (vegan, organic, plastic-free, etc.)
- **user_preferences** -- junction table linking users to their selected eco-preferences
- **product** -- product data (barcode ID, name, description, brand, tags, image, eco score)
- **user_interaction** -- tracks views (duration, count) and ratings per user per product
- **product_sustainability** / **product_certification** / **product_tags** -- product attribute junction tables
- **favorites** / **review_later** / **exclusion_list** -- user collection tables
- **input** -- logs user search inputs (type, text, timestamp)

See `file.sql` for the full schema, and the [ER Diagram](./docs/ER%20Diagram.png) and [Schema Diagram](./docs/Schema%20Diagram.png) for visual references.

## Architecture

The backend follows an **MVC-like** pattern: routes define endpoints, controllers contain business logic, middlewares handle authentication and validation, and the db layer manages PostgreSQL queries. Python ML scripts are invoked from Node.js via `child_process.spawn`.

The frontend is a **React SPA** using React Router for navigation, Context API for auth state, and Vite as the build tool with API proxying to the backend.

## Documentation

Additional project documentation is available in the `docs/` directory:

- [ER Diagram](./docs/ER%20Diagram.png)
- [Schema Diagram](./docs/Schema%20Diagram.png)
- [Use Case Diagram](./docs/Use%20Case%20Diagram.png)
- [Flowchart](./docs/Flowchart.png)
- [Project Proposal](./docs/Proposal/altEco.pdf)
- [Project Report](./docs/Report/alteco.pdf)

## Contributors

- [Aditya Pokharel](https://github.com/PokharelAditya)
- Rochak Adhikari
- Nikunj Pokharel
- Suyog Basnet
- Nerish Shrestha

## License

MIT -- see [LICENSE](./LICENSE) for details.
