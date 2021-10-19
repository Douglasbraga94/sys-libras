//onst { APP_BASE_HREF } = require('@angular/common');
const express = require( 'express');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/app-estoque'));

app.get('/*', (req, res)=>{
    res.sendFile(__dirname + '/dist/app-estoque/index.html');
});app.listen(PORT, () => {
    console.log(PORT);
})