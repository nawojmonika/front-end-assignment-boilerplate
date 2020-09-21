// SCSS imported here will be bundled by webpack
import './index.scss';
import './components/upload-component/upload-component.scss';
import './components/app-component/app-component.scss';

import React from 'react';
import ReactDOM from 'react-dom';

// You can import any components here
import { AppComponent } from './components/app-component/app-component';

const element = React.createElement;
const domContainer = document.querySelector('#app-component');
ReactDOM.render(element(AppComponent), domContainer);
