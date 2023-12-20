"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createNewBlog, uploadImage } from "@/appwrite/blogs.actions";
import { isLogged } from "@/appwrite/auth.actions";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import ReactMarkdown from "react-markdown";
import Script from "next/script";

const Blog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageId, setImageId] = useState<string>();

  const handleMarkdownChange = (event: any) => {
    setContentMarkdown(event.target.value);
  };

  const onSubmit = async (data: any) => {
    const tags = data.tags.split(",");
    const references = data.references.toString().split("#");
    const user = await isLogged();
    const author = user?.name;
    const author_id = user?.$id;

    const cleanData = { ...data, references, tags, author, imageId, author_id };
    const resp = await createNewBlog(cleanData);
    toast.success("Article created successfully");
    reset();
  };
  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadSelectedImage = async (image: File) => {
    try {
      const resp: any = await uploadImage(image);
      setImageId(resp.$id);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Failed to upload image!");
    }
  };
  React.useEffect(() => {
    if (selectedImage) {
      uploadSelectedImage(selectedImage);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-slate-900 py-10">
      <Script
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4817769699396256"
      />
      <div className="container mx-auto">
        <ToastContainer />
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Write your Medical Article
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <p className=" text-gray-500 text-sm font-bold mb-2">Title</p>
              <input
                id="title"
                {...register("title", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="The Impact of ..."
              />
              {errors.title && (
                <p className="text-red-500">Title is required.</p>
              )}
            </div>
            <div className="mb-4">
              <p className=" text-gray-500 text-sm font-bold mb-2">Content</p>
              <textarea
                id="content"
                {...register("content", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-56"
                placeholder="Article content..."
                onChange={handleMarkdownChange}
              />
              {errors.content && (
                <p className="text-red-500">Content is required.</p>
              )}
              <div className="mt-4">
                <p className=" text-gray-500 text-sm font-bold mb-2">Preview</p>
                <div className="preview bg-gray-100 p-4 rounded text-gray-700">
                  <ReactMarkdown>{contentMarkdown}</ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 text-sm font-bold mb-2">Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <p className=" text-gray-500 text-sm font-bold mb-2">Tags</p>
              <input
                id="tags"
                {...register("tags", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="eg. Critical Care, Public Health (separate with a comma)"
              />
              {errors.tags && (
                <p className="text-red-500">Tags are required.</p>
              )}
            </div>
            <div className="mb-4">
              <p className=" text-gray-500 text-sm font-bold mb-2">
                References
              </p>
              <textarea
                id="references"
                {...register("references")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Any references... (separate with a comma)"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Article
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
