import { Router } from 'express';
import { saveSustainabilityPreferences} from '../controllers/userPreference';
import { validateSustainabilityPreferences } from '../middlewares/userPreference';
import { authorizeJWT } from '../middlewares/authorizeJWT';

const router = Router();

router.post('/sustainability-preferences', 
    authorizeJWT,
  validateSustainabilityPreferences, 
  saveSustainabilityPreferences
);

export default router;