import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./NoteMaking-app.css"
const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const saveNote = () => {
    if (!editor) return;
    const content = editor.getHTML();
    if (currentNote !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === currentNote ? content : note
      );
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, content]);
    }
    editor.commands.clearContent();
    setCurrentNote(null);
  };

  const editNote = (index) => {
    if (!editor) return;
    setCurrentNote(index);
    editor.commands.setContent(notes[index]);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    setCurrentNote(null);
    editor.commands.clearContent();
  };

  return (
    <div className="tiptap-wrapper">
      <h1 className="tiptap-heading">Note-Making App</h1>
      <div className="sidebar">
        <EditorContent editor={editor} className="editor-content" />
        <button
          onClick={saveNote}
          className="save-button"
        >
          Save Note
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="note-list">
            <div dangerouslySetInnerHTML={{ __html: note }}></div>
            <div>
              <button
                onClick={() => editNote(index)}
                className="note-btn edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(index)}
                className="delete-btn note-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteApp;
