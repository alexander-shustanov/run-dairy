/**
 * Created by alexander on 13.04.17.
 */

import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import React from 'react';
import CompetitionActions from '../data/competition/CompetitionActions';


'use strict';

function MapView(props) {
    let today = new Date();
    today.setDate(today.getDate() + 1);

    const GettingStartedGoogleMap = withGoogleMap(props =>
        <GoogleMap
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}>
            {props.markers.map(competition => {
                let location = props.cities.get(competition.city);

                if (!location) {
                    CompetitionActions.retrieveLocation(competition.city);
                    return [];
                }

                return <Marker
                    position={location}
                    label={competition.city}
                />;
            })}
        </GoogleMap>
    );

    let competitions = Array.from(props.competitions.values()).filter(competition => competition.date.getTime() > today.getTime());

    return <GettingStartedGoogleMap
        containerElement={
            <div style={{height: "600px"}}/>
        }
        mapElement={
            <div style={{height: "600px"}}/>
        }
        markers={competitions}
        cities={props.cityLocations}
    />;
}

export default MapView;
