import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import routes from './routes/routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(routes);

app.listen(port);
