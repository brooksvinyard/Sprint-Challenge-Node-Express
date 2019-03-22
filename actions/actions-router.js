const express = require('express');

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

// Schema
// id	        (number)	the database will generate it.
// *project_id	(number)	required, must be the id of an existing project.
// *description	(string)	up to 128 characters long, required.
// *notes	    (string)	no size limit, required. Used to record additional notes or requirements to complete the action.
// completed	(boolean)	used to indicate if the action has been completed, not required

// GET /api/actions
// Get all actions
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(404).json({message: 'The actions could not be retrieved.'});
    })
});

// GET /api/actions/:id
// Get an actions by id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Actions.get(id)
    .then(actions => {
        if (!actions) {
            res.status(500).json({message: 'The action with the specified ID does not exist.'});
        } else {
            res.status(200).json(actions);
        }
    }).catch(error => {
        res.status(404).json({message: 'The action could not be retrieved.'});
    })
});


// POST /api/actions
// Add an action
router.post('/', (req, res) => {
    const actionInfo = req.body;
  
    Actions.insert(actionInfo).then(actions => {
        if( !actionInfo.project_id || !actionInfo.description || !actionInfo.notes) {
            res.status(400).json({message: 'Please provide the project ID, description, and notes for the action.'});
        } else {
            res.status(201).json(actions);
        }
    })
    .catch(error => {
        res.status(500).json({message: 'There was an error while saving the action.'});
    })
});


// DELETE /api/actions/:id
// Delete an action by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Actions.remove(id).then(deleted => {
        if (!deleted) {
            res.status(500).json({message: 'The action with the specified ID does not exist.'});
        } else {
            res.status(204).end();
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The action could not be removed'});
    })
});


// PUT /api/actions/:id
// Update an action by id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
  
    Actions.update(id, changes).then(updated => {
        if (!id) {
            res.status(500).json({message: 'The action with the specified ID does not exist.'});
        } else if (!changes.project_id || !changes.description || !changes.notes) {
            res.status(400).json({message: 'Please provide the project ID, description, and notes for the action.'});
        } else if(updated) {
            res.status(200).json(changes);
        } else {
            res.status(404).json({message: 'action not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The project action could not be modified.'});
    })
});


module.exports = router;