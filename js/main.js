// Дата на сегодня
let today = new Date();
function gfg_Run() {
  let date = today.toJSON().slice(0, 10);
  let nDate = date.slice(8, 10) + '/'
    + date.slice(5, 7) + '/'
    + date.slice(0, 4);

  return nDate
}

// DOM

// Header
let container = document.createElement('div')
container.classList.add('container')


let header = document.createElement('div')
header.classList.add('header')

let headerContent = document.createElement('div')
headerContent.classList.add('header-content')

let title = document.createElement('h1')
title.classList.add('h1')
title.textContent = 'Список дел'

let headerSpan = document.createElement('span')
headerSpan.classList.add('header-span')
headerSpan.textContent = `Сегодня ${gfg_Run()}`


document.body.append(header)
header.append(container)
container.append(headerContent)
headerContent.append(title, headerSpan)

//main

let main = document.createElement('div')
main.classList.add('main')

let mainContainer = document.createElement('div')
mainContainer.classList.add('main-container')

let mainContent = document.createElement('div')
mainContent.classList.add('main-content')


let inpTask = document.createElement('input')
inpTask.type = 'text'
inpTask.placeholder = 'Введите дело'
inpTask.classList.add('inp-task')


let addTaskBtn = document.createElement('button')
addTaskBtn.textContent = 'Добавить дело'
addTaskBtn.classList.add('task-btn', 'btn-reset')


let list = document.createElement('ul')
list.classList.add('list-reset', 'list')



document.body.append(main)
main.append(mainContainer)
mainContainer.append(mainContent)
mainContent.append(inpTask, addTaskBtn)
mainContainer.append(list)

// переменные
let data = localStorage.getItem('ListArray')
let counter = 0
let ListArray = [];

if (data !== '' && data !== null) {
  ListArray = JSON.parse(data)
}

for (const msg of ListArray) {

  addTask(msg)
}

// Создаем id
function getNewID(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) max = item.id
  }
  return max + 1;
}

// Добавление дела
function addTask(obj) {
  counter++

  let listItem = document.createElement('li')
  listItem.classList.add('list-item')

  let listItemContent = document.createElement('div')
  listItemContent.classList.add('list-item-content')

  let numberTask = document.createElement('span')
  numberTask.classList.add('number-task')
  numberTask.textContent = `Дело № ${counter}: `


  let taskSpan = document.createElement('span')
  taskSpan.classList.add('task-span')
  taskSpan.textContent = obj.task

  let doneBtn = document.createElement('button')
  doneBtn.classList.add('btn-reset', 'done-btn')
  doneBtn.textContent = 'Готово'

  let deleteBtn = document.createElement('button')
  deleteBtn.classList.add('btn-reset', 'delete-btn')
  deleteBtn.textContent = 'Удалить'


  // кнопка готово
  if (obj.done === true) listItemContent.classList.add('list-item-content-done')

  doneBtn.onclick = function () {
    listItemContent.classList.toggle('list-item-content-done')

    for (const listItem of ListArray) {
      if (listItem.id == obj.id) listItem.done = !listItem.done
    }

    localStorage.setItem('ListArray', JSON.stringify(ListArray))
  }

  // кнопка удаления
  deleteBtn.onclick = function () {

    if (confirm('Хотите удалить дело?') === true) {
      listItem.remove()

      for (let i = 0; i < ListArray.length; i++) {
        if (ListArray[i].id == obj.id) ListArray.splice(i, 1)
      }

      localStorage.setItem('ListArray', JSON.stringify(ListArray))
    }
  }



  list.append(listItem)
  listItem.append(listItemContent)
  listItemContent.append(numberTask, taskSpan, doneBtn, deleteBtn)

  return list

}

// добавление дела


addTaskBtn.onclick = function () {



  let taskObj = {
    id: getNewID(ListArray),
    task: inpTask.value,
    done: false
  }

  ListArray.push(taskObj)

  localStorage.setItem('ListArray', JSON.stringify(ListArray))

  addTask(taskObj)
  inpTask.value = ''

}


// Неактивная кнопка
addTaskBtn.disabled = true

inpTask.addEventListener('input', function () {
  if (inpTask.value !== '') {
    addTaskBtn.disabled = false
  } else {
    addTaskBtn.disabled = true
  }
})












