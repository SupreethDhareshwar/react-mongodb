var db = require('./Database');
db=new db();
db.connect();
module.exports=function(app){
  app.get('/api/matches', function (req, res) {
              db.getMatches(function(err,result){
            err ? res.send(500,err):res.send(200,result)
        });
      });
      app.get('/api/deliveries', function (req, res) {
                  db.getDeliveries(function(err,result){
                err ? res.send(500,err):res.send(200,result)
            });
          });
};
