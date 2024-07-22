const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
const addFileInputs = document.querySelectorAll(".add-item-file");

const listColumns = document.querySelectorAll(".drag-item-list");
const backlogListEl = document.getElementById("backlog-list");
const progressListEl = document.getElementById("progress-list");
const completeListEl = document.getElementById("complete-list");

let updatedOnLoad = false;

let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let listArrays = [];

let draggedItem;
let dragging = false;
let currentColumn;

function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
  } else {
    backlogListArray = [
      "Завершить план по разработке нового продукта",
      "Подготовить отчет для маркетинга",
    ];
    progressListArray = [
      "Разработка новой функции сайта",
      "Проработка нового дизайна упаковки",
    ];
    completeListArray = [
      "Завершен проект по redesign вебсайта",
      "Успешно прошел экзамен по программированию",
    ];
  }
}

function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray];
  const arrayNames = ["backlog", "progress", "complete"];
  arrayNames.forEach((arrayName, index) => {
    try {
      localStorage.setItem(
        `${arrayName}Items`,
        JSON.stringify(listArrays[index])
      );
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        alert("Local storage quota exceeded. Unable to save more items.");
      }
    }
  });
}

function filterArray(array) {
  return array.filter((item) => item !== null && item.trim() !== "");
}

function createItemEl(columnEl, column, item, index) {
  const listEl = document.createElement("li");
  listEl.id = index;
  listEl.classList.add("drag-item");
  listEl.draggable = true;
  listEl.addEventListener("dragstart", (event) => drag(event));

  if (item.startsWith("data:image")) {
    const imgEl = document.createElement("img");
    imgEl.src = item;
    listEl.appendChild(imgEl);
  } else {
    listEl.textContent = item;
    listEl.contentEditable = true;
    listEl.addEventListener("focusout", () => updateItem(index, column));
  }

  columnEl.appendChild(listEl);
}

function updateDOM() {
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  backlogListEl.innerHTML = "";
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogListEl, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray);

  progressListEl.innerHTML = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressListEl, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);

  completeListEl.innerHTML = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeListEl, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);

  updatedOnLoad = true;
  updateSavedColumns();
}

function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    if (
      !selectedColumn[id].textContent.trim() &&
      !selectedColumn[id].querySelector("img")
    ) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumn[id].querySelector("img")
        ? selectedColumn[id].querySelector("img").src
        : selectedColumn[id].textContent.trim();
    }
    updateDOM();
  }
}

function deleteItem(id, column) {
  const selectedArray = listArrays[column];
  selectedArray.splice(id, 1);
  updateDOM();
}

function addToColumn(column) {
  const itemText = addItems[column].textContent.trim();
  const fileInput = addFileInputs[column];
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgData = e.target.result;
      const selectedArray = listArrays[column];
      selectedArray.push(imgData);
      addItems[column].textContent = "";
      fileInput.value = "";
      updateDOM();
    };
    reader.readAsDataURL(file);
  } else if (itemText) {
    const selectedArray = listArrays[column];
    selectedArray.push(itemText);
    addItems[column].textContent = "";
    fileInput.value = "";
    updateDOM();
  }
}

function showInputBox(column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
}

function hideInputBox(column) {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addToColumn(column);
}

function rebuildArrays() {
  backlogListArray = Array.from(backlogListEl.children).map((child) =>
    child.querySelector("img")
      ? child.querySelector("img").src
      : child.textContent.trim()
  );
  progressListArray = Array.from(progressListEl.children).map((child) =>
    child.querySelector("img")
      ? child.querySelector("img").src
      : child.textContent.trim()
  );
  completeListArray = Array.from(completeListEl.children).map((child) =>
    child.querySelector("img")
      ? child.querySelector("img").src
      : child.textContent.trim()
  );
  updateDOM();
}

function dragEnter(column) {
  listColumns[column].classList.add("over");
  currentColumn = column;
}

function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const parent = listColumns[currentColumn];
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });
  parent.appendChild(draggedItem);
  dragging = false;
  rebuildArrays();
}

listColumns.forEach((listColumn, i) => {
  listColumn.addEventListener("drop", (e) => drop(e));
  listColumn.addEventListener("dragover", (e) => allowDrop(e));
  listColumn.addEventListener("dragenter", () => dragEnter(i));
});

addBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => showInputBox(i));
});

saveItemBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => hideInputBox(i));
});

updateDOM();
