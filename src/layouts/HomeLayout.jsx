import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { Play, SkipBack, SkipForward } from "lucide-react";
import PlayerFooter from "../components/PlayerFooter";

const HomeLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className=" flex h-[80%]">
        <div className="w-[20%] p-4 border-r border-gray-400">
          <h1>Favourite</h1>
          <h1>Liked songs</h1>
        </div>

        <div className="w-[60%] p-4 border-r border-gray-400 overflow-scroll">
          <Outlet />
        </div>

        <div className="w-[20%] p-4">Right</div>
      </div>

      <PlayerFooter />
    </div>
  );
};

export default HomeLayout;
