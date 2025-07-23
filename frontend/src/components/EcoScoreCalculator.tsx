import { useState, useEffect } from "react";
import ScoreColor from "../utils/ScoreColor";

const positiveTags = [
  "en:green-dot",
  "green",
  "dot",
  "plant-based",
  "fresh",
  "en:organic",
  "en:eu-organic",
  "bio",
  "natural",
  "naturel",
  "organic",
  "recyclable",
  "sans",
  "vert",
  "water",
  "usda",
  "fruits",
  "vegetables",
  "agriculture",
  "biologique",
  "tournesol",
  "colza",
];

const negativeTags = [
  "plastique",
  "plastic",
  "acid",
  "acide",
  "citrique",
  "e330",
  "sodium",
  "carton",
  "arôme",
  "arômes",
  "additive",
  "sachet",
  "canned",
  "cereals",
  "beverages",
  "gluten",
  "sucre",
  "sugary",
  "snacks",
  "huile",
  "farine",
  "diaries",
  "meats",
  "viande",
  "poudre",
  "cheeses",
  "glucose",
  "groceries",
  "sirop",
  "amidon",
  "frozen",
  "verre",
  "lait",
  "desserts",
  "cacao",
  "potassium",
  "sauces",
  "alcoholic",
  "barquette",
  "jus",
  "chocolates",
];

const tagDisplayMap: Record<string, string> = {
  // "en:green-dot": "Green Dot (Eco Symbol)",
  // "plant-based": "Plant Based",
  // "en:organic": "Organic ",
  // "en:eu-organic": "EU Organic Certified",
  // "bio": "Biodegradable", 
  // "natural": "Natural",
  // "organic": "Organic",
  // "recyclable": "Recyclable",
  // "plastic": "Plastic",
  // "acid": "Acid",
  // "citric": "Citric Acid",
  // "sodium": "Sodium",
  // "carton": "Cardboard",
  // "arôme": "Aroma (Flavoring)",
  // "additive": "Additive / Preservative",
  // "sachet": "Sachet (Small Packet)",
  "en:green-dot": "Green Dot (Eco Symbol)",
  "green": "Green Dot (Eco Symbol)",
  "dot": "Green Dot (Eco Symbol)",
  "plant-based": "Plant Based",
  "fresh": "Fresh",
  "en:organic": "Organic",
  "en:eu-organic": "EU Organic Certified",
  "bio": "Biodegradable",
  "natural": "Natural",
  "naturel": "Natural",
  "organic": "Organic",
  "recyclable": "Recyclable",
  "sans": "Without Additives",
  "vert": "Green",
  "water": "Water",
  "usda": "USDA Certified",
  "fruits": "Fruits",
  "vegetables": "Vegetables",
  "agriculture": "Agricultural Product",
  "biologique": "Organic",
  "tournesol": "Sunflower",
  "colza": "Rapeseed",
  "plastique": "Plastic",
  "plastic": "Plastic",
  "acid": "Acid",
  "acide": "Acid",
  "citrique": "Citric Acid",
  "e330": "Citric Acid",
  "sodium": "Sodium",
  "carton": "Cardboard",
  "arôme": "Aroma (Flavoring)",
  "arômes": "Aroma (Flavoring)",
  "additive": "Additive / Preservative",
  "sachet": "Sachet (Small Packet)",
  "canned": "Canned Food",
  "cereals": "Cereals",
  "beverages": "Beverages",
  "gluten": "Gluten",
  "sucre": "Sugar",
  "sugary": "Sugar",
  "snacks": "Snacks",
  "huile": "Oil",
  "farine": "Flour",
  "diaries": "Dairy",
  "meats": "Meat",
  "viande": "Meat",
  "poudre": "Powder",
  "cheeses": "Cheese",
  "glucose": "Glucose",
  "groceries": "Groceries",
  "sirop": "Syrup",
  "amidon": "Starch",
  "frozen": "Frozen",
  "verre": "Glass",
  "lait": "Milk",
  "desserts": "Desserts",
  "cacao": "Cocoa",
  "potassium": "Potassium",
  "sauces": "Sauces",
  "alcoholic": "Beverages",
  "barquette": "Barquette (Pastry Shell)",
  "jus": "Juice",
  "chocolates": "Chocolates"
}


