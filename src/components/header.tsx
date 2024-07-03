"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlignJustify, CircleUser, Github, LogOut, Plane } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();
  return (
    <div className="container mx-auto p-5 flex justify-between">
      <div className="flex gap-2 justify-center items-center">
        <Image src="/logo.svg" width={50} height={32} alt="Trips CO" />
        <h1 className="text-2xl text-primary font-semibold ">trips.co</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer hover:bg-secondary focus:border-red-500 border w-fit p-2 gap-3 justify-center  rounded-3xl">
            <AiOutlineMenu size={28} className="text-primary" />

            {status === "authenticated" && data.user && (
              <Image
                src={data.user.image!}
                width={40}
                height={40}
                alt={data.user.name!}
                className="rounded-full"
              />
            )}

            {status === "unauthenticated" && (
              <CircleUser className="text-grayPrimary" size={36} />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="hover:bg-none p-5">
          {status === "unauthenticated" ? (
            <div className="flex flex-col items-center justify-center gap-5 ">
              <h2 className="font-semibold text-lg">Bem vindo!</h2>
              <p className="text-sm">
                Faça seu Login para poder aproveitar a{" "}
                <span className="text-primary font-medium">trips.co</span>{" "}
              </p>
              <Button
                onClick={() => {
                  signIn("google");
                }}
                className="py-2 px-4 cursor-pointer max-w-md flex justify-center items-center gap-3 border bg-white hover:bg-muted w-full text-grayPrimary text-center text-base font-semibold focus:outline-none  rounded-lg"
              >
                <FcGoogle size={25} />
                <p>Entrar com Google</p>
              </Button>
              <Button
                onClick={() => {
                  signIn("github");
                }}
                className="py-2 px-4 cursor-pointer max-w-md flex justify-center items-center gap-3 bg-gray-600 hover:bg-gray-700   text-white w-full text-center text-base font-semibold    rounded-lg"
              >
                <Github size={25} />
                <p>Entrar com GitHub</p>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 ">
              <h1 className="font-medium text-lg">
                Olá, <span className="font-semibold">{data?.user?.name}</span>!
              </h1>{" "}
              <Separator />
              <div className="flex flex-col">
                <DropdownMenuItem className="gap-1 border cursor-pointer hover:bg-accent">
                  <Plane size={24} />
                  <h1>Minhas viagens</h1>
                </DropdownMenuItem>
              </div>
              <Separator />
              <Button
                onClick={() => {
                  signOut();
                }}
                className="py-2 px-4 cursor-pointer max-w-md flex justify-center items-center gap-3 bg-primaryDarker    text-white w-full hover:bg-primaryDarker/90 text-center text-base font-semibold    rounded-lg"
              >
                <LogOut size={22} />
                Sair
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
