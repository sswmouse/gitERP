const Koa = require('koa');
const app = new Koa();

var cors = require('koa-cors');
app.use(cors());

const router = require("./router/koa-router")

const koa_body = require("koa-body")
app.use(koa_body({
    multipart: true,
    formidable: {
        maxFileSize: 1024 * 1024 * 200
    }
}))

var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const serve = require('koa-static');
app.use(serve(__dirname + '/static/'));


app
    .use(router.routes())
    .use(router.allowedMethods());
console.log("server is run .....")
app.listen(3000);