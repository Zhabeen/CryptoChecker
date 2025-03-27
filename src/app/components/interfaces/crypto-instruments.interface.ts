export interface ExchangeConfig {
  url: string
  mapResponse: (data: any) => Instrument[]
}

export interface Instrument {
  symbol: string
  lastPrice: string
  highPrice: string
  lowPrice: string
  priceChangePercent: string
  volume: string
  openTime: number
  closeTime: number
}

export interface BinanceInstrument extends Instrument {
  firstId: number
}

export interface BybitTicker {
  symbol: string
  lastPrice: string
  highPrice24h: string
  lowPrice24h: string
  price24hPcnt: string
  volume24h: string
  nextFundingTime: string
}

export interface BybitResult {
  category: string
  list: BybitTicker[]
}

export interface BybitResponse {
  result: BybitResult
}

export interface OkxTicker {
  instId: string
  last: string
  high24h: string
  low24h: string
  open24h: string
  vol24h: string
  ts: string
}
