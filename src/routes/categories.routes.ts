import { Router } from 'express';
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Categories} from "../entity/Categories";
import { checkJwt } from "../middleware/checkJwt";


const categoriesRouter = Router();

createConnection().then(connection => {
    const categoryRepository = connection.getRepository(Categories)

    categoriesRouter.get('/', (req: Request, res: Response) => {
        res.status(200).json({msg: "server is alive"})
    })

    categoriesRouter.get("/categories", [checkJwt], async function(req: Request, res: Response) {
        const categories = await categoryRepository.find();
        res.json(categories);
    });
    categoriesRouter.get("/categories/:id", [checkJwt], async function(req: Request, res: Response) {
        const results = await categoryRepository.findOne(req.params.id);
        return res.send(results);
    });
    categoriesRouter.post("/categories", [checkJwt], async function(req: Request, res: Response) {
        const category = await categoryRepository.create(req.body);
        const results = await categoryRepository.save(category);
        return res.send(results);
    });
    categoriesRouter.put("/categories/:id", [checkJwt], async function(req: Request, res: Response) {
        const category = await categoryRepository.findOne(req.params.id);
        categoryRepository.merge(category, req.body);
        const results = await categoryRepository.save(category);
        return res.send(results);
    });
    categoriesRouter.delete("/categories/:id", [checkJwt], async function(req: Request, res: Response) {
        const results = await categoryRepository.delete(req.params.id);
        return res.send(results);
    });

});

export default categoriesRouter;