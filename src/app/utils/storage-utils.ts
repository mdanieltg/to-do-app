export function readFromLocalStorage<T>(name: string): T | undefined {
  const item = localStorage.getItem(name);
  return item
         ? JSON.parse(item, reviver)
         : undefined;
}

export function writeToLocalStorage<T>(name: string, item: T): void {
  localStorage.setItem(name, JSON.stringify(item));
}

function reviver(key: string, value: any): any {
  if (key === 'completionDate' || key === 'dueDate') {
    value = new Date(value);
  }

  return value;
}
