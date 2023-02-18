import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import { createTask, readTasks, readOneTask, updateTask, deleteTask } from './CRUDTask'

const app = new Koa();
const port = process.env.PORT ?? 3000

app.use(koaBody({ jsonLimit: '5kb' }));

const router = new Router();

router.get('/', (ctx) => ctx.body = 'Hello World');

router.post('/tasks', async (ctx) =>
    ctx.body = await createTask(ctx.request.body.name, ctx.request.body.description));

router.get('/tasks', async (ctx) =>
    ctx.body = await readTasks());

router.get('/tasks/:id', async (ctx) =>
    ctx.body = await readOneTask(ctx.params.id));

router.put('/tasks/:id', async (ctx) =>
    ctx.body = await updateTask(
        ctx.params.id,
        ctx.request.body.name,
        ctx.request.body.description,
        ctx.request.body.status
    ));

router.delete('/tasks/:id', async (ctx) =>
    ctx.body = await deleteTask(ctx.params.id));

app.use(router.routes());

app.listen(port, () => console.log('Koa is Listening at http://localhost:%i/', port))