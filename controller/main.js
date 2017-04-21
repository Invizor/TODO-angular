'use strict';

import angular from 'angular';
import repositoryService from '../services/local-storage';

console.log('INITT test 2');


let app = angular.module("myApp", [])
.service('LocalStorage', repositoryService);

app.controller("boards", function($scope, LocalStorage) {
  console.log("BoardsCont");
  let currentId = 1;
  $scope.boards = [];

  $scope.init = function (){
    console.log("initBoards");
    let arr = LocalStorage.get_obj("boards");
    let maxCurrentId = 1;

    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idBoard > maxCurrentId )maxCurrentId = arr[i].idBoard+1;
      }
      $scope.boards = arr;
      currentId = maxCurrentId;
    }
  };
  $scope.addBoard = function (){
    console.log("addBoard");
    $scope.boards.push({
      "idBoard" : (currentId+1),
      "inputValue" : "",
      "title": ""
    });
    LocalStorage.add_obj("boards",$scope.boards);
    currentId++;
  };
  $scope.removeBoard = function (index) {
    console.log("removeBoard");
    let board = $scope.boards.splice(index,1);
    $scope.$broadcast('task.remove', board[0].idBoard);
    LocalStorage.add_obj("boards",$scope.boards);
  };
});

app.controller("board", function($scope, LocalStorage) {
  console.log("BoardCont");
  let currentId = 1;
  $scope.tasks = [];

  $scope.init = function (){
    console.log("initBoardTask");
    let maxCurrentId = 1;
    let arr = LocalStorage.get_obj("tasks");
    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idTask > maxCurrentId ) maxCurrentId = arr[i].idTask+1;
      }
      $scope.tasks = arr;
      currentId = maxCurrentId;
    }
  };

  $scope.$on('task.remove', (event, id) => {
    console.log("Emitter");
    $scope.tasks = $scope.tasks.filter((item) => { return (item.idBoard !== id) });
    LocalStorage.add_obj("tasks",$scope.tasks);
  });

  $scope.addTask = function (idBoard){
    console.log("addTask");
    let elem = $scope.$parent.boards.filter((board)=> {
      return (board.idBoard == idBoard);
    })[0];
    console.log("elem",elem);
    $scope.tasks.push({
      "idBoard" : idBoard,
      "idTask" : (currentId+1),
      "text" : elem.inputValue,
      "flComplete": false
    });
    currentId++;

    $scope.$parent.boards.map((board)=> {
      if (board.idBoard == elem.idBoard) {
        board.inputValue = "";
      }
    });

    LocalStorage.add_obj("tasks",$scope.tasks);

  };

  $scope.getTaskForCurrentBoard = function (idBoard){
    console.log("getTaskForCurrentBoard");
    return $scope.tasks.filter((task) => {
      return (task.idBoard == idBoard);
    });
  };

  $scope.removeTask = function (taskId){
    console.log("removeTask");
    let index = 0;
    console.log("tasks",$scope.tasks);
    console.log("taskId",taskId);
    for(let i = 0; i < $scope.tasks.length; i++){
      console.log("i=", i);
      if($scope.tasks[i].idTask == taskId){
        index = i;
        break;
      }
    }
    $scope.tasks.splice(index,1);
    LocalStorage.add_obj("tasks",$scope.tasks);
  };

  $scope.completeTask = function(idTask){
    LocalStorage.add_obj("tasks",$scope.tasks);
  }
});