const { FIRST_YEAR_DATA } = require('../config/config');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getInitYear(id) {
    return `${FIRST_YEAR_DATA + id}/${FIRST_YEAR_DATA + id + 1}`; 
}

module.exports = {
    randomIntFromInterval,
    getInitYear,
}