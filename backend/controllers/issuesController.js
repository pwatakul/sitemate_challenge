const uuid = require('uuid');
const IssueModels = require('../models/issueModels');
const responseHandlers = require('../utills/responseHandlers');

let issues = [
  new IssueModels('Object 1', 'Description of Object 1'),
  new IssueModels('Object 2', 'Description of Object 2'),
];

// Middleware to check missing 'title'
function checkTitle(req, res, next) {
  const { title } = req.body;
  if (!title) {
    return responseHandlers.badRequest(res, "'title' field is required");
  }
  next();
}

// Controller functions
const issuesController = {
  getAllIssues: (req, res) => {
    responseHandlers.success(res, issues);
  },
  getIssueById: (req, res) => {
    const id = req.params.id;
    const issue = issues.find(issue => issue.id === id);
    if (issue) {
      responseHandlers.success(res, issue);
    } else {
      responseHandlers.notFound(res, 'Issue not found');
    }
  },
  createIssue: [checkTitle, (req, res) => {
    const { title, description } = req.body;
    const id = uuid.v4(); // Generate a unique ID
    const newIssue = new IssueModels(title, description);
    issues.push(newIssue);
    responseHandlers.success(res, newIssue, 201);
  }],

  updateIssue: (req, res) => {
    const id = req.params.id;
    const index = issues.findIndex(issue => issue.id === id);
    if (index !== -1) {
      const { title, description } = req.body;
      issues[index].title = title ? title : issues[index].title;
      issues[index].description = description ? description : issues[index].description;

      responseHandlers.success(res, issues[index]);
    } else {
      responseHandlers.notFound(res, 'Issue not found');
    }
  },

  deleteIssue: (req, res) => {
    const id = req.params.id;
    const index = issues.findIndex(issue => issue.id === id);
    if (index !== -1) {
      const deletedIssue = issues.splice(index, 1);
      responseHandlers.success(res, deletedIssue, 204);
    } else {
      responseHandlers.notFound(res, 'Issue not found');
    }
  }
};

module.exports = issuesController;