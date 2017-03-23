/**
 * Created by alexander on 23.03.17.
 */

'use strict';

import React from 'react';
import NavigationActions from '../navigation/NavigationActions';
import NavigationRoutes from '../navigation/NavigationRoutes';

const Titles = {};
// Titles[NavigationRoutes.DAY_LIST] = ""

function Toolbar(props) {
    let backButton = [];
    if(props.showBack) {
        backButton = <button className="back_button" type="button" onClick={NavigationActions.back}/>;
    }

    let title = [];
    if(props.title) {
        title = <p className="toolbar_title">{props.title}</p>;
    }


    return (
        <div id="nav_bar">
            {backButton}
            {title}
        </div>
    );
}


export default Toolbar;
