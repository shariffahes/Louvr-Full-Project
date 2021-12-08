var Exhibition = require('../models/Exhibition')
var async = require('async')


exports.index = (req,res)=>{
    async.parallel({
        
    }, (err,results)=>{
        res.render('index',{title:'Exhibition',error:err,data:results});
    })
}