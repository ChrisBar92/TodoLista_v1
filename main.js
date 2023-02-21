let todoInput //miejsce, gdzie uzytkownik wpisuje tresc zadania
let errorInfo // info o braku zadan / koniecznosci wpisania tekstu
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let ulList // lista zadan, tagi UL

let popup // popup
let popupInfo // tekst w popupie, jak się doda pusty tekst
let todoToEdit // edytowany Todo
let popupInput // input w popupie
let popupAddBtn // przycisk 'zatwierdz' w popupie
let popupCloseBtn // przycisk 'anuluj' w popupie

const main = () => {
	prepaerDOMElements()
	prepareDOMEvents()
}

const prepaerDOMElements = () => {
	//pobieram wszystkie elementy
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	//nadaje nasluchiwanie
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', chceckClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)

		createToolsArea(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania'
	}
}

// wytlumaczenie uzycia newTask poniżej
// w funkcji add podstawiamy 3 i 5 i do zmiennej score przypisujemy 8.
// następnie wywołujemy funkcję schowscore z parametrem 8, która wylogowuje nam "Wynik to 8"
/*

const add = (x,y) => {
    const score = x + y

    showScore(score)
}

const showScore(score2) => {
    console.log(`Wynik to ${score2})
}

add(3,5)

*/

const createToolsArea = newTask => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTask.append(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const chceckClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editToDo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editToDo = e => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent

	console.log(todoToEdit.firstChild)
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podac jakas tresc'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()
	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadan na liscie'
	}
}

const enterKeyCheck = (e) => {
  if(e.key === 'Enter') {
   addNewTodo()
  }
}



document.addEventListener('DOMContentLoaded', main)
