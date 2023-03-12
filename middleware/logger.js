const moment = require('moment-timezone');
const logger = (req, res, next) => {
    const dateTime_rael = moment().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss')
    console.log(`[${req.method}: ${dateTime_rael}] => ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;