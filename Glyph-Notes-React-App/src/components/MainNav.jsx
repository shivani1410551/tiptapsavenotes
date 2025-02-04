import React from "react";
import "./Main.css"; // Importing CSS styles
import { useRecoilState } from "recoil"; // Importing Recoil hooks
import DataFromLocal from "../Storage/DataFromLocal"; // Importing local data
import { Link, useNavigate, useSearchParams } from "react-router-dom"; // Importing routing utilities

export default function MainNav() {
  let [state, setState] = useRecoilState(DataFromLocal); // Using Recoil state
  let [search, SetSearch] = useSearchParams(); // Using search parameters for navigation
  let nav = useNavigate(); // Using navigate hook for navigation

  return (
    <div className="Nav_Parent">
      {/* Heading for the navigation bar */}
      <h1 className="Nav_Heading">Glyph Notes</h1>
      <div className="All_Nav_btns">
        {/* Rendering "New Note" button conditionally based on state and search parameters */}
        {(state.state === "home" || state.state === "read") &&
          search.get("id") !== "newNote" && (
            <Link to="/editor?id=newNote">
              <button className="Nav_btn">
                <i className="fa-solid fa-file-circle-plus " /> New Note
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
            <i className="fa-solid fa-file-circle-xmark"></i> Cancel
          </button>
        )}

        {/* Rendering "Edit" button when in read mode */}
        {state.state === "read" &&
          state.state !== "home" &&
          search.get("id") !== "newNote" && (
            <Link to={`/editor?id=${search.get("id")}`}>
              <button
                className="Nav_btn"
                onClick={() => setState((prev) => ({ ...prev, state: "edit" }))}
              >
                <i className="fa-solid fa-file-pen" /> edit
              </button>
            </Link>
          )}
      </div>
    </div>
  );
}

{
  /* The code provides navigation functionality and renders buttons based on different states and conditions. */
}
