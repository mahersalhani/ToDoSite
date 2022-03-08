const text = document.querySelector("input[type='text']");
const submit = document.querySelector("input[type='submit']");
const tasks = document.querySelector(".tasks");

////

let arrayOfTasxs = [];

//chack if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasxs = JSON.parse(localStorage.getItem("tasks"));
}

//delete all
let deleteAll = document.querySelector(".empty");

deleteAll.onclick = () => {
  tasks.innerHTML = "";
  arrayOfTasxs = [];
  addDataToLocalStorage(arrayOfTasxs);
  window.localStorage.clear();
};

//تشغيل الفانكشيون
getDataFromLocalStorage();

submit.onclick = () => {
  if (text.value !== "") {
    //add tasxs
    addTasxsToArray(text.value);
    //empty
    text.value = "";
    //add tassk to page
    addElementToPage(arrayOfTasxs);
    //add tasks to local storage
    addDataToLocalStorage(arrayOfTasxs);
    //for tast
    //      console.log(arrayOfTasxs);
    //      console.log(JSON.stringify(arrayOfTasxs));
  }
};

////////
tasks.addEventListener("click", (e) => {
  //delete button
  if (e.target.className === "delete") {
    //remove frome page
    e.target.parentElement.remove();
    //remove from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTasxsToArray(x) {
  const task = {
    id: Date.now(),
    title: x,
    completed: false,
  };
  //push tasks to array
  arrayOfTasxs.push(task);
}

function addElementToPage(x) {
  //empty the tasks
  tasks.innerHTML = "";
  //looping on array
  x.forEach((el) => {
    //creat main div
    let div = document.createElement("div");
    div.className = "task";
    //chack if task is done
    if (el.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", el.id);
    div.appendChild(document.createTextNode(el.title));
    //creat delet span
    let deleteSpan = document.createElement("span");
    deleteSpan.className = "delete";
    deleteSpan.innerHTML = "delete";
    //append delete span
    div.appendChild(deleteSpan);
    //add tasks div to main container
    tasks.appendChild(div);
  });
}

function addDataToLocalStorage(x) {
  window.localStorage.setItem("tasks", JSON.stringify(x));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    addElementToPage(tasks);
  }
}

function deleteTaskWith(taskID) {
  //للشرح
  // for (i = 0; i < arrayOfTasxs.length; i++) {
  //   console.log(`${arrayOfTasxs[i].id} === ${taskID}`);
  // }
  arrayOfTasxs = arrayOfTasxs.filter((task) => task.id != taskID);
  addDataToLocalStorage(arrayOfTasxs);
}

function toggleStatusTaskWith(x) {
  for (i = 0; i < arrayOfTasxs.length; i++) {
    if (arrayOfTasxs[i].id == x) {
      arrayOfTasxs[i].completed == false
        ? (arrayOfTasxs[i].completed = true)
        : (arrayOfTasxs[i].completed = false);
      console.log(5);
    }
  }
  addDataToLocalStorage(arrayOfTasxs);
}
