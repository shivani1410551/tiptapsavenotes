import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../styles/SideView.css";

const SideView = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    state: "home",
    data: Object.keys(localStorage), // Get all keys from localStorage
  });

  const [objects, setObjects] = useState([]);
  const [id, setId] = useSearchParams();

  // Load and parse stored notes from localStorage
  useEffect(() => {
   const parsedData = data.data
  .map((key) => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage item with key: ${key}`, error);
      return null;
    }
  })
  .filter(Boolean);
    setObjects(parsedData);
  }, [data]);
function handleDelete(noteId) {
  if (window.confirm("Are you sure you want to delete this note?")) {
    localStorage.removeItem(noteId);
    setData((prev) => ({
      ...prev,
      state: "home",
      data: prev.data.filter((key) => key !== noteId),
    }));
  }
}


  const filteredData = objects.filter((dataIn) =>
    dataIn.Title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidePanel">
      {/* Search Box */}
      <div className="searchBox">
        <input
          type="text"
          id="searchBox"
          placeholder="Search note"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon />
      </div>

      {/* Notes List */}
      <div className="notesList">
        {filteredData.length === 0 ? (
          <h1 className="empty">No Notes Exist</h1>
        ) : (
          filteredData.map((dataIn) => (
            <div key={dataIn.id}>
              <Link
                to={`/ShowSaved?id=${dataIn.id}`}
                onClick={() => setData((prev) => ({ ...prev, state: "read" }))}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(dataIn.id);
                    }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SideView;
