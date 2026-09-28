import { Request, Response } from 'express';
import * as productModel from '../models/product';

export function index(_req: Request, res: Response): void {
  res.render('products/index', {
    title: 'Produtos',
    products: productModel.findAll(),
  });
}

export function create(_req: Request, res: Response): void {
  res.render('products/create', {
    title: 'Novo produto',
  });
}

export function store(req: Request, res: Response): void {
  const name = String(req.body.name ?? '').trim();
  const description = String(req.body.description ?? '').trim();
  const price = Number(req.body.price);

  if (!name || !Number.isFinite(price) || price < 0) {
    res.status(400).render('products/create', {
      title: 'Novo produto',
      error: 'Informe um nome e um preço válido.',
      product: { name, price: req.body.price, description },
    });
    return;
  }

  productModel.create({ name, price, description });
  res.redirect('/products');
}

export function edit(req: Request, res: Response): void {
  const product = productModel.findById(Number(req.params.id));

  if (!product) {
    res.status(404).send('Produto não encontrado.');
    return;
  }

  res.render('products/edit', {
    title: 'Editar produto',
    product,
  });
}

export function update(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const name = String(req.body.name ?? '').trim();
  const description = String(req.body.description ?? '').trim();
  const price = Number(req.body.price);

  if (!name || !Number.isFinite(price) || price < 0) {
    res.status(400).render('products/edit', {
      title: 'Editar produto',
      error: 'Informe um nome e um preço válido.',
      product: { id, name, price: req.body.price, description },
    });
    return;
  }

  const product = productModel.update(id, { name, price, description });

  if (!product) {
    res.status(404).send('Produto não encontrado.');
    return;
  }

  res.redirect('/products');
}

export function destroy(req: Request, res: Response): void {
  const removed = productModel.remove(Number(req.params.id));

  if (!removed) {
    res.status(404).send('Produto não encontrado.');
    return;
  }

  res.redirect('/products');
}
