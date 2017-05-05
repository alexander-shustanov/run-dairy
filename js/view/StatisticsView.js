/**
 * Created by alexander on 28.03.17.
 */

'use strict';

import React from 'react';

function StatisticsView(props) {
    let records = Array.from(props.records.values());

    let groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    let recordsByDistance = groupBy(records, "distance");

    let distances = Object.keys(recordsByDistance);

    let stats = distances.map(k => {
        return {
            distance: k,
            runs: recordsByDistance[k].reduce((acc, val) => acc + 1, 0),
            bestTime: recordsByDistance[k].reduce((acc, val) => acc + val.time, 0) / recordsByDistance[k].reduce((acc, val) => acc + 1, 0)
        };
    });

    return <div>
        {stats.map(stat =>
            <div>
                <h2> Дистанция {stat.distance} км</h2>
                <div>Лучшее время {stat.bestTime} минут</div>
                <div>Количество забегов {stat.runs}</div>
                <hr/>
            </div>
        )}
    </div>;
}

export default StatisticsView;
