import express from 'express';
import bodyParser from 'body-parser';
import * as controller from './controller';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use('/route', router);

router.get('/', (request, response) => {
    response.send('Hihihihihiihihih');
});

router.get('/users', controller.getUsers);
router.post('/users/create', controller.createUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
