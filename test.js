const moment = require('moment-timezone');

var hour = moment.unix(1653029608).format('H');

console.log(hour);