'use strict';

import * as $ from 'jquery';
import Post from '@models/Post.js';
import json from './assets/json.json';
import webpackLogo from './assets/webpack-logo.png';
import './styles/styles.css';

const post = new Post('Временный пост', webpackLogo);

$('pre').addClass('code').html(post.toString());

console.log('Пост в строку: ', post.toString());

console.log('JSON: ', json);
