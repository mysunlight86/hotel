import * as $ from 'jquery';
import Post from '@components/Post.js';
import json from '../assets/json.json';
import webpackLogo from './webpack-logo.png';
import './styles.css';
import './style.scss';

const post = new Post('Временный пост', webpackLogo);

$('pre').addClass('code').html(post.toString());

console.log('Пост в строку: ', post.toString());

console.log('JSON: ', json);
