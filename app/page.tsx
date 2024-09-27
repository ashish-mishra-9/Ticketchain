import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
  return (
    <>
    
      <main className="flex flex-col justify-center items-center h-[100vh] bg-[url('../public/black_bg.jpg')] bg-cover ">
        <p className="text-slate-50 font-medium text-xl">
          Next Generation of Trust And Security
        </p>
        <p className="font-extrabold  text-5xl mt-7 text-center">
          <strong className="text-white">
            Revolutionize your Industry with BlockChain
          </strong>
          <br></br>
          <strong className="text-purple-500 text-5xl">
            Explore The Possibilities
          </strong>
        </p>
        <div className="flex justify-around w-[40vw] mt-10">
          <Link href={"/connect"}>
            <Button
              className={cn("h-14 w-[14vw] bg-purple-600 hover:bg-purple-900")}
            >
              Get Started
            </Button>
          </Link>
          <Button className="h-14 w-[14vw]" variant={"secondary"}>
            Join Community
          </Button>
        </div>
      </main>
      <main className="flex pr-40 pl-40 bg-black items-center justify-between h-[70vh]">
        <div className="flex flex-col  w-[50vw] pr-14">
          <p className="font-bold  text-2xl text-white text-start">
            Revolutionize your Industry with BlockChain
          </p>
          <p className="text-gray-400 text-lg mt-4">
            Web3 has been developed with the following copyright notice in the
            original documentation file that describes the .
          </p>
          <Button className="w-[150px] mt-6 " variant={"secondary"}>
            Get Started
          </Button>
        </div>
        <p className="text-white">Hello</p>
      </main>
      <main className="flex  pr-40 pl-40 bg-black items-center justify-between h-[70vh]">
        <p className="text-white">Hello</p>
        <div className="flex flex-col items-end   w-[50vw] pr-14">
          <p className="font-bold  text-2xl text-white text-start">
            Revolutionize your Industry with BlockChain
          </p>
          <p className="text-gray-400 text-lg mt-4 text-right">
            Web3 has been developed with the following copyright notice in the
            original documentation file that describes the .
          </p>
          <Button className="w-[150px] mt-6 " variant={"secondary"}>
            Get Started
          </Button>
        </div>
      </main>
    </>
  );
}
