import { Router } from 'express';
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Products} from "../entity/Products";
import { checkJwt } from "../middleware/checkJwt";

const productsRouter = Router();

createConnection().then(connection => {
    const productRepository = connection.getRepository(Products)

    productsRouter.get('/', (req: Request, res: Response) => {
        res.status(200).json({msg: "server is alive"})
    })

    productsRouter.get("/products", [checkJwt], async function(req: Request, res: Response) {
        const products = await productRepository.find();
        res.json(products);
    });
    productsRouter.get("/products/:id", [checkJwt],async function(req: Request, res: Response) {
        const results = await productRepository.findOne(req.params.id);
        return res.send(results);
    });

    productsRouter.get("/products/category/:id", [checkJwt], async function(req: Request, res: Response) {
        const results = await productRepository.findOne({where: {idcateg : req.params.id}});
        return res.send(results);
    });

    productsRouter.post("/products", [checkJwt], async function(req: Request, res: Response) {
        const product = await productRepository.create(req.body);
        const results = await productRepository.save(product);
        return res.send(results);
    });
    productsRouter.put("/products/:id", [checkJwt], async function(req: Request, res: Response) {
        const product = await productRepository.findOne(req.params.id);
        productRepository.merge(product, req.body);
        const results = await productRepository.save(product);
        return res.send(results);
    });
    productsRouter.delete("/products/:id", [checkJwt], async function(req: Request, res: Response) {
        const results = await productRepository.delete(req.params.id);
        return res.send(results);
    });

});

export default productsRouter;