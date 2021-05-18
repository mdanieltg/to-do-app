export function generateRandomId(): number {
  return Math.floor(Math.random() * 1000000000000);
}

export function writeToLocalStorage<T>(name: string, item: T): void {
  localStorage.setItem(name, JSON.stringify(item));
}

export function readFromLocalStorage<T>(name: string): T | null {
  const item = localStorage.getItem(name);
  return item
         ? JSON.parse(item)
         : null;
}
