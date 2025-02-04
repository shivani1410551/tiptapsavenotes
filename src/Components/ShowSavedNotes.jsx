import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ShowSavedNotes() {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("id");

  const [content, setContent] = useState("");
  const [fileTitle, setFileTitle] = useState("Untitled");

  useEffect(() => {
    if (noteId) {
      const storedNote = localStorage.getItem(noteId);
      if (storedNote) {
        const parsedNote = JSON.parse(storedNote);
        setContent(parsedNote.content || "");
        setFileTitle(parsedNote.Title || "Untitled");
      }
    } else {
      navigate("/");
    }
  }, [noteId, navigate]);

  return (
    <div>
      {/* Displaying the saved note */}
      <div
        ref={contentRef}
        className="showContent"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Print/Download Button */}
      <ReactToPrint
        trigger={() => <button className="Download_btn">Download</button>}
        content={() => contentRef.current}
        fileName={fileTitle}
      />
    </div>
  );
}
