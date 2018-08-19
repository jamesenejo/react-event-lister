import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import routes from './routes/routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
const urlencoded = bodyParser.urlencoded({ extended: false });

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(urlencoded);
app.use(routes);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

app.listen(port);
