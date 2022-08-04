import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routes/Auth.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World, from Express server');
});
app.use('/auth', auth);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
