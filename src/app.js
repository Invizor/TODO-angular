import angular from 'angular';
import Boards from './boards/boards.controller';
import Board from './board/board.controller';
import LocalStorage from './services/local-storage';
import BoardsController from './pages/boards.controller';
import BoardController from './pages/board.controller';

import inputTitle from './directives/input-title';

angular.module('myApp', [require('angular-ui-router')])
  .service('LocalStorage', LocalStorage)
  .controller('boardsController', BoardsController)
  .controller('boardController', BoardController)
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
  })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    // Любые неопределенные url перенаправлять на /
    //$urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);
    // определяем состояния

    $stateProvider
      .state('Boards', {
        url: "/",
        templateUrl: "src/pages/boards.page.html",
        controller: 'boardsController',
        controllerAs: '$boards'
        // template: `<h1>Hello world</h1>`
      })
      .state('currentBoard', {
        url: "/board/:id",
        template: '<board data="$myBoard.data"> </board>',
        controller: 'boardController',
        controllerAs: '$myBoard'
        // template: `<h1>Hello world</h1>`
      })
      /*.state('Board', {
        url: "/board/:id",
        template: "<h1>{{vm.title}}</h1>",
        controller: function($state) {
          this.title = $state.params.id;
        },
        controllerAs: 'vm'
        // template: `<h1>Hello world</h1>`
      })*/
      /*.state('Board', {
        url: "/board/:title",
        templateUrl: "src/board/board.template.html",
        controlller: Board,
        controllerAs: 'dataBoard'
      })*/
  });
