const express = require("express");
const cors = require("cors");

const { uuid,isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
  // TODO
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const project = {
    id : uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(project);
 response.json(project);
});

app.put("/repositories/:id",  (request, response) => {
  const {id} = request.params;
  const { title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoryIndex < 0){ response.status(400).json({message: "Repository not found"});}

  repositories[repositoryIndex] = { ...repositories[repositoryIndex], id, title, url, techs};
  const repository = repositories[repositoryIndex];

  response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoryIndex < 0){ response.status(400).json({message: "Repository not found"});}

  repositories.splice(repositoryIndex,1);

  const repository = repositories.find(repo => repo.id === id);
  
  response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repository = repositories.find(repo => repo.id === id);
  if(!repository){ response.status(400).json({message: "Repository not found"});}

  repository.likes += 1;
  response.json(repository);

});

module.exports = app;
