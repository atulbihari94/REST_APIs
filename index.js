const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const cource = require('./routes/cources');
const home = require('./routes/home');

const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

if(app.get('env') === 'development') {
    console.log('Morgan enabled...')
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled..');
}

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));// http://localhost:3001/readme.txt => accessiable
app.use(helmet());
app.use('/api/cources', cource);
app.use('/', home);

// configuartion
console.log('Application Name:'+ config.get("name"));
console.log('Application Server:'+ config.get("mail.host"));
// console.log('Mail Password:'+ config.get("mail.password"));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening on the port ${port}...`));