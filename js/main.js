'use strict';

import AppContainer from './containers/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';

if (typeof window !== 'undefined') {
    window.React = React;
}

ReactDOM.render(<AppContainer />, document.getElementById('app'));
