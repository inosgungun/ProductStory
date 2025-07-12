import cors from 'cors';

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));