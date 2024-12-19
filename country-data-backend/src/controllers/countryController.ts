import { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";

const REST_COUNTRIES_API = process.env.REST_COUNTRIES_API || "";

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
    }));
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch the data!" });
    console.log(err);
  }
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${process.env.REST_COUNTRY_API}${code}`);
    const country = response.data[0];
    res.status(200).json({
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      languages: country.languages,
      region: country.region,
      currency: country.currencies,
    });
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch the data!" });
    console.log(err);
  }
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  try {
    const { region } = req.params;
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.filter(
      (country: any) =>
        country?.region.toLowerCase() === region.toLocaleLowerCase()
    );
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch the data!" });
    console.log(err);
  }
};
