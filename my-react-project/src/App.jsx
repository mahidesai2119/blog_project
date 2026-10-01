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
    <>
      <h1 className="main-heading">Blog Project</h1>

      <div className="main-box">

        <div className="left-box">
          <div className="form-box">

            <h2>
              {isAdd ? "Add New Blog" : "Edit Blog"}
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="number"
                placeholder="No."
                value={no}
                onChange={(e) => setNo(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Image URL"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button
                type="submit"
                className="submit-btn"
              >
                {isAdd ? "Add Blog" : "Update Blog"}
              </button>

              {!isAdd && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}

            </form>

          </div>
        </div>

        {/* Blog Cards */}
        <div className="right-box">

          {userData.map((element) => (

            <div
              className="student-card"
              key={element.id}
            >

              <div className="number-box">
                No. {element.no}
              </div>

              <h2 className="blog-title">
                {element.title}
              </h2>

              <div className="image-box">
                <img
                  src={element.img}
                  alt={element.title}
                />
              </div>

              <div className="category-box">
                Category: {element.category}
              </div>

              <div className="date-box">
                Date: {element.date}
              </div>

              <div className="buttons">

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(element.id)}
                >
                  Delete
                </button>

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(element)}
                >
                  Edit
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default App;