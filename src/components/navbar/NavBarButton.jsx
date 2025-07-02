import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";

const NavBarButton = ({ text, link, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className="flex-row flex gap-1 items-center">
        <Link
          to={link}
          className={`text-xl relative cursor-pointer after:absolute after:bottom-[-2px] after:left-1/2 after:h-[1px] after:bg-[#e9f2ef] after:transition-all after:duration-300 after:-translate-x-1/2
            ${isActive ? "after:w-full after:bg-dubraSecondary " : "after:w-0"} hover:after:w-full text-center`}
        >
          {icon}
          {text}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavBarButton;
