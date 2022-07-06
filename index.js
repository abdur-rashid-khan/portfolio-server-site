
const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DB connected')
})
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lqf9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const ServiceCollation = client.db('portfolio').collection('services');
    const ProjectCollation = client.db('portfolio').collection('projects');
    const skillsCollation = client.db('portfolio').collection('skills');
    const reviewCollation = client.db('portfolio').collection('review');
    const blogCollation = client.db('portfolio').collection('blog');
    app.post('/services',async(req,res )=>{
      const servicesData = req.body;
      const result = await ServiceCollation.insertOne(servicesData);
      res.send(result);
    })
    app.get('/services',async(req,res)=>{
      const result = await ServiceCollation.find().toArray();
      res.send(result);
    })
    // projects
    app.post('/project-add',async(req,res )=>{
      const projectData = req.body;
      const result = await ProjectCollation.insertOne(projectData);
      res.send(result);
    })
    app.get('/projects',async(req,res)=>{
      const result = await ProjectCollation.find().toArray();
      res.send(result);
    })
    // skill
    app.post('/skill-add',async(req,res )=>{
      const projectData = req.body;
      const result = await skillsCollation.insertOne(projectData);
      res.send(result);
    })
    app.get('/skills',async(req,res)=>{
      const result = await skillsCollation.find().toArray();
      res.send(result);
    })
    // add review
    app.post('/add-review',async(req,res )=>{
      const projectData = req.body;
      const result = await reviewCollation.insertOne(projectData);
      res.send(result);
    })
    app.get('/review',async(req,res)=>{
      const result = await reviewCollation.find().toArray();
      res.send(result);
    })
    // blog
    app.post('/add-blog',async(req,res )=>{
      const projectData = req.body;
      const result = await blogCollation.insertOne(projectData);
      res.send(result);
    })
    app.get('/blog',async(req,res)=>{
      const result = await blogCollation.find().toArray();
      res.send(result);
    })
    app.get('/blog/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = { _id : ObjectId(id) };
      const result = await blogCollation.find(filter).toArray();
      res.send(result);
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`localhost ${port}`) 
})