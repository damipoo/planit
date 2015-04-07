'use strict';

module.exports = function boardInstaller(
  boardController,
  issueController,
  userController
) {
  return {
    install: install
  };

  function install(api) {
    // Handle boards
    api.get('/api/boards', boardController.getAll);
    api.post('/api/boards', boardController.create);

    // Handle users in a board
    api.post('/api/boards/:boardId/users', userController.invite);
    api.get('/api/boards/:boardId/users', userController.getAll);

    // Handle issues in a board
    api.post('/api/boards/:boardId/issues', issueController.create);
    api.get('/api/boards/:boardId/issues', issueController.getAll);

    // Handle and issue
    api.patch('/api/boards/:boardId/issues/:issueId', issueController.patch);
    api.get('/api/boards/:boardId/issues/:issueId', issueController.get);
  }
};
