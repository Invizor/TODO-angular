export default class boardsComponentController{
  constructor($scope, LocalStorage){
    console.log("constructorBoards");
    this.$scope = $scope;
    this.LocalStorage = LocalStorage;
    this.boards = null;

  }

  $onInit() {
    this.$scope.$on('boards.init', () => {
      this.init();
    });
    this.init();
  }

  init() {
    this.boards =  this.LocalStorage.getBoards();
  }

  addBoard(){

    console.log("addBoard");

    this.LocalStorage.addBoard({
      "idBoard" : 0,
      "inputValue" : "",
      "title": "Введите название"
    });

    console.log("boardsT",this.boards);
  };

  removeBoard(id) {
    this.LocalStorage.removeBoard(id);
    this.$scope.$broadcast('task.remove', id);
  };
}

