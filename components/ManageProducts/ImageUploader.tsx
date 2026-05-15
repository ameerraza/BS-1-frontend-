import React from "react";
import { FiX } from "react-icons/fi";

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
  existingImages?: string[];
  onRemoveExistingImage?: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  existingImages = [],
  onRemoveExistingImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onImageUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-4 mb-4">
        {existingImages.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Uploaded ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
            {onRemoveExistingImage && (
              <button
                type="button"
                onClick={() => onRemoveExistingImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <FiX />
              </button>
            )}
          </div>
        ))}
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ImageUploader;
