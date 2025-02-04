import  { useState } from "react";
import "../styles/MainNav.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CrossCircledIcon, Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
export default function MainNav() {
  const [state, setState] = useState({
    state: "home", // Default state
  });
  const [search, setSearch] = useSearchParams(); // Using search parameters for navigation
  const nav = useNavigate(); // Using navigate hook for navigation

  return (
    <div className="Nav_Parent">
      {/* Heading for the navigation bar */}
      <h1 className="Nav_Heading">Tiptap Notes</h1>
      <div className="All_Nav_btns">
        {/* Rendering "New Note" button conditionally based on state and search parameters */}
        {(state.state === "home" || state.state === "read") &&
          search.get("id") !== "newNote" && (
            <Link to="/editor?id=newNote">
              <button className="Nav_btn">
                <PlusCircledIcon/> New Note
              </button>
            </Link>
          )}

        {/* Rendering "Cancel" button when creating a new note */}
        {search.get("id") === "newNote" && (
          <button
            className="Nav_btn"
            onClick={() => {
              setState({ ...state, state: "home" }); // Updating state when cancelling new note creation
              nav("/"); // Navigating back to home
              console.log("deleted"); // Logging message
            }}
          >
            <CrossCircledIcon/> Cancel
          </button>
        )}

        {/* Rendering "Edit" button when in read mode */}
        {state.state === "read" && state.state !== "home" && search.get("id") !== "newNote" && (
          <Link to={`/editor?id=${search.get("id")}`}>
            <button
              className="Nav_btn"
              onClick={() => setState((prev) => ({ ...prev, state: "edit" }))}
            >
              <Pencil2Icon/> edit
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
