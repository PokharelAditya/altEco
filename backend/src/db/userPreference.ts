import pool from '../database';

export interface SustainabilityPreferences {
  id?: number;
  user_id: string;
  material_safety: string[];
  waste_impact: string[];
  carbon_impact: string[];
  animal_ethics: string[];
  sourcing: string[];
  certifications: string[];
  product_types: string[];
  distance_preference: string | null;
  packaging: string[];
  education_engagement: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface PreferenceInput {
  materialSafety?: string[];
  wasteImpact?: string[];
  carbonImpact?: string[];
  animalEthics?: string[];
  sourcing?: string[];
  certifications?: string[];
  productTypes?: string[];
  distancePreference?: string;
  packaging?: string[];
  educationEngagement?: boolean;
}

async function checkExistingPreferences(userId: string) {
  const { rows } = await pool.query('SELECT id FROM sustainability_preferences WHERE user_id = $1', [userId]);
  return rows.length > 0;
}

async function insertPreferences(userId: string, preferences: PreferenceInput) {
  const { rows } = await pool.query(
    `INSERT INTO sustainability_preferences (
      user_id, material_safety, waste_impact, carbon_impact, 
      animal_ethics, sourcing, certifications, product_types, 
      distance_preference, packaging, education_engagement
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
    [
      userId,
      preferences.materialSafety || [],
      preferences.wasteImpact || [],
      preferences.carbonImpact || [],
      preferences.animalEthics || [],
      preferences.sourcing || [],
      preferences.certifications || [],
      preferences.productTypes || [],
      preferences.distancePreference || null,
      preferences.packaging || [],
      preferences.educationEngagement || false
    ]
  );
  return rows[0];
}

async function updatePreferences(userId: string, preferences: PreferenceInput) {
  const { rows } = await pool.query(
    `UPDATE sustainability_preferences 
    SET 
      material_safety = $2,
      waste_impact = $3,
      carbon_impact = $4,
      animal_ethics = $5,
      sourcing = $6,
      certifications = $7,
      product_types = $8,
      distance_preference = $9,
      packaging = $10,
      education_engagement = $11,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1
    RETURNING *`,
    [
      userId,
      preferences.materialSafety || [],
      preferences.wasteImpact || [],
      preferences.carbonImpact || [],
      preferences.animalEthics || [],
      preferences.sourcing || [],
      preferences.certifications || [],
      preferences.productTypes || [],
      preferences.distancePreference || null,
      preferences.packaging || [],
      preferences.educationEngagement || false
    ]
  );
  return rows[0];
}

async function getPreferencesByUserId(userId: string) {
  const { rows } = await pool.query('SELECT * FROM sustainability_preferences WHERE user_id = $1', [userId]);
  return rows;
}

async function deletePreferences(userId: string) {
  await pool.query('DELETE FROM sustainability_preferences WHERE user_id = $1', [userId]);
}

export { 
  checkExistingPreferences, 
  insertPreferences, 
  updatePreferences, 
  getPreferencesByUserId, 
  deletePreferences 
};