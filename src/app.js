import angular from 'angular';
import Boards from './boards/boards.controller';
import Board from './board/board.controller';
import LocalStorage from './services/local-storage';
import BoardsController from './pages/boards.controller';

import inputTitle from './directives/input-title';

angular.module('myApp', [])
  .service('LocalStorage', LocalStorage)
  .controller('boardsController', BoardsController)
  .directive('inputTitle', inputTitle)
  .component('boards', {
    controller: Boards,
    controllerAs: 'dataBoards',
    templateUrl: 'src/boards/boards.template.html',
  })
  .component('board', {
    templateUrl: 'src/board/board.template.html',
    controller: Board,
    controllerAs: 'dataBoard',
    bindings: {
      data: '=',
      onRemove: '&'
    }
  });
