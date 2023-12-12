"use client";
import React from "react";
import Image from "next/image.js";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { logout } from "@/appwrite/auth.actions.ts";
import { useRouter } from "next/navigation.js";
import { useAuth } from "@/context/AuthContext.tsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoginTime, setIsLoginTime] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [path, setPath] = React.useState("/login");
  const router = useRouter();

  const { isUserLoggedIn, checkLoggedIn } = useAuth();
  const checkLogin = async () => {
    await checkLoggedIn();
  };

  React.useEffect(() => {
    checkLogin();

    setIsLoginTime(false);
    setLoggedIn(true);
  });

  React.useEffect(() => {
    if (window.location.pathname === "/login") {
      setIsLoginTime(true);
      setPath("/signup");
    }
  });
  const menuItems = [];
  const logOutUser = async () => {
    try {
      await logout();
      await checkLogin();
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className=" p-5"
      shouldHideOnScroll
      position="static"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={
            <Image height={25} width={25} src="/burger.svg" alt="toggle" />
          }
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p
            className="font-bold text-inherit"
            onClick={() => router.push("/")}
          >
            MedInfoPlus
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>

        <NavbarItem isActive>
          <Link href="/home" aria-current="page">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blog">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem> */}
        {loggedIn ? (
          <NavbarItem>
            <Button
              onClick={logOutUser}
              as={Link}
              color="primary"
              href="/login"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href={path} variant="flat">
              {isLoginTime ? "Sigup" : "Login"}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
