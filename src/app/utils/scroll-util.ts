// утилита показа больше инструментов при прокрутке
export function shouldLoadMore(event: any, threshold: number = 10): boolean {
    const scrollableHeight = event.target.scrollHeight;
    const scrollPosition = event.target.scrollTop + event.target.clientHeight;
    return scrollPosition >= scrollableHeight - threshold;
  }
  