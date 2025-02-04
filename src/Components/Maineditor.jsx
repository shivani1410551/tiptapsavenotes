import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEditor, BubbleMenu, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { FontItalicIcon, FontBoldIcon, StrikethroughIcon, UnderlineIcon, ListBulletIcon, FontFamilyIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { FaListOl, FaRedo, FaUndo } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function MainEditor() {
  const nav = useNavigate();
  const [q, setQ] = useSearchParams();
  const [state, setState] = useState({ state: "read", data: [] });
  const [showFontStyles, setShowFontStyles] = useState(false);

  // Customize document extension
  const CustomDocument = Document.extend({
    content: "heading block*",
  });

  // Define extensions for the editor
  const extensions = [
    StarterKit.configure({
      document: false,
    }),
    FontFamily,
    TextStyle,
    Text,
    Underline,
    Color,
    CustomDocument,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "Please Enter The Title!";
        }
        return "Write Your Content Here";
      },
    }),
  ];

  // Get pre-added content from local storage
  const preaddedContent = localStorage.getItem(q.get("id"))
    ? JSON.parse(localStorage.getItem(q.get("id"))).content
    : "";
  const content = preaddedContent || "";

  // Initialize editor with extensions and content
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) {
    return null;
  }

  // Handle save functionality
  function handleSave() {
    const data = editor.getHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    let firstHeading = doc.body.firstElementChild;

    if (firstHeading && firstHeading.tagName.toLowerCase().startsWith("h")) {
      firstHeading = firstHeading.textContent.trim();
    } else {
      firstHeading = null;
    }

    if (!firstHeading) {
      alert("Please enter a heading for this note before saving it!!");
      return null;
    }

    const meta = Date.now();
    const dateObject = new Date(meta);
    const id = `${firstHeading}_${meta}`;

    const sendData = {
      id: localStorage.getItem(q.get("id")) || `${firstHeading}_${meta}`,
      Title: firstHeading,
      content: data,
      date: `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`,
      time: `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`,
    };

    localStorage.setItem(
      localStorage.getItem(q.get("id")) || `${firstHeading}_${meta}`,
      JSON.stringify(sendData)
    );

    setState((prevState) => ({
      state: "read",
      data: localStorage.getItem(q.get("id"))
        ? [...prevState.data]
        : [...prevState.data, `${firstHeading}_${meta}`],
    }));

    nav(
      `/ShowSaved?id=${localStorage.getItem(q.get("id")) || `${firstHeading}_${meta}`}`
    );
  }

  return (
    <div className="Editor_Parent">
      <div className="tools">
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <div>
            <EyeClosedIcon />
            <input
              type="color"
              onInput={(event) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : "btns"}
            >
              <FontBoldIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : "btns"}
            >
              <FontItalicIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : "btns"}
            >
              <UnderlineIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : "btns"}
            >
              <StrikethroughIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : "btns"}
            >
              <ListBulletIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : "btns"}
            >
              <FaListOl />
            </button>
            <button
              onClick={() => setShowFontStyles(!showFontStyles)}
              className={showFontStyles ? "is-active" : "btns"}
            >
              <FontFamilyIcon />
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <button
              className={editor.can().undo() ? "is-active" : "btns"}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <FaUndo />
            </button>
            <button
              className={editor.can().redo() ? "is-active" : "btns"}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <FaRedo />
            </button>
            {(state.state === "edit" || q.get("id") === "newNote") && (
              <button
                style={{ padding: "0px" }}
                className="btns Save_btn"
                onClick={handleSave}
              >
                <i
                  className="fa-solid fa-floppy-disk"
                  style={{ fontSize: "2rem" }}
                />{" "}
                Save
              </button>
            )}
          </div>
        </IconContext.Provider>
        {showFontStyles && (
          <div>
            <BubbleMenu
              className="Float"
              editor={editor}
              tippyOptions={{ duration: 100 }}
            >
              <button
                onClick={() =>
                  editor.chain().focus().setFontFamily("Arial").run()
                }
              >
                Arial
              </button>
              <button
                className={
                  editor.isActive("textStyle", { fontFamily: "Helvetica" })
                    ? "is-active"
                    : "btns"
                }
                onClick={() =>
                  editor.chain().focus().setFontFamily("Helvetica").run()
                }
              >
                Helvetica
              </button>
              <button
                className={
                  editor.isActive("textStyle", { fontFamily: "Times New Roman" })
                    ? "is-active"
                    : "btns"
                }
                onClick={() =>
                  editor.chain().focus().setFontFamily("Times New Roman").run()
                }
              >
                Times New Roman
              </button>
              <button
                className={
                  editor.isActive("textStyle", { fontFamily: "Georgia" })
                    ? "is-active"
                    : "btns"
                }
                onClick={() =>
                  editor.chain().focus().setFontFamily("Georgia").run()
                }
              >
                Georgia
              </button>
              <button
                className={
                  editor.isActive("textStyle", { fontFamily: "Courier New" })
                    ? "is-active"
                    : "btns"
                }
                onClick={() =>
                  editor.chain().focus().setFontFamily("Courier New").run()
                }
              >
                Courier New
              </button>
            </BubbleMenu>
          </div>
        )}
      </div>
      {/* Editor content */}
      <div className="editor_container">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

