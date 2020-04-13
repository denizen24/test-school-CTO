const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const exphbs  = require('express-handlebars');
const path = require('path');

const newsRoutes = require('./routes/news');
const homeRoutes = require('./routes/home');
const newsRuRoutes = require('./routes/newsRu');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(limiter);
app.use(compression());

app.use('/', homeRoutes)
app.use('/news', newsRoutes);
app.use('/newsRu', newsRuRoutes);

app.use('*', (req, res) => {
  res.status(404).send('The resource can not be found');
});

module.exports = app;
