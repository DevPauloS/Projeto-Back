import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'
import cors from 'cors';


const app = express();
app.use(express.json())
app.use(cors('https://tiny-jelly-49aee3.netlify.app'))


const port = process.env.port || 3001;

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)




app.listen(3000, () => console.log("Servidor rodando!!"))