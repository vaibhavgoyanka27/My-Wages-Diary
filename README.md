**Overview**:
This is a simple To-Do List application where users can create multiple lists, add or delete entries, and manage their tasks efficiently. Each list is uniquely identified by its URL, and all data is saved in a MongoDB database. The application is built using JavaScript, EJS templates, HTML, and CSS.

**Features**:
Create Lists: Users can create multiple to-do lists with different names by changing the URL.
Add Entries: Add tasks to any list.
Delete Entries: Remove tasks from any list.
Persistent Storage: All data is saved in a MongoDB database, ensuring that lists and tasks are preserved between sessions.

**Prerequisites**:
Node.js
npm (Node Package Manager)
MongoDB

**Installation**:
Clone the repository:
git clone https://github.com/yourusername/todo-list-app.git
cd todo-list-app

**Install the dependencies:**
npm install

Set up MongoDB:
Ensure MongoDB is installed and running on your local machine or a remote server.
Create a .env file in the root directory and add your MongoDB URI:

**Start the application:**
nodemon app.js
Open your browser and navigate to http://localhost:3000 to view the app
