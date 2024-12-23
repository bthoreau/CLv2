export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}