const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];
let taskIdCounter = 1;


function addTask() {
  rl.question("Enter task title: ", (title) => {
    if (!title.trim()) {
      console.log("Error: Task title cannot be empty.");
      return mainMenu();
    }

    rl.question("Enter due date (YYYY-MM-DD): ", (dueDate) => {
      if (!dueDate.trim()) {
        console.log("Error: Due date cannot be empty.");
        return mainMenu();
      }

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dueDate)) {
        console.log("Error: Invalid date format. Use YYYY-MM-DD.");
        return mainMenu();
      }

      tasks.push({
        id: taskIdCounter++,
        title: title.trim(),
        dueDate: dueDate.trim(),
        status: "pending",
      });
      console.log(`Task added successfully!`);
      mainMenu();
    });
  });
}

function listTasks() {
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("\nTasks:");
    console.log("-".repeat(40));
    tasks.forEach((task) => {
      console.log(
        `ID: ${task.id}, Title: ${task.title}, Due Date: ${task.dueDate}, Status: ${task.status}`
      );
    });
    console.log("-".repeat(40));
  }
  mainMenu();
}

function completeTask() {
  rl.question("Enter Task ID or Title to mark as completed: ", (input) => {
    const task = tasks.find(
      (t) => t.id.toString() === input.trim() || t.title === input.trim()
    );
    if (!task) {
      console.log("Error: Task not found.");
    } else if (task.status === "completed") {
      console.log("Task is already completed.");
    } else {
      task.status = "completed";
      console.log(`Task '${task.title}' marked as completed!`);
    }
    mainMenu();
  });
}


function mainMenu() {
  console.log("\nCommands: add-task, list-tasks, complete-task, exit");
  rl.question("Enter a command: ", (command) => {
    switch (command.trim().toLowerCase()) {
      case "add-task":
        addTask();
        break;
      case "list-tasks":
        listTasks();
        break;
      case "complete-task":
        completeTask();
        break;
      case "exit":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid command. Please try again.");
        mainMenu();
    }
  });
}

console.log("Welcome to Task Manager!");
mainMenu();
