export enum Category {
  BLACK = 'Black',

  RED = 'Red',

  YELLOW = 'Yellow',

  GREEN = 'Green',
}

export function categoriesStartsWith(filter) {
  const enumKeys = [];
  for (const value in Category) {
    if (Object.prototype.hasOwnProperty.call(Category, value)) {
      enumKeys.push(value);
    }
  }
  return enumKeys.filter(val => val.toUpperCase().includes(filter.toUpperCase()));
}
