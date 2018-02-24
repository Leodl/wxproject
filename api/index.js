/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:00:48
 * @version $Id$
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();

app.use(express.static(path.join(__dirname,'../', 'web'),{maxAge:1000*60*60}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

app.listen(8014,function(){
	console.log('running...')
})

// app.disable('etag');