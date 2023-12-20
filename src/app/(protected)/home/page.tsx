"use client";
import React from "react";
import { getArticles } from "@/appwrite/articles.actions";
import { isLogged, logout } from "@/appwrite/auth.actions";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import Article from "@/components/Article";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Script from "next/script";

const Home = () => {
  const [allArticles, setAllArticles] = React.useState<any>([]);
  const [name, setName] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>();
  const [user, setUser] = React.useState<string>();
  const [Admin, setIsAdmin] = React.useState<boolean>(false);

  const router = useRouter();
  const { isAdmin } = useAuth();

  const getUser = async () => {
    try {
      const isLoggedIn = await isLogged();
      try {
        const { name, email, $id } = isLoggedIn!;
        setUser($id);
        setName(name);
        setEmail(email);
        if (!$id) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };
  const logoutUser = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const myBlogNavigate = () => {
    router.push(`/blog/${user}`);
  };

  const fetchData = async () => {
    const resp: any = await getArticles();
    if (resp) {
      setAllArticles(resp.documents);
    }

    setLoading(false);
  };
  React.useEffect(() => {
    setIsAdmin(isAdmin);
  }, [isAdmin]);
  React.useEffect(() => {
    fetchData();
    getUser();
  });
  if (loading) {
    return (
      <div className=" flex justify-center items-center  mt-[50%] ">
        <Loading />
      </div>
    );
  }
  if (!loading && allArticles.length === 0) {
    return (
      <>
        <header className="bg-slate-800 shadow rounded-md m-2">
          <Script
            crossOrigin="anonymous"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4817769699396256"
          />
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-white">
              Medical Articles
            </h1>
          </div>
        </header>
        <div className=" flex justify-center items-center mt-[3rem]">
          <Image src="/empty.svg" alt="nothing here" height={200} width={200} />
        </div>
        <div className="text-white text-center mt-[2rem] text-xl">
          There is nothing here!
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-850">
      <header className="bg-slate-800 shadow rounded-md m-2">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">
            Medical Articles
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex w-full">
              {/* Articles Section */}
              {/* ////////////// */}
              <div className="w-full">
                <Article allArticles={allArticles} admin={Admin} />
              </div>
              {/* Sidebar for Links */}
              <div className="w-1/4 pl-4">
                <div className="bg-white overflow-hidden shadow rounded-lg p-4">
                  <h3 className=" text-sm text-black"></h3>
                  <ul className=" space-y-2 cursor-pointer">
                    <li>
                      <div className="flex justify-between">
                        <p className="text-black hover:text-blue-800">
                          @{name}
                        </p>
                        {Admin && <p className="text-blue-500">admin</p>}
                      </div>
                    </li>
                    <li>
                      <p
                        // onClick={() => logoutUser()}
                        className="text-black hover:text-blue-800"
                      >
                        {email}
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => myBlogNavigate()}
                        className="text-black hover:text-blue-800"
                      >
                        my blogs
                      </p>
                    </li>
                    <li>
                      <p
                        // onClick={() => logoutUser()}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        my account
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => logoutUser()}
                        className="text-red-600 hover:text-red-800"
                      >
                        Logout
                      </p>
                    </li>
                    {/* Add more links */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
