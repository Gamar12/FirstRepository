

const taskField = document.getElementById('newTaskInput');
const taskUl = document.getElementsByClassName('todo-tasks')[0];
const getAddButton = document.getElementById('addTask');
let itemsArray = [];

const addTask = (task = {}) => {
    let taskLi = document.createElement('li');
    let completeInput = document.createElement('input');
    let removeBTN = document.createElement('button');
    let textSPAN = document.createElement('span');

    textSPAN.className = 'task-text';
    textSPAN.innerText = task.desc || taskField.value;

    // taskField.value = '';

    console.log(getAddButton);
    getAddButton.onclick = isEmpty;

    removeBTN.className = 'remove-btn';
    removeBTN.innerHTML = '&#10005';
    removeBTN.onclick = removeTask;

    completeInput.type = "checkbox";
    completeInput.onclick = doneTask;

    task.id && (taskLi.dataset.taskId = String(task.id));
    taskLi.className = 'task-item';

    if (!Object.keys(task).length) {
		const taskId = Math.floor(Math.random() * Math.floor(100000000));
		let taskObj = {
    		id:taskId,
    		desc: taskField.value
    	};
    
    	taskLi.dataset.taskId = String(task.id);

    	addTaskToArray(taskObj);
    	syncStorage();
	}

    taskLi.appendChild(completeInput);
    taskLi.appendChild(textSPAN);
    taskLi.appendChild(removeBTN);
    taskUl.appendChild(taskLi);
};

const addTaskToArray = (task) => {
	itemsArray.push(task);
}

const removeTask = function (){
    this.parentElement.remove();
    removeTaskFromArray(this.parentElement.dataset.taskId);
    syncStorage();
};

const removeTaskFromArray = (taskId) => {
	const index = itemsArray.findIndex(function(task){
		return String(task.id) === taskId;
	});

	itemsArray.splice(index,1);	
}

// const clearInput = function () {
//     addTask.onclick()
// }

const loadTasks = () => {


};

const isEmpty = function () {

    if (taskField.value === ''){
       	getAddButton.classList.remove('disabled')
    }else {
        addTask()
    }

}

const clearTasks = function () {
   let ul = taskUl;
   if (ul){
       while (ul.firstChild){
           ul.removeChild(ul.firstChild)
       }
   }

};

const syncStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(itemsArray))
};

const loadTasksList = () => {
	itemsArray = JSON.parse(localStorage.getItem('tasks')) || [];
	
	itemsArray.forEach(task => {
		addTask(task);
	})	
}

const doneTask  = function (){
	document.querySelectorAll('.done').forEach( el => el.remove());
  this.parentElement.className = 'change-fon';
  this.nextElementSibling.className = 'change-text';

};

taskField.addEventListener('keydown', () => {
    if(event.code === 'Enter' && taskField.value !== ''){
         addTask()
    }
});

loadTasksList();