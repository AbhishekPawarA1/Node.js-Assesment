// File: app.js
import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

const TASKS_FILE = 'tasks.json';

// Rest of your code remains the same


// Helper: Load tasks
function loadTasks() {
  if (fs.existsSync(TASKS_FILE)) {
    return JSON.parse(fs.readFileSync(TASKS_FILE, "utf8"));
  }
  return [];
}

// Helper: Save tasks
function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Update task
function updateTask(idOrTitle, newTitle, newDueDate) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === idOrTitle || t.title === idOrTitle);

  if (!task) {
    console.log(chalk.red("Task not found!"));
    return;
  }

  if (newTitle) task.title = newTitle;
  if (newDueDate) task.dueDate = newDueDate;

  saveTasks(tasks);
  console.log(chalk.green("Task updated successfully!"));
}

// Delete task
function deleteTask(idOrTitle) {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(
    (t) => t.id !== idOrTitle && t.title !== idOrTitle
  );

  if (tasks.length === updatedTasks.length) {
    console.log(chalk.red("Task not found!"));
    return;
  }

  saveTasks(updatedTasks);
  console.log(chalk.green("Task deleted successfully!"));
}

// Search tasks
function searchTasks(query) {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(
    (t) => t.title.includes(query) || t.dueDate.includes(query)
  );

  if (filteredTasks.length === 0) {
    console.log(chalk.yellow("No matching tasks found."));
  } else {
    console.log(chalk.blue("Matching tasks:"));
    console.table(filteredTasks);
  }
}

// Main CLI menu
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Update Task", "Delete Task", "Search Tasks", "Help", "Exit"],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "Update Task":
          promptUpdateTask();
          break;
        case "Delete Task":
          promptDeleteTask();
          break;
        case "Search Tasks":
          promptSearchTasks();
          break;
        case "Help":
          displayHelp();
          break;
        case "Exit":
          console.log(chalk.green("Goodbye!"));
          process.exit();
      }
    });
}

// Prompt for updating a task
function promptUpdateTask() {
  inquirer
    .prompt([
      { type: "input", name: "idOrTitle", message: "Enter task ID or title:" },
      {
        type: "input",
        name: "newTitle",
        message: "Enter new title (leave blank to skip):",
      },
      {
        type: "input",
        name: "newDueDate",
        message: "Enter new due date (leave blank to skip):",
      },
    ])
    .then((answers) => {
      updateTask(answers.idOrTitle, answers.newTitle, answers.newDueDate);
      mainMenu();
    });
}

// Prompt for deleting a task
function promptDeleteTask() {
  inquirer
    .prompt([
      { type: "input", name: "idOrTitle", message: "Enter task ID or title:" },
    ])
    .then((answers) => {
      deleteTask(answers.idOrTitle);
      mainMenu();
    });
}

// Prompt for searching tasks
function promptSearchTasks() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "query",
        message: "Enter search query (title or due date):",
      },
    ])
    .then((answers) => {
      searchTasks(answers.query);
      mainMenu();
    });
}

// Display help
function displayHelp() {
  console.log(
    chalk.blue(`
Available Commands:
- Update Task: Modify a task's title or due date.
- Delete Task: Remove a task from the list.
- Search Tasks: Search tasks by title or due date.
- Help: Show this help message.
- Exit: Exit the application.
`)
  );
  mainMenu();
}

// Start the app
mainMenu();
