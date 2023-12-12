"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getImage, deleteBlog } from "@/appwrite/blogs.actions";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import EditModal from "./EditModal";
import Image from "next/image";
import { BlogType } from "@/appwrite/blogs.actions";
import { updateArticles } from "@/appwrite/articles.actions";
const Article = ({
  allArticles,
  admin,
}: {
  allArticles: any[];
  admin: boolean;
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [user, setUser] = useState<string>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const { userId, isAdmin } = useAuth();

  useEffect(() => {
    setUser(userId);

    const fetchImagesAndSetArticles = async () => {
      try {
        const articlesWithImages = await Promise.all(
          allArticles.map(async (article) => {
            try {
              const imageSrc = await getImage(article.imageId);
              return { ...article, imageSrc };
            } catch (error) {
              console.error("Error fetching image:", error);
              return article; // Return the article without an image if fetching fails
            }
          })
        );
        setArticles(articlesWithImages);
      } catch (error) {
        toast.error("Failed to load articles");
        console.error("Error fetching articles:", error);
      }
    };

    if (allArticles.length) {
      fetchImagesAndSetArticles();
    }
  });
  // console.log(articles);

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteBlog(id);
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.$id !== id)
        );
        toast.success("Deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete article");
      }
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleSaveArticle = async (editedArticle: any) => {
    const {
      author,
      author_id,
      content,
      title,
      tags,
      references,
      imageId,
    }: BlogType = editedArticle;
    const data = {
      author,
      author_id,
      content,
      title,
      tags,
      references,
      imageId,
    };
    const { $id } = editedArticle;
    try {
      const resp = await updateArticles($id, data);
      toast.success("Edit success!");
      handleCloseModal();
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.$id === $id ? { ...article, ...data } : article
        )
      );

      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full pr-4">
      <h2 className="text-xl font-semibold mb-4">All Articles</h2>
      <ToastContainer />

      <EditModal
        isOpen={isModalOpen}
        article={editingArticle}
        onClose={handleCloseModal}
        onSave={handleSaveArticle}
      />
      {articles.map((article) => (
        <div
          key={article.$id}
          className="bg-white overflow-hidden shadow rounded-lg mb-4 p-4"
        >
          <div className="font-semibold text-lg text-black flex justify-between">
            <h3>{article.title}</h3>
            {isAdmin && (
              <div className="flex gap-3">
                <Image
                  onClick={() => handleEdit(article)}
                  src="/edit.svg"
                  alt="edit"
                  width={6}
                  height={6}
                  className="w-6 h-6 cursor-pointer"
                />
                <Image
                  onClick={() => handleDelete(article.$id)}
                  src="/delete.svg"
                  width={6}
                  height={6}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            )}
            {!isAdmin && user === article.author_id && (
              <div className="flex gap-3">
                <Image
                  onClick={() => handleEdit(article)}
                  src="/edit.svg"
                  alt="edit"
                  width={6}
                  height={6}
                  className="w-6 h-6 cursor-pointer"
                />
                <Image
                  onClick={() => handleDelete(article.$id)}
                  src="/delete.svg"
                  width={6}
                  height={6}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            )}
          </div>
          {article.imageSrc && (
            <img
              src={article.imageSrc}
              alt={article.title}
              // width={300}
              // height={300}
              className="w-full h-auto mb-4 mt-2"
            />
          )}

          <div className="text-gray-600 mt-2">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <div className="flex mt-4 justify-between">
            <div className="text-blue-500">{article.author}</div>
            {article.tags.map((tag: any, index: string) => (
              <div
                key={index}
                className="text-blue-900 p-2 items-center border border-blue-500 rounded-2xl text-sm font-bold"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;
