import { useEffect, useState } from "react";
import axios from "axios";

interface Country {
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
}

export default function CountryApp() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,population,region")
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>🌍 Tra cứu Quốc gia</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {filtered.map((country, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
            <img src={country.flags.png} alt={country.name.common} width="100%" />
            <h3>{country.name.common}</h3>
            <p>Khu vực: {country.region}</p>
            <p>Dân số: {country.population.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
