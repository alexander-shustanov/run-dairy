/**
 * Created by alexander on 23.03.17.
 */

'use strict';

import React from 'react';
import NavigationActions from '../navigation/NavigationActions';
import NavigationRoutes from '../navigation/NavigationRoutes';

function addClass(elem, className) {
    let classes = elem.className.split(" ");
    classes = classes.concat(className);
    elem.className = classes.join(" ");
}

function removeClass(elem, className) {
    let classes = elem.className.split(" ");
    let newClasses = [];
    for (let clazz of classes)
        if (clazz != className)
            newClasses.push(clazz);
    elem.className = newClasses.reverse().join(" ");
}

function Toolbar(props) {
    let backButton = [];
    if (props.showBack) {
        backButton = <button className="back_button" type="button" onClick={NavigationActions.back}/>;
    }

    let title = [];
    if (props.title) {
        title = <p className="toolbar_title">{props.title}</p>;
    }

    let selectTab = (event, route) => {
        let elem = event.target.nextSibling;

        setTimeout(() =>  addClass(elem, 'tab_label_active'), 20);
        setTimeout(() =>  removeClass(elem, 'tab_label_active'), 40);

        if(props.route != route) {
            NavigationActions.goto(route);
        }
    };

    let tabs = (
        <div className="tabs_parent">
            <input type="radio" className="tab" name="navigation_tabs"
                   id="tab1" checked={props.route == NavigationRoutes.CALENDAR ? "checked" : ""} onClick={(event) => selectTab(event, NavigationRoutes.CALENDAR)}/>
            <label className="tab_label" htmlFor="tab1">Calendar</label>
            <input type="radio" className="tab" name="navigation_tabs"
                   id="tab2" checked={props.route == NavigationRoutes.COMPETITIONS ? "checked" : ""} onClick={(event) => selectTab(event, NavigationRoutes.COMPETITIONS)}/>
            <label className="tab_label" htmlFor="tab2">Competitions</label>
            <input type="radio" className="tab" name="navigation_tabs"
                   id="tab3" checked={props.route == NavigationRoutes.STATISTICS ? "checked" : ""} onClick={(event) => selectTab(event, NavigationRoutes.STATISTICS)}/>
            <label className="tab_label" htmlFor="tab3">Statistics</label>
            <div className="slide"/>
        </div>);


    return (
        <div id="nav_bar">
            {backButton}
            {title}
            {props.showBack ? [] : tabs}
        </div>
    );
}


export default Toolbar;
