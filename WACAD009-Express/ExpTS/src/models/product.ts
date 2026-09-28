export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

let nextId = 4;

const products: Product[] = [
  {
    id: 1,
    name: 'Notebook',
    price: 3499.9,
    description: 'Notebook para estudos e desenvolvimento web.',
  },
  {
    id: 2,
    name: 'Mouse',
    price: 89.9,
    description: 'Mouse USB para uso diário.',
  },
  {
    id: 3,
    name: 'Teclado',
    price: 149.9,
    description: 'Teclado para produtividade e programação.',
  },
];

export function findAll(): Product[] {
  return products;
}

export function findById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function create(data: Omit<Product, 'id'>): Product {
  const product: Product = {
    id: nextId++,
    ...data,
  };

  products.push(product);
  return product;
}

export function update(
  id: number,
  data: Omit<Product, 'id'>
): Product | undefined {
  const product = findById(id);

  if (!product) {
    return undefined;
  }

  product.name = data.name;
  product.price = data.price;
  product.description = data.description;
  return product;
}

export function remove(id: number): boolean {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}
