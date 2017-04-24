export default class boardsComponentController{
  constructor($scope, LocalStorage){
    console.log("constructorBoards");
    this.$scope = $scope;
    this.LocalStorage = LocalStorage;
    this.currentId = 1;
    this.boards = [];

    let arr = this.LocalStorage.get_obj("boards");
    let maxCurrentId = 1;

    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idBoard > maxCurrentId )maxCurrentId = arr[i].idBoard+1;
      }
      this.boards = arr;
      this.currentId = maxCurrentId;
    }
  }

  updateData(){
    this.currentId = 1;
    this.boards = [];

    let arr = this.LocalStorage.get_obj("boards");
    let maxCurrentId = 1;

    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idBoard > maxCurrentId )maxCurrentId = arr[i].idBoard+1;
      }
      this.boards = arr;
      this.currentId = maxCurrentId;
    }
  }

  addBoard(){

    //обновление бордов
    this.updateData();

    console.log("addBoard");
    this.boards.push({
      "idBoard" : (this.currentId+1),
      "inputValue" : "",
      "title": ""
    });
    this.LocalStorage.add_obj("boards",this.boards);
    this.currentId++;
  };

  removeBoard(index) {

    //обновление бордов
    this.updateData();

    console.log("removeBoard");
    let board = this.boards.splice(index,1);
    this.$scope.$broadcast('task.remove', board[0].idBoard);
    this.LocalStorage.add_obj("boards",this.boards);
  };
}

