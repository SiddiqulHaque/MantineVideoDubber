"use client";
import Link from "next/link";
import React from "react";
import MyHome from "../components/TableSelection";
const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <nav className="w-full flex justify-center px-10 py-2 text-blue-900 font-semibold   ">
        <Link href={"/addUser"}>Add User</Link>
      </nav>
      <div className="md:px-20 px-1">
        <MyHome />
      </div>
    </div>
  );
};

export default Home;
