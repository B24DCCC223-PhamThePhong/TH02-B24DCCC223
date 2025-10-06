// src/components/CurrencyApp.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface RateData {
  base_code: string;
  rates: Record<string, number>;
}

export default function CurrencyApp() {
  const [base, setBase] = useState("USD");
  const [data, setData] = useState<RateData | null>(null);

  useEffect(() => {
    axios
      .get(`https://open.er-api.com/v6/latest/${base}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [base]);

  return (
    <div style={{ padding: 20 }}>
      <h2>💰 Quy đổi Tỉ giá Tiền tệ</h2>
      <label>Chọn tiền tệ gốc: </label>
      <select value={base} onChange={e => setBase(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="VND">VND</option>
      </select>

      {data && (
        <div style={{ marginTop: 20 }}>
          <h3>Các tỉ giá so với {data.base_code}:</h3>
          <ul>
            {Object.entries(data.rates).slice(0, 15).map(([currency, rate]) => (
              <li key={currency}>
                {currency}: {rate.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
