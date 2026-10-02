##Blog Project##

A simple Blog Management System built using React JS, CSS,
and JSON Server.

##Features

Add a new blog

Display all blogs

Edit existing blogs

Delete blogs

Blog image using image URL

Blog category and date

Responsive design for desktop, tablet, and mobile

Data stored using JSON Server REST API

##Technologies Used

React JS

JavaScript

CSS

JSON Server

Vite

React Hooks 

##Project Structure

blog-project/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── db.json
├── index.html
├── package.json
└── README.md

##How to Run the Project

1. Install dependencies

npm install

2. Start JSON Server

Open a terminal and run:

npx json-server --watch db.json --port 3000

The API will run at:

http://localhost:3000/students

3. Start React

Open another terminal and run:

npm run dev

Then open the Vite URL shown in the terminal, usually:

http://localhost:5173/

#API

The project uses the following API endpoint:

http://localhost:3000/students

The students collection stores:

id

no

title

img

category

date

##How It Works

#Add Blog

Enter the blog number, title, image URL, category, and date. Click Add
Blog to save the blog to JSON Server.

#Edit Blog

Click the Edit button on any blog. The existing data will appear in
the form. Make changes and click Update Blog.

#Delete Blog

Click the Delete button to remove a blog from JSON Server.

Make sure JSON Server is running on port 3000 before using Add,
Edit, or Delete operations.