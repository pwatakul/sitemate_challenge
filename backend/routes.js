const express = require('express');
const router = express.Router();
const issuesController = require('./controllers/issuesController');

router.get('/issues', issuesController.getAllIssues);
router.get('/issues/:id', issuesController.getIssueById);
router.post('/issues', issuesController.createIssue);
router.put('/issues/:id', issuesController.updateIssue);
router.delete('/issues/:id', issuesController.deleteIssue);

module.exports = router