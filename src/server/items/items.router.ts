import express, { Request, Response } from 'express';
import * as ItemService from './items.service';
import { Item } from './item.interface';
import { Items } from './items.interface';

const itemsRouter = express.Router();

// GET items/
itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: Items = await ItemService.getItemList();

    res.status(200).send(items);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET items/:id
itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.getItem(id);

    res.status(200).send(item);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// POST items/
itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { item } = req.body;

    await ItemService.createItem(item);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/
itemsRouter.put('/', async (req: Request, res: Response) => {
  try {
    const { item } = req.body;

    await ItemService.updateItem(item);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id
itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.removeItem(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default itemsRouter;
