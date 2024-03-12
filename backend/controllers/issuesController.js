const IssueModels = require('../models/issueModels');

let issues = [
  new IssueModels('Object 1', 'Description of Object 1'),
  new IssueModels('Object 2', 'Description of Object 2'),
];

// Controller functions
const issuesController = {
  getAllIssues: (req, res) => {
    res.status(200).json(issues);  
  },
  getIssueById: (req, res) => {
    res.status(200);
  },
  createIssue: (req, res) => {
    res.status(200);
  },

  updateIssue: (req, res) => {
    res.status(200);
  },

  deleteIssue: (req, res) => {
    res.status(200);
  }
};

module.exports = issuesController;