"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlignJustify, CircleUser, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const { data, status } = useSession();
  return (
    <div className="container mx-auto p-5 flex justify-between">
      <div className="flex gap-2 justify-center items-center">
        <Image src="/logo.svg" width={80} height={32} alt="Trips CO" />
        <h1 className="text-2xl text-primary font-semibold ">trips.co</h1>
      </div>

      <Sheet>
        <SheetTrigger>
          <div className="flex items-center w-fit p-2 gap-3 justify-center border rounded-3xl">
            <AiOutlineMenu size={32} className="text-primary" />

            {status === "authenticated" && data.user && (
              <Image
                src={data.user.image!}
                width={36}
                height={36}
                alt={data.user.name!}
                className="rounded-full"
              />
            )}

            {status === "unauthenticated" && (
              <CircleUser className="text-primary" size={36} />
            )}
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-10"></SheetHeader>
          {status === "unauthenticated" ? (
            <div className="flex flex-col items-center justify-center gap-5 ">
              <button
                type="button"
                onClick={() => {
                  signIn("google");
                }}
                className="py-2 px-4 max-w-md flex justify-center items-center gap-3 border  hover:bg-muted    w-full text-center text-base font-semibold focus:outline-none  rounded-lg"
              >
                <FcGoogle size={25} />
                Login com Google
              </button>
              <button
                type="button"
                onClick={() => {
                  signIn("github");
                }}
                className="py-2 px-4 max-w-md flex justify-center items-center gap-3 bg-gray-600 hover:bg-gray-700   text-white w-full text-center text-base font-semibold    rounded-lg"
              >
                <Github size={25} />
                Login com GitHub
              </button>
            </div>
          ) : (
            <div>
              <h1>Ola {data?.user?.name}</h1>{" "}
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
