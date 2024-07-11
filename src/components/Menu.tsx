"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("lock-scroll");
    } else {
      document.body.classList.remove("lock-scroll");
    }
  }, [open]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={toggleMenu}
      />
      {open && (
        <div className="mm absolute text-black left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-20">
          <Link href="/" onClick={toggleMenu}>Inicio</Link>
          <Link href="/list?cat=all-products" onClick={toggleMenu}>Tienda</Link>
          <Link href="/" onClick={toggleMenu}>Marca</Link>
          <Link href="/" onClick={toggleMenu}>Contacto</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;