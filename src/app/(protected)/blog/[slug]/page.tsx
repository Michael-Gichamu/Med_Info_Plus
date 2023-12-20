"use client";
import React from "react";
import { useParams } from "next/navigation";
import { fetchMyBlogs } from "@/appwrite/blogs.actions";
import Loading from "../../home/loading";
import Article from "@/components/Article";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const MyBlog = () => {
  const { slug } = useParams();
  const [myBlogs, setMyBlogs] = React.useState<any>();
  const [Admin, setIsAdmin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const fetchData = async () => {
    const user = slug.toString();
    const resp: any = await fetchMyBlogs(user);
    setMyBlogs(resp.documents);
    setLoading(false);
  };

  const { isAdmin } = useAuth();
  React.useEffect(() => {
    fetchData();
    setIsAdmin(isAdmin);
  });

  if (loading) {
    return (
      <>
        <header className="bg-slate-800 shadow rounded-md m-2">
          <Script
            crossOrigin="anonymous"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4817769699396256"
          />
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-white">
              My blogs
            </h1>
          </div>
        </header>
        <div className=" flex justify-center items-center  mt-[50%] ">
          <Loading />
        </div>
      </>
    );
  }
  if (!loading && myBlogs.length === 0) {
    return (
      <>
        <header className="bg-slate-800 shadow rounded-md m-2">
          <Script
            crossOrigin="anonymous"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4817769699396256"
          />
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-white">
              My blogs
            </h1>
          </div>
        </header>
        <div className=" flex justify-center items-center mt-[3rem]">
          <Image src="/empty.svg" alt="nothing here" height={200} width={200} />
        </div>
        <div className="text-white text-center mt-[2rem] text-xl">
          There is nothing here!{" "}
          <Link href="/blog">
            {" "}
            <span className="text-blue-600">create new</span>
          </Link>
        </div>
      </>
    );
  }
  return (
    <div>
      <header className="bg-slate-800 shadow rounded-md m-2">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">
            My blogs
          </h1>
        </div>
      </header>
      <div className="flex justify-center">
        <div className="w-3/4">
          <Article allArticles={myBlogs} admin={Admin} />
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
