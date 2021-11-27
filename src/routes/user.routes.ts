import { Router } from 'express';
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import * as bcrypt from 'bcryptjs';
import {User} from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { checkJwt } from "../middleware/checkJwt";

const usersRouter = Router();

createConnection().then(connection => {
    const userRepository = connection.getRepository(User)

    const salt = bcrypt.genSaltSync(10);

    
    usersRouter.post('/login', async (req: Request, res: Response) => {
        //Check if username and password are set
        let { email, senha } = req.body;
        if (!(email && senha)) {
            res.status(400).send();
        }

        //Get user from database
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            res.status(401).send();
        }

        //Check if encrypted password match
        if (!bcrypt.compareSync(senha, user.senha)) {
            res.status(401).send();
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.nome },
            config.jwtSecret,
        { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.json({token});
    });

    usersRouter.get("/profile/:id", [checkJwt], async function(req: Request, res: Response) {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });
    usersRouter.post("/signin", async function(req: Request, res: Response) {
        req.body.senha = bcrypt.hashSync(req.body.senha, salt);
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });
    usersRouter.put("/profile/:id", async function(req: Request, res: Response) {
        const user = await userRepository.findOne(req.params.id);
        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

});

export default usersRouter;