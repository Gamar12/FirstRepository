

const taskField = document.getElementById('newTaskInput');
const taskUl = document.getElementsByClassName('todo-tasks')[0];

const addTask = () => {
	let taskLi = document.createElement('li');
	let completeInput = document.createElement('input');
	let removeBTN = document.createElement('button');
	let textSPAN = document.createElement('span');

	textSPAN.className = 'task-text';
	textSPAN.innerText = taskField.value;

	removeBTN.className = 'remove-btn';
	removeBTN.innerHTML = '&#10005';
	removeBTN.onclick = removeTask;

	completeInput.type = "checkbox";

	taskLi.className = 'task-item';

	taskLi.appendChild(completeInput);
	taskLi.appendChild(textSPAN);
	taskLi.appendChild(removeBTN);
	taskUl.appendChild(taskLi);
}

const removeTask = function (){
	this.parentElement.remove();
}

const loadTasks = () => {

}