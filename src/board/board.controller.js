

export default class boardComponentController{
  constructor($scope, LocalStorage){
    this.$scope = $scope;
    this.LocalStorage = LocalStorage;
    //this.data = data;
    
    this.currentId = 1;
    this.tasks = [];

    let maxCurrentId = 1;
    let arr = this.LocalStorage.get_obj("tasks");
    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idTask > maxCurrentId ) maxCurrentId = arr[i].idTask+1;
      }
      this.tasks = arr;
      this.currentId = maxCurrentId;
    }

    this.$scope.$on('task.remove', (event, id) => {
      console.log("Emitter");
      this.tasks = this.tasks.filter((item) => { return (item.idBoard !== id) });
      this.LocalStorage.add_obj("tasks",this.tasks);
    });
  }

  updateData(){
    this.currentId = 1;
    this.tasks = [];
    let maxCurrentId = 1;
    let arr = this.LocalStorage.get_obj("tasks");
    if(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].idTask > maxCurrentId ) maxCurrentId = arr[i].idTask+1;
      }
      this.tasks = arr;
      this.currentId = maxCurrentId;
    }
  }

  addTask(idBoard){
    console.log("addTask", idBoard);

    //обновление массива тасков
    this.updateData();

    this.tasks.push({
      "idBoard" : idBoard,
      "idTask" : (this.currentId+1),
      "text" : this.data.inputValue,
      "flComplete": false
    });
    this.currentId++;

    this.data.inputValue = "";

    this.LocalStorage.add_obj("tasks",this.tasks);

  };

  getTaskForCurrentBoard(idBoard){

    console.log("getTaskForCurrentBoard");
    return this.tasks.filter((task) => {
      return (task.idBoard == idBoard);
    });
  };

  removeTask(taskId){

    //обновление массива тасков
    this.updateData();

    console.log("removeTask");
    let index = 0;
    console.log("tasks",this.tasks);
    console.log("taskId",taskId);
    for(let i = 0; i < this.tasks.length; i++){
      console.log("i=", i);
      if(this.tasks[i].idTask == taskId){
        index = i;
        break;
      }
    }
    this.tasks.splice(index,1);
    this.LocalStorage.add_obj("tasks",this.tasks);
  };

  completeTask(idTask){

    //обновление массива тасков
    this.updateData();

    let index = 0;
    for(let i=0; i < this.tasks.length; i++){
      if(this.tasks[i].idTask ==idTask){
        index = i;
        break;
      }
    }

    this.tasks[index].flComplete = !this.tasks[index].flComplete;

    this.LocalStorage.add_obj("tasks",this.tasks);
  }

  removeBoard() {
    this.onRemove();
  }
};
