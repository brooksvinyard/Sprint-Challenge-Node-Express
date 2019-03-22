const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

// Schema
// id           (number)	the database will generate it
// *name	        (string)	required.
// *description	(string)	required.
// completed	(boolean)	used to indicate completed, not required

// GET /api/projects
// Get all projects
router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(404).json({message: 'The project could not be retrieved.'});
    })
});

// GET /api/projects/:id
// Get a project by id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Projects.get(id)
    .then(projects => {
        if (!projects) {
            res.status(500).json({message: 'The project with the specified ID does not exist.'});
        } else {
            res.status(200).json(projects);
        }
    }).catch(error => {
        res.status(404).json({message: 'The project could not be retrieved.'});
    })
});


// POST /api/projects
// Add a projects
router.post('/', (req, res) => {
    const projectInfo = req.body;
  
    Projects.insert(projectInfo).then(projects => {
        if( !projectInfo.name || !projectInfo.description) {
            res.status(400).json({message: 'Please provide the name and description for the project.'});
        } else {
            res.status(201).json(projects);
        }
    })
    .catch(error => {
        res.status(500).json({message: 'There was an error while saving the project.'});
    })
});


// DELETE /api/projects/:id
// Delete a project by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Projects.remove(id).then(deleted => {
        if (!deleted) {
            res.status(500).json({message: 'The project with the specified ID does not exist.'});
        } else {
            res.status(204).end();
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The project could not be removed'});
    })
});


// PUT /api/projects/:id
// Update a project by id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
  
    Projects.update(id, changes).then(updated => {
        if (!id) {
            res.status(500).json({message: 'The project with the specified ID does not exist.'});
        } else if (!changes.name || !changes.description) {
            res.status(400).json({message: 'Please provide the name and description for the project.'});
        } else if(updated) {
            res.status(200).json(changes);
        } else {
            res.status(404).json({message: 'project not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The project information could not be modified.'});
    })
});

module.exports = router;