const formatTag = (tag: string) => {
  return tagDisplayMap[tag] || tag.replace(/^en:/, "").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const EcoScoreCalculator = () => {
  type tag = {
    name: string,
    value: any
  }

  const [productName, setProductName] = useState("");
  const [selectedTags, setSelectedTags] = useState<tag[]>([]);
  const [displayTags, setDisplayTags] = useState<string[]>([])
  const [ecoScore, setEcoScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const readTags:string[] = []
    const t = [...positiveTags, ...negativeTags]
      .filter(tag => {
        if (readTags.includes(tag)) {
          return false
        }
        else {
          readTags.push(tag)
          return true
        }
      })
      .filter(tag => !selectedTags.map(tag => tag.name).includes(tag))
    setDisplayTags(() => t)
  }, [selectedTags])

  const toggleTag = (tag: tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getEcoScore = async () => {
    if (selectedTags.length === 0) return;

    setLoading(true);
    setEcoScore(null);

    try {
      const response = await fetch("/api/get_eco_score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: selectedTags
        }),
      });

      const data = await response.json();
      setEcoScore(data.ecoScore);
    } catch (error) {
      console.error("Error fetching eco score:", error);
      setEcoScore(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">🌿 Eco Score Calculator</h1>

      <div className="mb-6 space-y-2">
        <label className="block text-base font-medium">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., Organic Juice"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {displayTags.length > 0 &&
      <div className="mb-6">
        <h2 className="text-base font-medium mb-3">Select Product Tags</h2>
        <div className="flex flex-wrap gap-2">

          {/* {[...positiveTags, ...negativeTags].map((tag) => { */}
          {/*   const selected = selectedTags.includes(tag); */}
          {/*   const isPositive = positiveTags.includes(tag); */}
          {/**/}
          {/*   return ( */}
          {/*     <button */}
          {/*       key={tag} */}
          {/*       type="button" */}
          {/*       onClick={() => toggleTag(tag)} */}
          {/*       className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 font-medium ${ */}
          {/*         selected */}
          {/*           ? isPositive */}
          {/*             ? "bg-green-500 text-white border-green-600" */}
          {/*             : "bg-red-500 text-white border-red-600" */}
          {/*           : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700" */}
          {/*       }`} */}
          {/*     > */}
          {/*       {formatTag(tag)} */}
          {/*     </button> */}
          {/*   ); */}
          {/* })} */}
        
            {displayTags
              .map((tag) => {
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag({ name: tag, value: null })}
                    className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <span>{formatTag(tag)}</span>
                  </button>
              );
            })}

        </div>
      </div>}
      
      {selectedTags.length > 0 &&
      <div className="mb-6">
        <h2 className="text-base font-medium mb-3">Please specify tag contribution in terms of percentage for better results:</h2>
        <div className="flex flex-col gap-4">
            {selectedTags.map((tag, i) => {
             
              const isPositive = positiveTags.includes(tag.name)

              return (
              <div key={i} className="flex items-center gap-4">
                <button
                  onClick={() => toggleTag(tag)}
                  className={`flex justify-center items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer
                    ${isPositive
                    ? "bg-green-700 hover:bg-green-500 text-white border-green-800"
                    : "bg-red-700 hover:bg-red-500 text-white border-red-800"}`}
                >
                  <span>
                    {formatTag(tag.name)}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" className="fill-none stroke-2 stroke-white">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button> 

                {tag.value === null && 
                <button
                  className="ml-auto"
                  onClick={() => setSelectedTags(prev => prev.map(p => p === tag? { ...p, value: 100 } : p))}
                >
                  Add
                </button>}

                {tag.value === null || 
                <div className="ml-auto">
                  <input
                    className=""
                    type = "number"
                    min = {0}
                    max = {100}
                    value = {tag.value}
                    onChange = {(e) => setSelectedTags(prev => prev.map(p => p === tag? { ...p, value: e.target.value } : p))}
                  />
                  <button
                    className=""
                    onClick={() => setSelectedTags(prev => prev.map(p => p === tag? { ...p, value: null } : p))}
                  >
                    Remove
                  </button>
                </div>}

              </div>)
            })}
        </div>
      </div>
      }

      <div className="text-center">
        <button
          onClick={getEcoScore}
          disabled={loading || selectedTags.length === 0}
          className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Get Eco Score"}
        </button>
      </div>

      {ecoScore !== null && (
        <div className={`mt-10 text-center text-white dark:text-gray-200 border-2 rounded-xl p-6`}
        style={{ 
            backgroundColor: ScoreColor(ecoScore, 0.6), 
            borderColor: ScoreColor(ecoScore)
          }}
        >
          <p className="text-lg font-semibold mb-1">Eco Score</p>
          <p className="text-5xl font-bold">{ecoScore} / 100</p>
        </div>
      )}
    </div>
  );
};

export default EcoScoreCalculator;
