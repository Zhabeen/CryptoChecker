// утилита сортировки данныхх
export function sortData<T>(data: T[], field: keyof T, asc: boolean): T[] {
    return [...data].sort((a, b) => {
      const valueA = typeof a[field] === 'string' ? parseFloat(a[field]) : new Date(a[field] as Date).getTime()
      const valueB = typeof b[field] === 'string' ? parseFloat(b[field]) : new Date(b[field] as Date).getTime()
      return asc ? valueA - valueB : valueB - valueA
    })
  }
  