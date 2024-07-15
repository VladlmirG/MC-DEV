import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
// import NavIcons from "./NavIcons";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    // MAIN NAVBAR WRAPPER------------------
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">

      {/* MOBILE VARIANT PSEUDO COMPONENT------------------- */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">MC CLOTHING</div>
        </Link>
        <div className="flex items-center gap-8">
          <NavIcons />
          <Menu />
        </div>
      </div>
      {/* MOBILE VARIANT PSEUDO COMPONENT------------------- */}

      {/* BIGGER SCREENS MUTATION----------------- */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">

        {/* LEFT-------------------------------------- */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={50} height={50} />
            <div className="text-1xl tracking-wide font-semibold">MC CLOTHES</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/" className="hover:transition duration-500 hover:scale-110">Inicio</Link>
            <div className="relative group">
              <div className="flex items-center">
                <Link href="/list?cat=all-products" className="hover:transition duration-500 hover:scale-110">Tienda</Link>
              </div>
              <div className="absolute rounded-md text-center left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col subm shadow-lg gap-2 mt-0 z-10 w-56">
                <Link href="/list?cat=best-sellers" className="px-4 py-2 hover:text-hovr hover:font-semibold">Best Sellers</Link>
                <Link href="/list?cat=dresses" className="px-4 py-2 hover:text-hovr hover:font-semibold">Dresses</Link>
                <Link href="/list?cat=faldas-y-pantalones" className="px-4 py-2 hover:text-hovr hover:font-semibold">Faldas y Pantalones</Link>
                <Link href="/list?cat=nueva-colección" className="px-4 py-2 hover:text-hovr hover:font-semibold">Nueva Colección</Link>
                <Link href="/list?cat=sets" className="px-4 py-2 hover:text-hovr hover:font-semibold">Sets</Link>
                <Link href="/list?cat=shorts" className="px-4 py-2 hover:text-hovr hover:font-semibold">Shorts</Link>
                <Link href="/list?cat=tops" className="px-4 py-2 hover:text-hovr hover:font-semibold">Tops</Link>
                <Link href="/list?cat=plus-size" className="px-4 py-2 hover:text-hovr hover:font-semibold">Plus Size</Link>
              </div>
            </div>
            <Link href="/marca" className="hover:transition duration-500 hover:scale-110">Marca</Link>
            <Link href="/contacto" className="hover:transition duration-500 hover:scale-110">Contacto</Link>
          </div>
        </div>

        {/* RIGHT --------------------------------------*/}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>

      </div>
      {/* BIGGER SCREENS MUTATION----------------- */}

    </div>// MAIN NAVBAR WRAPPER------------------
  );
};

export default Navbar;
