type GroupByFn<T> = (item: T) => string | number;

export default function groupBy<T>(array: T[], fn: GroupByFn<T>): Record<string | number, T[]> {
  return array.reduce((acc, item) => {
    const key = fn(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string | number, T[]>)
}