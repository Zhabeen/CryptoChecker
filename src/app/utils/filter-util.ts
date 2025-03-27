// утилита поиска инструмента
export function filterData<T>(data: T[], filterText: string, field: keyof T): T[] {
    return data.filter(item => item[field] != null && item[field].toString().toLowerCase().includes(filterText.toLowerCase()));
  }
  