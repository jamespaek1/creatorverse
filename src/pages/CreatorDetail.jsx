// src/pages/CreatorDetail.jsx
//
// Displays the details for a single content creator.  The `id` is
// pulled from the route parameters.  When the component mounts or the
// `id` changes, it fetches the creator from Supabase.  A link is
// provided to edit the current creator or return to the home page.

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client.js';

export default function CreatorDetail() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching creator:', error.message);
      } else {
        setCreator(data);
      }
      setLoading(false);
    }
    fetchCreator();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!creator) {
    return (
      <div>
        <p>Creator not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <main>
      <h1>{creator.name}</h1>
      {creator.image_url && (
        <img
          src={creator.image_url}
          alt={creator.name}
          style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
        />
      )}
      <p>{creator.description}</p>
      <p>
        <a href={creator.url} target="_blank" rel="noopener noreferrer">
          Visit creator
        </a>
      </p>
      <div style={{ marginTop: '1rem' }}>
        <Link to={`/creators/${id}/edit`} style={{ marginRight: '1rem' }}>
          Edit
        </Link>
        <Link to="/">Back to list</Link>
      </div>
    </main>
  );
}