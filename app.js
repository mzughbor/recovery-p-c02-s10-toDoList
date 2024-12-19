const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
// getting the local storage
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  list.innerHTML = savedTodos;
}

const search = document.querySelector(".search input");

const generate = (toDo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${toDo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`;

  list.innerHTML += html;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const toDo = addForm.add.value.trim();
  if (toDo.length) {
    generate(toDo);
    addForm.reset();
  }
  // adding to local storage
  localStorage.setItem("todos", list.innerHTML);
});

// deleting the list items
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    // removing from local storage
    localStorage.setItem("todos", list.innerHTML);
  }
});

const filterTodos = (term) => {
  // FOR ADDING FILTER CLASS
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));
  // FOR REMOVING FILTER CLASS AFTER DELETING LETTER ...
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
