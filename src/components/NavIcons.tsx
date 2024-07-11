"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import Tooltip from "@mui/material/Tooltip";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const profileRef = useRef(null);
  const cartRef = useRef(null);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Tooltip title={isLoggedIn ? "Perfil" : "Registrate o inicia sesión"} arrow>
        <Image
          src="/profile-t.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
        />
      </Tooltip>
      {isProfileOpen && (
        <div
          ref={profileRef}
          className="absolute p-4 rounded-md top-12 left-1/2 transform -translate-x-1/2 text-center bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 whitespace-nowrap"
        >
          <Link href="/profile" className="px-4 py-2 hover:text-hovr hover:font-semibold">
            Perfil
          </Link>
          <div
            className="mt-2 cursor-pointer px-4 py-2 hover:text-logout hover:font-semibold"
            onClick={handleLogout}
          >
            {isLoading ? "Logging out" : "Cerrar Sesión"}
          </div>
        </div>
      )}

      <Tooltip title="Cesta" arrow>
        <div
          ref={cartRef}
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
          <Image src="/cart-t.png" alt="" width={22} height={22} />
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-cart rounded-full text-white text-sm flex items-center justify-center">
            {counter}
          </div>
        </div>
      </Tooltip>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
