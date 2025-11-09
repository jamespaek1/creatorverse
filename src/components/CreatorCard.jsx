// src/components/CreatorCard.jsx
//
// A reusable component that displays a single content creator.  Cards
// summarize the creator's information and provide actions to edit or
// delete the record.  The optional `onDelete` callback allows the
// parent component to handle removals without tightly coupling UI and
// data logic.

import { Link } from 'react-router-dom';

export default function CreatorCard({ creator, onDelete }) {
  return (
    <article
      style={{
        border: "1px solid var(--pico-border-color)",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        background: "var(--pico-background-color)",
      }}
    >
      {creator.image_url && (
        <img
          src={creator.image_url}
          alt={creator.name}
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "1rem",
            objectFit: "cover",
            aspectRatio: "16/9",
          }}
        />
      )}

      <h3>
        <Link to={`/creators/${creator.id}`}>{creator.name}</Link>
      </h3>
      <p>{creator.description}</p>

      <footer style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className="secondary"
        >
          Visit Page
        </a>
        <Link to={`/creators/${creator.id}/edit`} role="button">
          Edit
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(creator.id)}
            className="contrast"
            style={{ background: "var(--pico-color-red)" }}
          >
            Delete
          </button>
        )}
      </footer>
    </article>
  );
}