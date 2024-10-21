const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length; // Selects all elements in the "completed" class and ".length" counts the number of elements in the class
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length; // Selects all <li> elements that do not have the "completed" class and ".length" property counts the number of uncompleted tasks

    completedCounter.textContent = completedTasks; // Updates "completedCounter" and "uncompletedCounter" elements in the .html doc
    uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Input a task"); // Ensures user fills out the input box instead of making an empty 
        console.log("No task added.")
        return;
    }
    const li = document.createElement("li")
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
        `;
    listContainer.appendChild(li);
    inputBox.value = ""; // Sets the value of the input box to an empty string after adding a task

    const checkBox = li.querySelector('input')
    const editButton = li.querySelector('.edit-btn')
    const taskSpan = li.querySelector('span')
    const deletButton = li.querySelector('.delete-btn')

    checkBox.addEventListener("click", function() {
        li.classList.toggle("completed", checkBox.checked); // classList.toggle() adds a "completed" class to the list item "li"
        updateCounters();
    }); // When the checkbox is checked, checkBox.checked is now "True" and the "completed" class is removed if the checkbox is unchecked ("False")

    editButton.addEventListener("click", function() {
        const update = prompt("Edit task:", taskSpan.textContent); // Prompt funct displays dialog box asking user for a new task. The default value is set to the current content of "taskSpan"
        if (update !== null) { // Checks if user has provided input
            taskSpan.textContent = update; // If new input is provided, the "textContent" of the "taskSpan" is updated to display the content of the new input
            li.classList.remove("completed") // If a task is edited after being marked complete then it will remove the styling of "completed" and uncheck the task
            checkBox.checked = false;
            updateCounters();
        }
    });
    deletButton.addEventListener("click", function() {
        if (confirm("Delete task?")) {
            li.remove();
            updateCounters();
        }
    });
    updateCounters();
}
inputBox.addEventListener("keyup", function (event) {
    if (event === "Enter") {
        addTask();
    }
});