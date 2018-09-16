var config=require("../config.json");



module.exports=function(app){
  app.get('/api/tedData', async (req, res,next)=> {
    try{
      const db = req.app.locals.db;
      const tedData = await db.collection(config.db.connection.tedCollection).find({}).limit(100).toArray();
        if(tedData){
          res.send(tedData);
        }
        else{
          res.sendStatus(404);
        }
    }
    catch(err){
        next(err);
    }
  });
   
};
