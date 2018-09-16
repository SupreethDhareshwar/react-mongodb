var db = require('./Database');
db=new db();
db.connect();
module.exports=function(app){
  app.get('/api/tedData', function (req, res) {
              db.getTedData(function(err,result){
            err ? res.send(500,err):res.send(200,result)
        });
      });
   
};
