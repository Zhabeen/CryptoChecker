import { BinanceInstrument, BybitResponse, BybitTicker, ExchangeConfig, Instrument, OkxTicker } from "../components/interfaces/crypto-instruments.interface"
import { calculatePriceChangePercent } from "../utils/priceChange-util"

// Конфиг для масштабируемости бирж, при необходимости просто добавляем новую биржу и прописываем соответствующие поля, приводя к единому Instrument[]
export const EXCHANGE_CONFIGS: Record<string, ExchangeConfig> = {
  binance: {
    url: 'https://api.binance.com/api/v3/ticker/24hr',
    mapResponse: (data: BinanceInstrument[]): Instrument[] =>
      data.filter(item => item.firstId !== -1)
  },
  bybit: {
    url: 'https://api.bybit.com/v5/market/tickers?category=inverse',
    mapResponse: (data: BybitResponse): Instrument[] => 
    data.result?.list?.map((ticker: BybitTicker): Instrument => ({
      symbol: ticker.symbol,
      lastPrice: ticker.lastPrice,
      highPrice: ticker.highPrice24h,
      lowPrice: ticker.lowPrice24h,
      priceChangePercent: ticker.price24hPcnt,
      volume: ticker.volume24h,
      closeTime: new Date(Number(ticker.nextFundingTime)).getTime(),
      openTime: 0
    })) || [],
  },
  okx: {
    url: "https://www.okx.com/api/v5/market/tickers?instType=SPOT",
    mapResponse: (data: { data: OkxTicker[] }): Instrument[] =>
      data.data.map((ticker: OkxTicker): Instrument => ({
        symbol: ticker.instId,
        lastPrice: ticker.last,
        highPrice: ticker.high24h,
        lowPrice: ticker.low24h,
        priceChangePercent: calculatePriceChangePercent(ticker.open24h, ticker.last),
        volume: ticker.vol24h,
        openTime: 0,
        closeTime: Number(ticker.ts),
      })),
  }
}
