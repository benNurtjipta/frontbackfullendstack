import { useState } from "react";
import { useNavigate } from "react-router";

const NewToDo = ({ currentUser, setUserTodos }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    uID: currentUser.userID,
    text: "",
    state: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5500/addtodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const message = await res.json();
    alert(message.message);
    setUserTodos((prev) => [...prev, formData]);

    navigate("/dashboard");
  };

  return (
    <section>
      <form className="new-todo" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <textarea
            rows="5"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </section>
  );
};
export default NewToDo;
