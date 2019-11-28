//слайдер
(function() {
    'use strict';
    window.addEventListener('load', function() {
        const forms = document.getElementsByClassName('myForm');
            const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

$('.my-carousel').carousel({
    interval: 4000
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//значения переменной
var addButton = document.getElementById('add');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinished-tasks');
var finishedTasks = document.getElementById('finished-tasks');



//методы кнопки
function createNewElement(task, finished) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('button');

    if(finished){
        checkbox.className = "checkbox";
        checkbox.innerHTML = "<i>&#9745;</i>";
    }else {
        checkbox.className = "checkbox";
        checkbox.innerHTML = "<i>&#9744;</i>";
    }


    var label = document.createElement('label');
    label.innerText = task;
    var input = document.createElement('input');
    input.type = "text";
    var editButton = document.createElement('button');
    editButton.className = "edit";
    editButton.innerHTML = "<i>&#9998;</i>";
    var deleteButton = document.createElement('button');
    deleteButton.className = "delete";
    deleteButton.innerHTML = "<i>&#10060;</i>";

//добавить в список
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    return listItem;//вернуть значение
}

function addTask() {
    if (inputTask.value) {
        var listItem = createNewElement(inputTask.value, false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask)
        inputTask.value = "";
    }

}
//нажатие на кнопки объявим функции

addButton.onclick = addTask;

//удалить задачу
function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);

}
//редактировать задачу
function editTask() {

    var editButton = this;
    var listItem = this.parentNode;
    var label = listItem.querySelector('label');
    var input = listItem.querySelector('input[type=text]');

    var containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "edit";
        editButton.innerHTML = "<i>&#9998;</i>";

    } else {
        input.value = label.innerText;
        editButton.className = "save";
        editButton.innerHTML = "<i>&#10003;</i>";

    }
    listItem.classList.toggle('editMode'); //переключатель
}

//задача завершена
function finishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i>&#9745;</i>";
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);

}
//возврат и перенос задачи
function unfinishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i>&#9744;</i>";

    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

//привязать методы к новому элементу при создании
function bindTaskEvents(listItem, checkboxEvent) {
    var checkbox = listItem.querySelector('button.checkbox');
    var editButton = listItem.querySelector('button.edit');
    var deleteButton = listItem.querySelector('button.delete');

//весим обработчик

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

}

//enter
var input = document.getElementById("new-task");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("add").click();
  }

});

// очищение списка
  function removeAll(){
  var lst = document.getElementsByTagName("ul");
    lst[0].innerHTML = "";
  }
