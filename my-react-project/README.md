# Blog Project

A simple blog manager built with **React** and **Bootstrap**, using **json-server** as a mock REST API. You can add, edit and delete blog entries, and each one is shown as a card with its number, title, image, category and date. The UI uses a flat dark theme.

## Features

- Add a new blog with number, title, image URL, category and date
- Edit an existing blog (the form fills in automatically, with a Cancel option)
- Delete a blog
- Blog cards in a responsive grid (form on the left, cards on the right)
- Flat dark theme with no gradients or glowing buttons
- Full CRUD against a REST API (`GET`, `POST`, `PUT`, `DELETE`)

## Tech Stack

- React (Hooks: `useState`, `useEffect`)
- Bootstrap 5 + custom CSS
- json-server (mock backend)
- Fetch API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mahidesai2119/blog_project.git

# 2. Go into the React app
cd blog_project/my-react-project

# 3. Install dependencies
npm install
```

### Set up the mock API

Create a `db.json` file in the project folder:

```json
{
  "students": [
    {
      "id": "1",
      "no": 1,
      "title": "My First Blog",
      "img": "https://picsum.photos/400/300",
      "category": "Technology",
      "date": "2026-09-01"
    }
  ]
}
```

> The endpoint is named `students` because that is what `App.jsx` calls. If you rename it, update the `API` constant in `App.jsx` too.

### Run the project

You need two terminals.

**Terminal 1: start the API (port 3000)**

```bash
npx json-server db.json --port 3000
```

**Terminal 2: start the React app**

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## API Endpoints

Base URL: `http://localhost:3000/students`

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/students`     | Get all blogs       |
| POST   | `/students`     | Add a new blog      |
| PUT    | `/students/:id` | Update a blog       |
| DELETE | `/students/:id` | Delete a blog       |

## Blog Object

```json
{
  "no": 1,
  "title": "Blog title",
  "img": "https://example.com/image.jpg",
  "category": "Technology",
  "date": "2026-09-01"
}
```

## Project Structure

```
blog_project/
└── my-react-project/
    ├── src/
    │   ├── App.jsx      # Component with all CRUD logic and UI
    │   ├── App.css      # Dark theme styles
    │   └── main.jsx     # Entry point (imports Bootstrap)
    ├── db.json          # Mock database for json-server
    └── package.json
```

## Troubleshooting

- **"Blog add nahi hua" alert or an empty list:** json-server is probably not running. Start it with `npx json-server db.json --port 3000`.
- **Styles look unstyled:** make sure `import "bootstrap/dist/css/bootstrap.min.css";` is in `main.jsx` before your own CSS.

## Future Improvements

- Search and filter by category
- Form validation messages instead of `alert()`
- Pagination
- Replace json-server with a real backend

## Author

**Mahi Desai**
- GitHub: [@mahidesai2119](https://github.com/mahidesai2119)
- LinkedIn: [Mahi Desai](https://www.linkedin.com/in/mahi-desai-2b69393a7)