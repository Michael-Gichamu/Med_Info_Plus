"use client";
import { AcmeLogo } from "@/components/AcmeLogo";
import React from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

// import { isLogged } from "@/appwrite/auth.actions";

export default function Home() {
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const router = useRouter();
  // const checkLogged = async () => {
  //   const resp = await isLogged();
  //   console.log(resp.status);
  //   setIsAuthenticated(resp.status);

  //   return resp.status;
  // };
  React.useEffect(() => {
    // checkLogged();

    // if (isAuthenticated == true) {
    //   router.push("/home");
    //   console.log("true");
    // }
    // if (isAuthenticated !== true) {
    //   router.push("/login");
    //   console.log("true");
    // }
    router.push("/home");
  }, []);
  return (
    <main className="flex items-center  h-screen">
      <Script
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4817769699396256"
      />
      <div className=" my-auto mx-auto ">
        <div className=" items-center">
          <div className=" flex">
            <p className=" text-2xl">MedInfoPlus</p>
            <AcmeLogo />
          </div>
        </div>
        <p className="">
          &quot;Empowering Your Health Journey with Trusted Insights and Medical
          Wisdom&quot;
        </p>
      </div>
    </main>
  );
}
