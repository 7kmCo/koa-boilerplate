const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaValidator = require('koa-async-validator');
const logger = require('koa-logger');
const koaqs = require('koa-qs');
const router = require('./routes');

const PORT = 3000;

// authentication
require('./utils/auth');
const passport = require('koa-passport');

app = new Koa();
koaqs(app);

// sessions
const session = require('koa-session');
app.keys = ['your-session-secret'];

app
  .use(logger())
  .use(session({}, app))
  .use(bodyParser())
  .use(koaValidator())
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods());

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
