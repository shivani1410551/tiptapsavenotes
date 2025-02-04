import React, { useState } from "react";
import "./Main.css";
import { useRecoilState, useRecoilValue } from "recoil";
import DataFromLocal from "../Storage/DataFromLocal";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import processed from "../Storage/Processing";
import "react-toastify/dist/ReactToastify.css";

export default function SideView() {
  let [data, SetData] = useRecoilState(DataFromLocal);
  let objects = useRecoilValue(processed);
  let [search, SetSearch] = useState("");
  let [id, setId] = useSearchParams();
  const handleDelete = (id) => {
    // Remove item from localStorage
    localStorage.removeItem(id);
    // Update Recoil state to remove the deleted item
    SetData((prevData) => ({
      ...prevData,state : "home",
      data: prevData.data.filter((key) => key !== id),
    }));
  };

  let filteresData = objects.filter((dataIn) => {
    const title = dataIn.Title;
    if (title) {
      return title.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  });
  let NotesList = filteresData.map((dataIn) => (
    <div key={dataIn.id}>
      <Link
        to={`/ShowSaved?id=${dataIn.id}`}
        onClick={() => {
          SetData((prev) => ({ ...prev, state: "read" }));
        }}
        className={id.get("id") === dataIn.id ? "activeNavLink" : "ShowedList"}
      >
        <div
          className={
            id.get("id") === dataIn.id ? "Active_List_Title" : "List_Title"
          }
        >
          {dataIn.Title}
          <br />
          <span
            className={
              id.get("id") === dataIn.id ? "Active_metaData" : "metaData"
            }
          >
            Date : {dataIn.date} | Time : {dataIn.time}
          </span>
        </div>
        <div>
          <button
            className="sidePanel_btn"
            onClick={() => handleDelete(dataIn.id)}
          >
            <i className="fa-solid fa-trash-can" /> Delete
          </button>
        </div>
      </Link>
    </div>
  ));
  return (
    <div className="SidePanel">
      <div className="search_Box_Container">
        <input
          type="text"
          placeholder="Search"
          id="search_box"
          onChange={(e) => {
            SetSearch(
              e.target.value === null || e.target.value === ""
                ? ""
                : e.target.value
            );
          }}
        />
        <i className="fa-solid fa-magnifying-glass" id="search_icon" />
      </div>
      <div className="notesList">
        {NotesList.length === 0
          ? <h1 className="empty">No Saved Notes Yet!</h1>
          : NotesList}
      </div>
    </div>
  );
}
