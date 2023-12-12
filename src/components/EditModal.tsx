import React, { useEffect, useState } from "react";
import Image from "next/image";
interface EditModalProps {
  isOpen: boolean;
  article: any; // Using 'any' type as per your request
  onClose: () => void;
  onSave: (article: any, imageFile: File | null) => void; // Using 'any' type for the article
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  article,
  onClose,
  onSave,
}) => {
  const [editedArticle, setEditedArticle] = useState<any>(article);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setEditedArticle(
      article || { title: "", imageSrc: "", content: "", tags: [] }
    );
  }, [article]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedArticle({
      ...editedArticle,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editedArticle, imageFile);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center p-4 text-black`}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 overflow-y-auto">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Article</h3>
          <button onClick={onClose} className="text-xl font-semibold">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={editedArticle.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={editedArticle.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={editedArticle.tags.join(", ")}
              onChange={handleTagsChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Change Image
            </label>
            <input
              type="file"
              name="image"
              className="mt-1 block w-full text-sm text-gray-700"
              onChange={handleImageChange}
            />
            {editedArticle.imageSrc && !imageFile && (
              <img
                src={editedArticle.imageSrc}
                // height={60}
                // width={60}
                alt="Current Article"
                className="mt-4 max-h-60 w-auto object-cover"
              />
            )}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
