import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const handleKeyUp = (e) => {
    const isValid = (form) => true;
    if (isValid(form)) {
      setDisabled(false);
    }
  };

  return (
    <form action="" method="get">
      <ul>
        <li>
          <label>
            First Name:{" "}
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
          </label>
        </li>
        <li>
          <label>
            Email:{" "}
            <input
              type="text"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
          </label>
        </li>
        <li>
          <input disabled={disabled} type="submit" />
        </li>
      </ul>
    </form>
  );
}

export default App;
