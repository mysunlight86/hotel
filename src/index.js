'use strict';

import Post from './Post';
import './styles/styles.css';

const post = new Post('Временный пост');

console.log('Пост в строку: ', post.toString());
