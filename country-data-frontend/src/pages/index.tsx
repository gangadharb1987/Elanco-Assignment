import { useState, useEffect } from "react";
import axios from "axios";

interface ICountry {
  name: string;
  flag: string;
  region: string;
}

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_COUNTRIES_API || ""
        );
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load countries");
        setLoading(false);
        console.log(err);
      }
    };
    fetchCountries();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredCountries = countries.filter((country: ICountry) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Search for a Country</label>
        <input
          id="search"
          type="text"
          placeholder="Enter country name"
          className="border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display filtered countries */}
      <div className="m-4 grid gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country: ICountry) => (
            <div
              key={country.name}
              className="flex justify-center bg-white rounded-lg shadow-md p-4"
            >
              {/* Accessing the flag from the 'flag' property */}
              {country.flag ? (
                <img
                  className="w-10 h-10 object-cover mt-2"
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                />
              ) : (
                <p className="text-center">No Flag Available</p>
              )}
              <div className="ml-2 text-center">
                <h2>{country.name}</h2>
                <p>{country.region}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No countries found.</p>
        )}
      </div>
    </div>
  );
}
