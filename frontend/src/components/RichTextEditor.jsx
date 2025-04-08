import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = () => {
  const [value, setValue] = useState(""); // State to store the editor content

  const handleChange = (content) => {
    setValue(content); // Update state with editor content
  };

  const handleSubmit = () => {
    console.log("Submitted Content:", value); // Log the rich text content
  };

  return (
    <div className="bg-white">
      {/* Rich Text Input */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder="Write something amazing..."
      />
    </div>
  );
};

export default RichTextEditor;
