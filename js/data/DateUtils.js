/**
 * Created by alexander on 23.03.17.
 */

const months = ["January", "February", "Mart", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

'use strict';

function printDate(date) {
    return (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());
}

export default {printDate};
