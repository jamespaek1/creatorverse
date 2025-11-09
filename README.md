# Creatorverse

This project is a reference implementation of the **WEB103** pre‑work assignment.  It uses **React**, **Vite**, **React Router v6** and the **Supabase JS** client to build a small CRUD application for managing your favourite content creators.  The front‑end is styled using the optional [PicoCSS](https://picocss.com/).

## Features

The application implements all of the required functionality described in the pre‑work specification:

- **View all content creators:** the home page loads the list of creators from Supabase when it mounts.  Each creator is displayed on a card with their name, description, image (optional) and actions.
- **View a single content creator:** clicking a card navigates to a details page that shows the full description, image and a link to the creator’s channel or profile.
- **Add a content creator:** a dedicated page provides a form for entering a creator’s name, URL, description and optional image.  Submitting the form inserts the record into the Supabase table.
- **Edit a content creator:** an edit page pre‑populates the form with the existing data so it can be modified.  Submitting the form updates the record in place.
- **Delete a content creator:** the edit page includes a delete button that removes the record from the database after confirmation.

Routes are defined declaratively using the `useRoutes` hook in React Router【406024190046859†L135-L146】.  Data is fetched asynchronously via the Supabase JS client using the `async/await` pattern, as demonstrated in the official quickstart guide【119533439619924†L320-L327】.

## Project setup

The code is organised as a [Vite](https://vitejs.dev/) project but it is **not** bundled here because the learning environment does not allow package installation.  To get the app running on your machine follow these steps:

1. **Clone the repository** (or download the code) and open a terminal in the `creatorverse` directory.
2. **Create the Vite project dependencies:** run `npm create vite@latest creatorverse -- --template react` in an empty folder and then copy the contents of this `creatorverse/src` directory and the configuration files (`index.html`, `vite.config.js`, etc.) over the generated files.  Alternatively, you can initialise an empty project and replace its files with the ones from this repository.
3. **Install dependencies:** inside the project directory run `npm install`.  This will pull in `react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js` and the Vite plugins defined in `package.json`.
4. **Configure Supabase:** create a table named `creators` in your Supabase project with the following columns:
   - `id` (bigint, primary key, auto increment)
   - `name` (text, not null)
   - `url` (text, not null)
   - `description` (text)
   - `image_url` (text)

   Then create a `.env` (or `.env.local`) file in the project root and add your connection details:

   ```env
   VITE_SUPABASE_URL=your‑supabase‑project‑url
   VITE_SUPABASE_ANON_KEY=your‑supabase‑anon‑key
   ```

   These variables are read in `src/client.js` when the Supabase client is created.
5. **Run the app:** start the development server with `npm run dev`.  Visit `http://localhost:5173` in your browser to use the app.  You can now add, view, edit and delete creators.

## Customisation ideas

To extend the basic implementation you might consider:

- **Styling the cards:** experiment with custom CSS or other frameworks to create an eye‑catching layout.  The supplied code uses grid layout for responsiveness.
- **Authentication:** integrate Supabase Auth to restrict modifications to signed‑in users.
- **Image uploads:** use Supabase Storage to upload and serve creator avatars instead of linking to external URLs.
- **Validations:** add client‑side validation to the forms to ensure URLs are well‑formed or required fields are provided.

Enjoy building your own version of Creatorverse!