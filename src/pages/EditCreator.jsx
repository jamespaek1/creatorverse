// src/pages/EditCreator.jsx
//
// Allows editing and deleting of an existing content creator.  The
// `id` parameter is used to fetch the current record.  The form
// behaves similarly to AddCreator but updates the record on submit.  A
// separate delete button removes the record from the database and
// navigates back to the home page.

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client.js';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load the existing creator
  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading creator:", error.message);
      } else if (data) {
        setForm({
          name: data.name ?? "",
          url: data.url ?? "",
          description: data.description ?? "",
          image_url: data.image_url ?? "",
        });
      }
      setLoading(false);
    }

    fetchCreator();
  }, [id]);

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

    const { error } = await supabase
      .from("creators")
      .update(form)
      .eq("id", id);

    setSubmitting(false);

    if (error) {
      console.error("Error updating creator:", error.message);
      alert("There was a problem updating the creator.");
      return;
    }

    // go back to detail page
    navigate(`/creators/${id}`);
  };

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this creator?");
    if (!ok) return;

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error.message);
      alert("There was a problem deleting the creator.");
      return;
    }

    navigate("/");
  };

  if (loading) {
    return (
      <main className="container">
        <p>Loading creator...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Edit Creator</h1>
      <p>Update the creator’s details below.</p>

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

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="contrast"
            onClick={handleDelete}
            style={{ background: "var(--pico-color-red)" }}
          >
            Delete Creator
          </button>
          <Link to={`/creators/${id}`} className="secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}