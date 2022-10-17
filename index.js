let express = require('express');
// let axsios =require("axios");
let app =express();
let port = process.env.PORT || 3000;
app.use(express.static("public_html"));
app.listen(port, function(){
    console.log("html 서버 시작됨");
});