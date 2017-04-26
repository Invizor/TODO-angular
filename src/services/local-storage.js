'use strict';

export default function repositoryService() {
  this._boards = [];
  this._tasks = [];
  this.currentIdBoard = 0;
  this.currentIdTask = 0;

  this.add_obj = function(key, obj) {
    let str = JSON.stringify(obj);
    localStorage.setItem(key, str);
  };

  this.get_obj = function(key) {
    let obj = JSON.parse(localStorage.getItem(key));
    return obj;
  };

  this.remove_obj = function(key) {
    localStorage.removeItem(key);
  };

  this.change_obj = function(key, obj) {
    localStorage[key] = JSON.stringify(obj);
  };

  this.clearRep = function() {
    localStorage.clear();
  };

  this.get_all = function() {
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let obj = JSON.parse(localStorage.getItem(key));
      arr.push(obj);
    }
    return arr;
  };

  //----------------------------------------------->

  this.addBoard = function(data) {
    let arr = (this.get_obj("boards") ? this.get_obj("boards") : []);
    let maxCurrentId = 0;

    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idBoard >= maxCurrentId )maxCurrentId = arr[i].idBoard+1;
      }
    }
    this.currentIdBoard = maxCurrentId;
    data.idBoard = this.currentIdBoard;
    arr.push(data);
    this.add_obj('boards', arr);
    this._boards.push(data);

  };

  this.addTask = function(data) {

    let arr = (this.get_obj("tasks") ? this.get_obj("tasks") : []);
    let maxCurrentId = 0;

    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idTask >= maxCurrentId )maxCurrentId = arr[i].idTask+1;
      }
    }
    this.currentIdTask = maxCurrentId;
    data.idTask = this.currentIdTask;
    arr.push(data);
    this.add_obj('tasks', arr);
    this._tasks.push(data);

    console.log("this._tasks",this._tasks);
  };

  this.removeBoard = function(idBoard) {
    console.log("RemoveBoard:this._boards",this._boards);
    console.log("RemoveBoard:localStorage",this.get_obj('boards'));
    let arr = this.get_obj('boards');
    let index = -1;
    let maxCurrentId = 1;
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].idBoard == idBoard){
        index = i;
      }
      if (arr[i].idBoard > maxCurrentId) maxCurrentId = arr[i].idBoard + 1;
    }
    if (maxCurrentId <= this.currentIdBoard) this.currentIdBoard = maxCurrentId;
    if (index != -1) arr.splice(index,1);
    this._boards.splice(index,1);
    this.add_obj('boards',arr);
    console.log("afterRemoveBoard:this._boards",this._boards);
    console.log("afterRemoveBoard:localStorage",this.get_obj('boards'));
  };

  this.removeTask= function(idTask) {
    let arr = this.get_obj('tasks');
    let index = -1;
    let maxCurrentId = 1;
    for(let i = 0; i<arr.length ;i++){
      if(arr[i].idTask == idTask){
        index = i;
      }
      if(arr[i].idTask > maxCurrentId)maxCurrentId = arr[i].idTask+1;
    }
    if(maxCurrentId <= this.currentIdTask)this.currentIdTask = maxCurrentId;
    if(index != -1) arr.splice(index,1);
    this._tasks.splice(index,1);
    this.add_obj('tasks',arr);
  };

  this.getBoards = function() {
    console.log("LSboards",this.get_obj('boards'));
    if(this.get_obj('boards')) {
      this._boards = this.get_obj('boards');
    }
    return this._boards;
  };

  this.getTasks = function() {
    if(this.get_obj('tasks')) {
      this._tasks = this.get_obj('tasks');
    }
    return this._tasks;
  };

  this.getTasksByIdBoard = function(idBoard) {
    if(this.get_obj('tasks')) {
      this._tasks = this.get_obj('tasks');
    }
    return this._tasks.filter((task) => {
      return (task.idBoard == idBoard)
    });
  };

  this.setBoards = function(arrBoards) {
    this._boards = arrBoards;
    this.add_obj('boards',arrBoards);
  };

  this.setTasks = function(arrTasks) {
    this._tasks = arrTasks;
    this.add_obj('tasks',arrTasks);
  };

  return this;
};
