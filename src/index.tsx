// CSS imported here will be bundled by webpack
import './index.css';
import './components/upload-component/upload-component.css';
import './components/app-component/app-component.css';
import './components/gallery-component/gallery-component.css';

import React from 'react';
import ReactDOM from 'react-dom';

// You can import any components here
import { AppComponent } from './components/app-component/app-component';

const element = React.createElement;
const domContainer = document.querySelector('#app');
ReactDOM.render(element(AppComponent), domContainer);
