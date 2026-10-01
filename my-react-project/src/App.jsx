import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API = "http://localhost:3000/students";

  const [userData, setUserData] = useState([]);

  const [no, setNo] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [id, setId] = useState(null);
  const [isAdd, setIsAdd] = useState(true);

  const getData = () => {
    fetch(API).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get data");
        }

        return res.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("GET ERROR:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const clearForm = () => {
    setNo("");
    setTitle("");
    setImg("");
    setCategory("");
    setDate("");
    setId(null);
    setIsAdd(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      no: Number(no),
      title: title,
      img: img,
      category: category,
      date: date
    };

    try {
      const url = isAdd ? API : `${API}/${id}`;
      const method = isAdd ? "POST" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
      });

      if (!response.ok) {
        throw new Error("Blog could not be saved");
      }

      await response.json();

      alert(isAdd ? "Blog Added Successfully!" : "Blog Updated Successfully!");

      clearForm();
      getData();

    } catch (error) {
      console.log("SAVE ERROR:", error);
      alert("Blog add nahi hua. Check karo json-server running hai ya nahi.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      alert("Blog Deleted Successfully!");

      getData();

    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  const handleEdit = (element) => {
    setId(element.id);
    setNo(element.no);
    setTitle(element.title);
    setImg(element.img);
    setCategory(element.category);
    setDate(element.date);

    setIsAdd(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
  <div className="container py-4">
    <h1 className="main-heading text-center mb-4">Blog Project</h1>

    <div className="row g-4">
      {/* Form */}
      <div className="col-lg-4 col-xl-3">
        <div className="card form-box">
          <div className="card-body">
            <h2 className="h5 mb-3">{isAdd ? "Add New Blog" : "Edit Blog"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="No."
                value={no}
                onChange={(e) => setNo(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Image URL"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              <input
                type="date"
                className="form-control mb-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button type="submit" className="btn btn-primary w-100">
                {isAdd ? "Add Blog" : "Update Blog"}
              </button>

              {!isAdd && (
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="col-lg-8 col-xl-9">
        <div className="row g-3">
          {userData.map((element) => (
            <div className="col-md-6" key={element.id}>
              <div className="card student-card h-100">
                <div className="card-body d-flex flex-column">
                  <span className="badge number-badge align-self-start mb-2">
                    No. {element.no}
                  </span>

                  <h2 className="blog-title h5">{element.title}</h2>

                  <div className="image-box mb-3">
                    <img src={element.img} alt={element.title} />
                  </div>

                  <p className="mb-1 small text-secondary">
                    Category: <span className="text-light">{element.category}</span>
                  </p>
                  <p className="small text-secondary">
                    Date: <span className="text-light">{element.date}</span>
                  </p>

                  <div className="d-flex gap-2 mt-auto pt-3 border-top">
                    <button
                      className="btn btn-outline-danger btn-sm w-50"
                      onClick={() => handleDelete(element.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm w-50"
                      onClick={() => handleEdit(element)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default App;