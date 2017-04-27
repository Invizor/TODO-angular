
export default class boardComponentController{
  constructor($scope, LocalStorage,$state){
    this.$scope = $scope;
    this.$state = $state;
    this.LocalStorage = LocalStorage;
    //this.data = data;

    this.tasks = null;


    this.$scope.$on('task.remove', (event, id) => {
      console.log("Emitter");
      let arr = this.LocalStorage.getTasks();
      arr = arr.filter((item) => { return (item.idBoard !== id) });
      this.LocalStorage.setTasks(arr);
    });

    this.onChangeTitle.bind(this);
  }

  $onInit(){
    this.$scope.$on('tasks.init', () => {
      this.init(this.data.idBoard);
    });
    console.log("this.data",this.data);
    this.init(this.data.idBoard);
  }

  init(idBoard) {
    //console.log("data",this);
    this.tasks =  this.LocalStorage.getTasksByIdBoard(idBoard);
    console.log("tasks",this.tasks);
  }

  addTask(idBoard){
    this.LocalStorage.addTask({
      "idBoard" : idBoard,
      "idTask" : 0,
      "text" : this.data.inputValue,
      "flComplete": false
    });

    this.data.inputValue = "";

    this.init(idBoard);
    console.log("this.tasks",this.tasks);

  };

  getTaskForCurrentBoard(idBoard){

    console.log("getTaskForCurrentBoard");

    let arr = this.LocalStorage.getTasks();

    console.log("arrT",arr);

    return arr.filter((task) => {
      return (task.idBoard == idBoard);
    });
  };

  removeTask(taskId){

    console.log("removeTask");
    this.LocalStorage.removeTask(taskId);

    this.init(this.data.idBoard);
  };

  completeTask(idTask){

    let arr = this.LocalStorage.getTasks();
    let index = 0;
    for(let i=0; i < arr.length; i++){
      if(arr[i].idTask ==idTask){
        index = i;
        break;
      }
    }

    arr[index].flComplete = !arr[index].flComplete;

    this.LocalStorage.setTasks(arr);
  }

  removeBoard() {
    this.onRemove();
  }

  //редактирование таска
  onChangeTask(title, context,idTask) {
    context.tasks.map((task)=> {
      if (task.idTask == idTask) {
        task.text = title;
      }
    });

    context.LocalStorage.setTasks(context.tasks);
  }

  //редактирование title board
  onChangeTitle(title, context,idBoard){
    context.data.title = title;

    let arr = context.LocalStorage.getBoards();

    arr.map((board) => {
      if(board.idBoard == idBoard){
        board.title = title;
      }
    });

    context.LocalStorage.setBoards(arr);
  }


  goToBoard(idBoard) {
    console.log("this",this);
    this.$state.go("currentBoard",{ id: idBoard});
  }
};
