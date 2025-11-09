// src/pages/HomePage.jsx
//
// Displays a list of all content creators.  On mount the page
// asynchronously fetches the current list of creators from Supabase and
// renders a card for each one.  Users can navigate to create a new
// record or edit/delete existing ones from this view.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client.js";
import CreatorCard from "../components/CreatorCard.jsx";

export default function HomePage() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all creators when the component mounts.  The Supabase JS
  // client returns an object with `data` and `error` properties.  On
  // success we update the component state; on error we log the issue.
 useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching creators:", error.message);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    }

    fetchCreators();
  }, []);

  // Delete a creator and update the local list without reloading the page.
   const handleDelete = async (id) => {
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      console.error("Error deleting creator:", error.message);
    } else {
      setCreators((prev) => prev.filter((creator) => creator.id !== id));
    }
  };

  return (
    <main className="container">
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>💫 Creatorverse</h1>
        <p>Share and manage your favourite content creators.</p>
        <Link to="/new" role="button" className="contrast">
          ➕ Add New Creator
        </Link>
      </header>

      {loading ? (
        <p>Loading creators...</p>
      ) : creators.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No creators found. Use the button above to add one!
        </p>
      ) : (
        <section
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </main>
  );
}