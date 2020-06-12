const  xml = require("xml")
module.exports = resultHandler =(req,res)=>{
    if(req.format==="XML"){
        let xmlString = xml(req.result);
        res.type('application/xml');
       return res.status(req.result.code).send(xmlString)
    }

    return res.status(req.result.code).send(req.result)
    
}