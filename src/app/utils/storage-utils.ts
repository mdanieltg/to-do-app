export function readFromLocalStorage<T>(name: string): T | undefined {
  const item = localStorage.getItem(name);
  return item
         ? JSON.parse(item)
         : undefined;
}

export function writeToLocalStorage<T>(name: string, item: T): void {
  localStorage.setItem(name, JSON.stringify(item));
}
