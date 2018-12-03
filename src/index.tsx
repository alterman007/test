import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.styl';

const root: HTMLElement = document.getElementById('app');
/* tslint:disable */
// console.log($);
render(<App />, root);
