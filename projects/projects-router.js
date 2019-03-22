const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

// Schema
// id           (number)	the database will generate it
// name	        (string)	required.
// description	(string)	required.
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


module.exports = router;