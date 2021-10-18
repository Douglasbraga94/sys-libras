const { APP_BASE_HREF } = require('@angular/common');
const express = require( 'express');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/sys-libras'));

app.get('/*', (req, res)=>{
    res.sendFile(__dirname + '/sys-libras/index.html');
});app.listen(PORT, () => {
    console.log(PORT);
})