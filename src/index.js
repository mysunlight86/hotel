'use strict';

import Post from '@models/Post.js';
import json from './assets/json.json';
import webpackLogo from './assets/webpack-logo.png';
import './styles/styles.css';

const post = new Post('Временный пост', webpackLogo);

console.log('Пост в строку: ', post.toString());

console.log('JSON: ', json);
