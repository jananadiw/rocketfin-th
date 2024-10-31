export type Position = {
  symbol: string;
  cost_basis: number;
  market_value: number;
  unrealized_return_rate: number;
  unrealized_profit_loss: number;
};

export type Transaction = {
  instrument_name: string;
  shares_traded: number;
  operation: string;
  value: number;
  date: string;
};

export type TickerData = {
  symbol: string;
  name: string;
  bid: number;
  ask: number;
  currentPrice: number;
  changeValue: number;
  changePercent: number;
};

export type PortfolioData = {
  symbol: string;
  cost_basis: number;
  market_value: number;
  unrealized_return_rate: number;
  unrealized_profit_loss: number;
  totalShares: number;
};
