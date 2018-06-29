let objTasks = {
    tasks: [

    ],
    doneTasks: [
 
    ],
    infoAllTasks: function(){
        return this.tasks.length + this.doneTasks.length;
    },
    infoDoneTasks: function(){
        return this.doneTasks.length;
    }
};


let infoAllTasks = document.getElementById('all-tasks'),
    infoDaneTask = document.getElementById('dane-task'),
    blockListTasks = document.getElementById('tasks-list'),
    inputValue = document.getElementById('input-create-task'),
    butCreatOk = document.getElementById('but-creat-ok');

inputValue.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        addNewTask(this.value);
        this.value = '';
    };
});

butCreatOk.addEventListener('click', function(){
        let valueTask = inputValue.value;
        addNewTask(valueTask);
        inputValue.value = '';
});

function addNewTask(valInput){
      let newTask = {
          content: valInput,
          status: false,
          id: doId()
      };
    
    objTasks.tasks.push(newTask);
    renderTasks(newTask);

    infoAllTasks.innerHTML = objTasks.infoAllTasks();
    infoDaneTask.innerHTML = objTasks.infoDoneTasks();
};


function init(){
    infoAllTasks.innerHTML = objTasks.infoAllTasks();
    infoDaneTask.innerHTML = objTasks.infoDoneTasks();
    
    for(val of objTasks.tasks){
        renderTasks(val);
    };
    
    for(val of objTasks.doneTasks){
        renderTasks(val);
    };
};

function renderTasks(el){
    let taskContent = el.content,
        id = el.id,
        status = el.status;
    
    let task = document.createElement('li');
        task.id = id;
    
        task.addEventListener('click', function(e){   
            if(this.firstChild.disabled){
                   if(e.target.tagName === 'LI' || e.target.tagName === 'INPUT'){
                      getDoneTask(this);
                    };
            }else{
                    if(e.target.tagName === 'LI'){
                      getDoneTask(this);
                    };
            };   
        });
 
        let contentTask = document.createElement('input');
            contentTask.value = taskContent;
            contentTask.disabled = 'disabled';
                      
        let blockNav = document.createElement('div');
        blockNav.classList.add('block-nav');
            let butEdit = document.createElement('div');
            butEdit.classList.add('edit-task');
    
            butEdit.addEventListener('click', function(){
                   let textInput = this.parentNode.parentNode.firstChild;
                       textInput.removeAttribute('disabled');
                       textInput.style.backgroundColor = '#cfdd85',
                       currentIdTask = textInput.parentNode.id;
                
                textInput.addEventListener('keyup', function(e){
                    if(e.keyCode === 13){
                        let allTask = [...objTasks.doneTasks, ...objTasks.tasks];
                        for(val of allTask){
                            if(val.id !== currentIdTask) continue;
                            val.content = textInput.value;
                            textInput.disabled = 'disabled';
                            textInput.style.backgroundColor = '';
                        };
                    }
                });
            });
    
            let butDel = document.createElement('div');
            butDel.innerHTML = 'x';
            butDel.classList.add('del-task');
            
            butDel.addEventListener('click', function(){
                delTask(this);
            });
    
    task.appendChild(contentTask);
    
        if(status){
            task.classList.add('tasks', 'tasks-done');
        }else{
            task.classList.add('tasks');
        };
    
    blockNav.appendChild(butEdit);
    blockNav.appendChild(butDel);
    
    task.appendChild(blockNav);
    
    blockListTasks.appendChild(task);
};


function getDoneTask(el){
    
    let status = el.classList.contains('tasks-done');
    
    const[delTask, addTask] = status ? [objTasks.doneTasks, objTasks.tasks] : [objTasks.tasks, objTasks.doneTasks];
    el.classList.toggle('tasks-done');
    
    for([index, val] of delTask.entries()){
        if(val.id !== el.id) continue;
        
        val.status = val.status ? val.status = false : val.status = true;
        
        addTask.push(val);
        delTask.splice(index, 1);
    };
    infoAllTasks.innerHTML = objTasks.infoAllTasks();
    infoDaneTask.innerHTML = objTasks.infoDoneTasks();
};
    

function delTask(el){
    let currentTask = el.parentNode.parentNode;
    let id = el.parentNode.parentNode.id;
    let status = currentTask.classList.contains('tasks-done');
    
    currentTask.remove();
    
    let delArrTask = status ? objTasks.doneTasks : objTasks.tasks;

    for([index, val] of delArrTask.entries()){
        if(val.id !== id) continue;
            delArrTask.splice(index, 1);
    };
        infoAllTasks.innerHTML = objTasks.infoAllTasks();
        infoDaneTask.innerHTML = objTasks.infoDoneTasks();
    };

function doId() {
        return Math.random().toString(36).substr(2, 16);
    };


init();


var a, b, c, d;
a = new Array(1,2,3);
b = "dog";
c = new Array(42, "cat");
d = a.concat(b, c);
console.log(d);