import mongoose, { Model } from "mongoose";
import { Request, Response } from "express";
import z from "zod";
import Product from "../models/Product.js";

interface CRUDController {
  getAll: (req: Request, res: Response) => Promise<void>;
  getById: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
}

const createCRUDController = <T>(
  Model: Model<T>
): CRUDController => ({
  async getAll(req: Request, res: Response) {
    try {
      const items = await Model.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch items" });
    }
  },
  async getById(req: Request, res: Response){
    try {
      const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "invalid ID"})
      }
      const items = await Model.findById(id);
      res.json(items);

    } catch (error) {
      res.status(404).json({message:"Item not found"});
    }
  },
  async create(req: Request, res: Response) {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Failed to create item" });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "invalid ID"})
      }
      const updatedItem = await  Model.findByIdAndUpdate(id, req.body,   {new:true,});
      if(!updatedItem){
         res.status(404).json({message:"Item not found"});
      }
      res.status(200).json({
        message: "Item updated Sucessfully",
        item: updatedItem,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update item" });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID" });
      }
      const deletedItem = await Model.findByIdAndDelete(id);
      if (!deletedItem) {
        res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted" });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete item" });
    }
  },
});

export default createCRUDController;
