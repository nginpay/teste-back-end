import * as express from "express";
import {Request, Response} from "express";
import userRoutes from './routes/user.routes';
import * as helmet from "helmet";
import * as cors from "cors";
import categoriesRoutes from './routes/categories.routes';
import productsRoutes from './routes/products.routes';


const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
// register routes




app.get('/', (req: Request, res: Response) => {
    res.status(200).json({msg: "server is alive"})
})


app.use(userRoutes);
app.use(categoriesRoutes);
app.use(productsRoutes);



const PORT = process.env.PORT || 3000;

// start express server
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});
