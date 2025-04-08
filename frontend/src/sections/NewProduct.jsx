import React, { useState } from "react";
import { ArrowLeft, Trash, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import RichTextEditor from "../components/RichTextEditor";

const ImageItem = ({ image, index, moveImage, handleImageRemove }) => {
  const [, ref] = useDrag({
    type: "image",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index; // Update the item's index
      }
    },
  });

  return (
    <div
      ref={(node) => drop(ref(node))}
      className="relative aspect-square w-40 flex-shrink-0 overflow-hidden rounded border border-gray-200 group cursor-move"
    >
      {/* Draggable Indicator */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded p-1 opacity-0 group-hover:opacity-100 flex items-center">
        <GripVertical className="w-4 h-4" />
        <span className="text-sm ml-1">Drag</span>
      </div>
      <img
        src={image}
        alt={`Uploaded ${index}`}
        className="w-full h-full object-cover"
      />
      {/* Trash Icon on Hover */}
      <button
        onClick={() => handleImageRemove(index)}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash className="w-6 h-6" />
      </button>
    </div>
  );
};

const NewProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [trackInventory, setTrackInventory] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(""); // Updated state to store selected variant
  const [addedVariants, setAddedVariants] = useState([]); // For tracking added variants

  const handleBackClick = () => {
    navigate("/store/products"); // Navigate back to the products page
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageRemove = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const handleAddVariant = () => {
    // Set the initial variant selection display
    setSelectedVariant("variantOption");
  };

  const handleVariantSelection = (variantType) => {
    if (addedVariants.some((variant) => variant.type === variantType)) {
      return; // Do nothing if variant already exists
    }
    setAddedVariants((prev) => [...prev, { type: variantType, options: [] }]);
    setSelectedVariant(""); // Reset the dropdown after selecting variant
  };

  const handleDeleteVariant = (variantType) => {
    setAddedVariants(addedVariants.filter((variant) => variant.type !== variantType));
  };

  const handleAddOption = (variantType) => {
    const option = prompt("Enter option name (e.g., Red, Small, etc.):");
    if (option) {
      setAddedVariants((prev) =>
        prev.map((variant) =>
          variant.type === variantType
            ? { ...variant, options: [...variant.options, option] }
            : variant
        )
      );
    }
  };

  const handleDeleteOption = (variantType, option) => {
    setAddedVariants((prev) =>
      prev.map((variant) =>
        variant.type === variantType
          ? { ...variant, options: variant.options.filter((opt) => opt !== option) }
          : variant
      )
    );
  };

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto">
      <div className="flex gap-2 items-center">
        <ArrowLeft
          onClick={handleBackClick}
          className="border-2 border-black p-2 w-10 h-10 rounded cursor-pointer"
        />
        <h1 className="text-2xl font-semibold">Add new product</h1>
      </div>

      <div className="bg-stone-100 shadow-md rounded p-4 flex flex-col gap-2">
        <p>Title</p>
        <input
          type="text"
          placeholder="Short sleeve t-shirt"
          className="px-4 py-2 rounded outline-none border border-gray-300"
        />
        <p>Description</p>
        <RichTextEditor />
      </div>

      <div className="bg-stone-100 shadow-md rounded p-4 flex flex-col gap-4">
        <p>Media</p>
        {/* Upload Button */}
        <div className="flex justify-center p-2 bg-white rounded border border-gray-300">
          <label className="text-blue-700 bg-blue-50 px-4 py-2 rounded hover:bg-blue-100 transition-colors cursor-pointer">
            Add files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Draggable Image List */}
        <DndProvider backend={HTML5Backend}>
          <div className="flex gap-2 overflow-x-auto p-2 border border-gray-200 rounded bg-white">
            {images.map((image, index) => (
              <ImageItem
                key={index}
                image={image}
                index={index}
                moveImage={moveImage}
                handleImageRemove={handleImageRemove}
              />
            ))}
          </div>
        </DndProvider>
      </div>

      <div className="bg-stone-100 shadow-md rounded p-4 flex flex-col gap-2">
        <p>Pricing</p>
        <div className="px-4 py-2 rounded border border-gray-300 bg-white flex items-center gap-2">
          <p>₹</p>
          <input
            type="number"
            placeholder="0.00"
            className="outline-none h-full flex-1"
          />
        </div>
        <p>Cost Price</p>
        <div className="px-4 py-2 rounded border border-gray-300 bg-white flex items-center gap-2">
          <p>₹</p>
          <input
            type="number"
            placeholder="0.00"
            className="outline-none h-full flex-1"
          />
        </div>
        {/* Track Inventory */}
        <p className="flex items-center gap-2">
          <input
            type="checkbox"
            id="trackInventory"
            checked={trackInventory}
            onChange={(e) => setTrackInventory(e.target.checked)}
          />
          <label htmlFor="trackInventory">Track Inventory</label>
        </p>
        {/* Conditional Quantity Input */}
        {trackInventory && (
          <div className="px-4 py-2 rounded border border-gray-300 bg-white flex items-center gap-2">
            <p>Quantity in store:</p>
            <input
              type="number"
              placeholder="0"
              className="outline-none h-full flex-1"
            />
          </div>
        )}
      </div>

      <div className="bg-stone-100 shadow-md rounded p-4 flex flex-col gap-2">
        <p>Variants</p>

        {/* Add Variant Link */}
        {!addedVariants.length && (
          <button
            onClick={handleAddVariant}
            className="flex items-center text-blue-600 underline"
          >
            <span className="mr-2">+</span> Add options like color or size
          </button>
        )}

        {/* Variant Selection */}
        {selectedVariant && !addedVariants.some((variant) => variant.type === selectedVariant) && (
          <div className="mt-4">
            <select
              value={selectedVariant}
              onChange={(e) => handleVariantSelection(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300"
            >
              <option value="variantOption" disabled>
                Select a variant
              </option>
              <option value="Size">Size</option>
              <option value="Color">Color</option>
              <option value="Material">Material</option>
              <option value="Style">Style</option>
            </select>
          </div>
        )}

        {/* Display Added Variants */}
        {addedVariants.map((variant) => (
          <div key={variant.type} className="mt-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">{variant.type}</h3>
              <button
                onClick={() => handleDeleteVariant(variant.type)}
                className="text-red-600"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => handleAddOption(variant.type)}
                className="text-blue-600 underline"
              >
                Add option
              </button>
              {variant.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 border p-2 rounded justify-between"
                >
                  <span>{option}</span>
                  <button
                    onClick={() => handleDeleteOption(variant.type, option)}
                    className="text-red-600"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
