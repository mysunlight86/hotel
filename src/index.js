'use strict';

import Post from './Post';
import json from './assets/json';
import './styles/styles.css';

const post = new Post('Временный пост');

console.log('Пост в строку: ', post.toString());

console.log('JSON: ', json);
