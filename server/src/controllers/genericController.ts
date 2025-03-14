import mongoose, { Model } from "mongoose";
import { Request, Response } from "express";
interface CRUDController {
  getAll: (req: Request, res: Response) => Promise<void>;
  getById: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
}

const createCRUDController = <T>(
  Model: Model<T>,
  itemString: string
): CRUDController => ({
  async getAll(req: Request, res: Response) {
    try {
      const items = await Model.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch ${itemString}s` });
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "invalid ID" });
      }
      const items = await Model.findById(id);
      res.json(items);
    } catch (error) {
      res.status(404).json({ message: `${itemString} not found` });
    }
  },
  //Create function
  async create(req: Request, res: Response) {
    try {
      const { _id, ...rest } = req.body;
      const item = new Model(rest);
      await item.save();
      res.status(200).json({
        message: `${itemString} Added Sucessfully!`,
        item: item,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Failed to create ${itemString}` });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).json({ message: "invalid ID" });
      }
      const updatedItem = await Model.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        res.status(404).json({ message: `${itemString} not found` });
      }
      res.status(200).json({
        message: `${itemString} updated Successfully!`,
        item: updatedItem,
      });
    } catch (error) {
      res.status(500).json({ message: `Failed to update ${itemString}` });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const {_id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).json({ message: "Invalid ID" });
      }
      const deletedItem = await Model.findByIdAndDelete(_id);
      if (!deletedItem) {
        res.status(404).json({ message: `${itemString} not found` });
      }
      res.status(200).json({ message: `${itemString} deleted Successfully!` });
    } catch (error) {
      res.status(400).json({ message: `Failed to delete ${itemString}` });
    }
  },
});

export default createCRUDController;
