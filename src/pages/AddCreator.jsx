// src/pages/AddCreator.jsx
//
// Provides a form for creating a new content creator.  When the form is
// submitted the data is sent to Supabase.  On success we redirect
// back to the home page.  The component uses controlled inputs to
// manage form state.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';

export default function AddCreator() {
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    image_url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("creators").insert([form]);

    setSubmitting(false);

    if (error) {
      console.error("Error adding creator:", error.message);
      alert("There was a problem adding the creator.");
      return;
    }

    // go back to home page
    navigate("/");
  };

  return (
    <main className="container">
      <h1>Add a New Creator</h1>
      <p>Fill out the form below to add a creator to your Creatorverse.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "520px", display: "grid", gap: "1rem" }}
      >
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Marques Brownlee"
            required
          />
        </label>

        <label>
          URL
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://youtube.com/@..."
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Why is this creator worth following?"
            required
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://example.com/thumbnail.jpg"
          />
        </label>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Add Creator"}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}