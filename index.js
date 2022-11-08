let express = require('express');
let axsios =require("axios");
const { response } = require('express');
let app =express();
let port = process.env.PORT || 3000;
app.use(express.static("public_html"));
app.listen(port, function(){
    console.log("html 서버 시작됨");
});

//http://apis.data.go.kr/openapi/service/rest/HmcSearchService/getHmcList?serviceKey=0filLosVOdKR6St%2BEWn6vfWbWYO0NglNTL%2FSU3qj2xQ185pJkb8bRoyHzeh8irb9WfYXiqa6IRupkqi6L4ToRw%3D%3D&hmcNm=%EC%83%88%ED%95%98%EB%8A%98&siDoCd=11&siGunGuCd=590&locAddr=300&hmcRdatCd=0&hchType=0
app.get("/health_list", (req, res)=>{
    
    let api = async()=>{
        let response =  null ;
        try{
            response = await axsios.get("http://apis.data.go.kr/openapi/service/rest/HmcSearchService/getHmcList",{
            params :{
                "serviceKey" : "0filLosVOdKR6St+EWn6vfWbWYO0NglNTL/SU3qj2xQ185pJkb8bRoyHzeh8irb9WfYXiqa6IRupkqi6L4ToRw==",
                "hmcNm" : req.query.hmcNm,
                "siDoCd" : req.query.siDoCd,
                "siGunGuCd" : req.query.siGunGuCd ,
                "numOfRows" : req.query.numOfRows,
                "pageNo" : req.query.pageNo 

            }


        })

        }
        catch(e){
            console.log(e);
        }
        return response; 
        
    }
    api().then((response)=>{
        res.setHeader("Access-control-allow-origin", "*");
        res.json(response.data.response.body);  //cors 오류해결 
    });
    

}) ;