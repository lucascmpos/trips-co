import React from "react";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <div className="flex items-center justify-between bg-walterWhite px-8 py-4 text-[0.625rem] opacity-75">
      <p>
        © 2024 Copyright{" "}
        <span className="font-semibold text-primary">trips.co</span>{" "}
      </p>

      <a
        className="flex flex-row items-center justify-center gap-2 hover:text-primary"
        href="https://github.com/lucascmpos/trips-co"
        target="_blank"
      >
        <p>Feito por Lucas Campos</p>
        <IoLogoGithub size={18} />
      </a>
    </div>
  );
};

export default Footer;
