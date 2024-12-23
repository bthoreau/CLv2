import type { CryptoPrice } from '../types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const PRICE_ENDPOINT = '/simple/price';
const CRYPTO_IDS = ['bitcoin', 'ethereum', 'solana'];

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const queryParams = new URLSearchParams({
      ids: CRYPTO_IDS.join(','),
      vs_currencies: 'usd',
      include_24h_change: 'true'
    });

    const response = await fetch(
      `${COINGECKO_API_URL}${PRICE_ENDPOINT}?${queryParams}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return CRYPTO_IDS.map(id => ({
      symbol: id === 'bitcoin' ? 'BTC' : id === 'ethereum' ? 'ETH' : 'SOL',
      name: id.charAt(0).toUpperCase() + id.slice(1),
      price: data[id]?.usd ?? 0,
      change24h: data[id]?.usd_24h_change ?? 0
    }));
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return [];
  }
}