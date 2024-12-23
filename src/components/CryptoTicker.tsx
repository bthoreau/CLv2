import React, { useEffect, useState } from 'react';
import { fetchCryptoPrices } from '../lib/api/crypto';
import type { CryptoPrice } from '../lib/types';
import { formatCurrency } from '../lib/utils/formatters';

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await fetchCryptoPrices();
        if (data.length > 0) {
          setPrices(data);
          setError(null);
        }
      } catch (err) {
        setError('Unable to load prices');
        console.error('Error fetching prices:', err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error || prices.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...prices, ...prices].map((crypto, index) => (
          <div key={`${crypto.symbol}-${index}`} className="inline-flex items-center mx-4">
            <span className="font-medium">{crypto.symbol}</span>
            <span className="ml-2">{formatCurrency(crypto.price)}</span>
            <span className={`ml-2 ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}