// утилита вычисления процента изменения цены
export function calculatePriceChangePercent(open24h: string, last: string): string {
    const open = parseFloat(open24h);
    const lastPrice = parseFloat(last);
    if (open === 0) return "0"
    const changePercent = ((lastPrice - open) / open) * 100;
    return changePercent.toFixed(2)
  };