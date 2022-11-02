const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://SarahMI:developer2@cluster0.4yry0o4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const createError = require('http-errors')





exports.index = function (req, res) {
  client.connect (async (err) => {
    const findResult = client.db('myFirstDatabase').collection('todos').find();
    const result = await findResult.toArray();
    res.send(result);
  });
}

exports.create = function (req, res, next) {
 
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  client.connect ((err) => {
		client.db('myFirstDatabase')
    .collection('todos')
    .insertOne({
      name:req.body.name,
      description:req.body.description
    })
    .then ( () => { res.send({ result: true }) } )
	});

}

exports.show = function (req, res, next) {
  client.connect (async (err) => {
    console.log(req.params.id);
		client.db('myFirstDatabase').collection('todos').findOne({_id: ObjectId(req.params.id)})
    .then ( (result) => {
      if(result) {
        return res.send(result);
      }
      return (next(createError(404,"no todo with that id")))
    } )
	});
}



exports.delete = function (req, res, next) {
  client.connect (async (err) => {
		client.db('myFirstDatabase').collection('todos').deleteOne({ _id: ObjectId(req.params.id)})
    .then ( (result) => {
      if(result.deletedCount) {
        return res.send({result: true});
      }
      return (next(createError(404,"no todo with that id")))
    } )
	});
}

exports.update = function (req, res, next) {
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }

  client.connect ( async (err) => {
    if(err){
      return (next(createError(500, `Error: ${err}`)))
    }
		const result = await client.db('myFirstDatabase').collection('todos').updateOne(
      { _id: ObjectId(req.params.id)},
      {
        $set: {
          name:req.body.name,
          description:req.body.description
        }
      }
    )
    
      if(result.matchedCount) {
        return res.send({result: true});
      }
      return (next(createError(404,"no todo with that id")))
    }) 
	};
