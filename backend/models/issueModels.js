const uuid = require('uuid');

class IssueModel {
  constructor(title, description) {
    this._id = uuid.v4();
    this.title = title;
    this.description = description;
  }

  get id() {
    return this._id;
  }
}

module.exports = IssueModel;