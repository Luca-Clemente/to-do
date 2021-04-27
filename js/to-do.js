/*
HTML
<body>
    <header>
        <h1>Luca's to-do list </h1>
    </header>
    
    <form>
        <input type="text" class="todo-input" />
        <button class="todo-button" type="submit">
          <i class="fas fa-plus-square"></i>
        </button>
        <div class="select">
          <select name="todos" class="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div class="todo-container">
        <ul class="todo-list"></ul>
      </div>
    <script src="/js/to-do.js"></script>

*/




//Selecionando os itens do HTML.
const todoInput = document.querySelector('.todo-input'); //  Selecionando o input.
const todoButton = document.querySelector('.todo-button'); // Selecionando o button.
const todoList = document.querySelector('.todo-list'); // Selecionando a ul.
const filterOption = document.querySelector('.filter-todo'); // Selecionando o select.

//Eventos
document.addEventListener('DOMContentLoaded',  getTodos);
todoButton.addEventListener('click', addTodo); // Ao clicar no button, a função addTodo será executada.
todoList.addEventListener('click',deleteTodo); // Ao clicar na ul, a função deleteTodo será executada.
filterOption.addEventListener('click', filterTodo); // Ao clicar no select a função filterTodo será executada.

//FUNCTIONS
function addTodo (e){
    e.preventDefault(); // previne o comportamento default do objeto.
    const todoDiv = document.createElement('div'); // Criando uma variável de nome todoDiv que criará uma div.
    todoDiv.classList.add('todo');  // Adicionando a classe 'todo' à essa div.
    const newTodo = document.createElement('li'); // Criando uma variável de nome newTodo que criará um li.
    newTodo.innerText = todoInput.value; // O resultado desse newTodo será o value do input (o que será escrito no input).
    saveLocalTodos(todoInput.value);
    newTodo.classList.add ('todo-item'); // Essa li terá a classe 'todo-item';
    todoDiv.appendChild(newTodo); // Inserindo a li na div.
    todoInput.value = ''; //Após escrever no input ele ficará vazio.

    const completedButton = document.createElement('button'); // Criando uma variável de nome completedButton que criará um button.
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // O innerHTML desse button será um ícone de +.
    completedButton.classList.add('complete-btn'); // Adicionando a classe complete-btn ao button.
    todoDiv.appendChild(completedButton); //Adicionando o button dentro da div 'todo'.


    const trashButton = document.createElement('button'); // Criando uma variável de nome trashButton que criará um button.
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // O innerHTML desse button será um ícone de lixeira.
    trashButton.classList.add('trash-btn'); // Adicionando a classe trash-btn ao button.
    todoDiv.appendChild(trashButton); // Adicionando o button dentro da div 'todo'.
    todoList.appendChild(todoDiv); // Inserindo a div 'todo' que possui uma li de classe 'todo-item', um button de classe 'complete-btn' e um button de classe 'trash-btn' dentro da ul de classe 'todo-list'.
}
function deleteTodo (e){
    const item = e.target; // Diz onde está ocorrendo o evento de clique. Exemplo - se eu clicar no todoInput vai aparecer que é o input.
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall'); 
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', e => {
            todo.remove();
        })
    }
    /*
    Criando um laço condicional que diz:
    Se item (ou seja, aquilo que eu estou clicando) na posição 0 (ou seja, primeira posição) conter uma classe de nome 'trash btn' então - uma variável de nome 'todo' terá  valor = elemento pai do item (ou seja, a div de classe 'todo') . Será adicionado uma classe de 'fall' a div que já tem a classe 'todo'. Enfim, adicionando um evento de nome transitionend que após a transição acabar executará a função anônima que removerá o todo.  
     */
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle ('completed');
        console.log('todo');
    }
    /*
    Criando um laço condicional que diz:
    Se item(ou seja, aquilo que eu estou clicando) na posição 0 (ou seja, primeira posição) conter uma classe de 'complete-btn' o elemento pai desse elemento (ou seja, a div de classe 'todo') terá uma classe de nome 'completed' adicionada.
     */
    
}
function filterTodo (e){
    const todos = todoList.childNodes; // Uma variável de nome todos que tem como valor os filhos da ul.
    todos.forEach(function(todo)  {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;


        }
    });
    /*
    Ao clicar no select essa função será executada:
    Uma variável de nome todos tem o valor = os filhos da ul.
    forEach para percorrer os filhos da ul
    Switch pegará o value de onde está sendo clicado, caso seja  no all - estilizará com display:flex. Caso seja completed e se a div 'todo' conter a classe 'completed' então estilizará com display:flex, se não, estilizará com display:none. Caso seja uncompleted e se a div 'todo' não conter a classe 'completed' então estilizará com display: flex, se não, estilizará com display:none; 
    */
}
function saveLocalTodos (todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }