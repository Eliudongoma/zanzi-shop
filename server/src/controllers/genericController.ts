import { Model } from "mongoose"
import { Request, Response } from "express"
import z from "zod"


interface CRUDController {
  getAll: (req:Request, res: Response) =>  Promise<void>
  create: (req:Request, res: Response) =>  Promise<void>
  update: (req:Request, res: Response) =>  Promise<void>
  delete: (req:Request, res: Response) =>  Promise<void>
}

const createCRUDController = <T>(Model:Model<T>): CRUDController => ({
  async getAll(req:Request, res: Response){
    try {
      const items = await Model.find();
      res.json(items)
    } catch (error) {
      res.status(500).json({message: "Failed to fetch items"})
    }
  },
  async create(req:Request, res: Response){
    try {
      const item = new Model(req.body)
    } catch (error) {
      
    }
  },
  async update(req:Request, res: Response){

  },
  async delete(req:Request, res: Response){

  }
  
})

export default createCRUDController
