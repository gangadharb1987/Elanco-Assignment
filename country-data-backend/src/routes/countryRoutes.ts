import express from "express";
import {
  getCountries,
  getCountryByCode,
  filterCountriesByRegion,
} from "../controllers/countryController";

const router = express.Router();

router.get("/", getCountries);
router.get("/:code", getCountryByCode);
router.get("/region/:region", filterCountriesByRegion);

export default router;
