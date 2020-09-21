// SCSS imported here will be bundled by webpack
import './index.scss';
import './components/upload-component/upload-component.scss';
import './components/app/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';

// You can import any components here
import { App } from './components/app/app';

const element = React.createElement;
const domContainer = document.querySelector('#app');
ReactDOM.render(element(App), domContainer);
