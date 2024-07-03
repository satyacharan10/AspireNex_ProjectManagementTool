const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const projectSchema = new mongoose.Schema({
    name: String,
    tasks: [{
        name: String,
        deadline: Date
    }]
});

const Project = mongoose.model('Project', projectSchema);

app.post('/projects', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.send(project);
});

app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.send(projects);
});

app.post('/projects/:id/tasks', async (req, res) => {
    const project = await Project.findById(req.params.id);
    project.tasks.push(req.body);
    await project.save();
    res.send(project);
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
