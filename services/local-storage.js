'use strict';

export default function repositoryService() {
  this._boards = [];
  this._tasks = [];

  this.add_obj = function(key, obj) {
    let str = JSON.stringify(obj);
    localStorage.setItem(key, str);
  };

  this.get_obj = function(key) {
    let obj = JSON.parse(localStorage.getItem(key));
    return obj;
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

  this.addBoard = function(data) {
    this.add_obj('boards', data);
  };

  this.addTasks = function(data) {
    this.add_obj('tasks', data);
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

  return this;
};


function test() {
  return {
    addBoard: function() {console.log('blalbjalk')}
  };
}

let factory = test();
let servic = new repositoryService();