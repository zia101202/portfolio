import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlock from "@tiptap/extension-code-block";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";
import { useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  Bars3Icon,
  LinkIcon,
  PhotoIcon,
  CodeBracketIcon,
  TableCellsIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

const TiptapEditor = ({ setData }) => {
  const [content, setContent] = useState("");
  setData(content);
  console.log(content);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Image,
      TextStyle,
      FontSize.configure({ types: ["textStyle"] }),
      Link.configure({ openOnClick: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
    ],
    editorProps: {
      attributes: {
        class: "h-[300px] w-[900px] overflow-auto focus:outline-none", // Set height here
      },
    },
    content: "<p>Hello World!</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return <p className="text-gray-400">Loading Editor...</p>;
  }

  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "40px",
  ];

  const setFontSize = (size) => {
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };
  return (
    <div className="bg-gray-900 text-white p-5 rounded-xl shadow-lg max-w-3xl mx-auto">
      {/* Toolbar */}
      <div className="flex gap-2 p-3 bg-gray-800 rounded-lg mb-4">
        <select
          onChange={(e) => setFontSize(e.target.value)}
          className="p-2 mx-1 bg-gray-700 text-white rounded-lg"
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <BoldIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <ItalicIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <UnderlineIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <ListBulletIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <Bars3Icon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <HashtagIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <TableCellsIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <CodeBracketIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <PhotoIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          <LinkIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Editor */}
      <div className="border border-gray-700 p-4 rounded-lg bg-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
