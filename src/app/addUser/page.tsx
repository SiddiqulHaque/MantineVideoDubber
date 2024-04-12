import Navbar from "@/components/Navbar";
import UserList from "@/components/UserList";
import Link from "next/link";
import React from "react";

const Adduser = () => {
  return (
    <div className="overflow-x-hidden">
      <nav className="w-full flex justify-center px-10 py-2 text-blue-900 font-semibold   ">
        <Link href={"/"}>All users</Link>
      </nav>
      <div className="px-20">
        <UserList />
      </div>
    </div>
  );
};

export default Adduser;
