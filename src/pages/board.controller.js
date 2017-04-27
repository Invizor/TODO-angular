
"use strict";

export default class BoardController {
  constructor(LocalStorage, $state) {
    this.data = LocalStorage.getBoardById($state.params.id);
  }
}