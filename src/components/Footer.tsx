import Image from "next/image";
import Link from "next/link";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gradient-to-r from-gray-50 to-blue-50 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">

        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            {/* <div className="text-2xl tracking-wide">LAMA</div> */}
            <Image src="/logo.png" alt="" width={150} height={150} />
          </Link>
          <p>
          Dirección del negocio o dirección principal del negocio.
          </p>

          <Link href="mailto:mc.clothes.hn@gmail.com">
            <span className="font-semibold hover:text-hovr">mc.clothes.hn@gmail.com</span>
          </Link>
          <Link href="tel:+1234567890">
            <span className="font-semibold hover:text-hovr">+1 234 567 890</span>
          </Link>

          <div className="flex gap-6">
            <Link href="https://www.facebook.com" target="_blank">
               <FacebookIcon alt="Facebook" width={16} height={16}/>
              {/* <Image src="/facebook.png" alt="Facebook" width={16} height={16} /> */}
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <InstagramIcon alt="Instagram" width={16} height={16} />
              {/* <Image src="/instagram.png" alt="Instagram" width={16} height={16} /> */}
            </Link>
            <Link href="https://www.whatsapp.com" target="_blank">
               <WhatsAppIcon alt="WhatsApp" width={16} height={16} />
              {/* <Image src="/youtube.png" alt="YouTube" width={16} height={16} /> */}
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/3">
          {/* <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div> */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">EXPLORA</h1>
            <div className="flex flex-col gap-6">
              <Link href="/list?cat=best-sellers" className="hover:text-hovr">Best Sellers</Link>
              <Link href="/list?cat=dresses" className="hover:text-hovr">Dresses</Link>
              <Link href="/list?cat=sets" className="hover:text-hovr">Sets</Link>
              <Link href="/list?cat=tops" className="hover:text-hovr">Tops</Link>
              <Link href="/list?cat=faldas-y-pantalones" className="hover:text-hovr">Faldas y Pantalones</Link>
              <Link href="/list?cat=shorts" className="hover:text-hovr">Shorts</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">INFORMACIÓN</h1>
            <div className="flex flex-col gap-6">
              <Link href="/contacto" className="hover:text-hovr">Contacto</Link>
              <Link href="/marca" className="hover:text-hovr">Aserca de Nosotros</Link>
              <Link href="/condiciones" className="hover:text-hovr">Términos y condiciones</Link>
              <Link href="/envios" className="hover:text-hovr">Información de envíos</Link>
              <Link href="devoluciones" className="hover:text-hovr">Cambios y devoluciones</Link>
              <Link href="/aviso" className="hover:text-hovr">Aviso de privacidad</Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8 justify-center">
          {/* <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-cart text-white">JOIN</button>
          </div> */}

          <span className="font-semibold">PAGOS SEGUROS</span>
          <div className="flex justify-between">
            <Image src="/discover.png" alt="" width={40} height={20} />
            <Image src="/skrill.png" alt="" width={40} height={20} />
            <Image src="/paypal.png" alt="" width={40} height={20} />
            <Image src="/mastercard.png" alt="" width={40} height={20} />
            <Image src="/visa.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>


      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="flex flex-col justify-between gap-2">
          <span>© 2024 MC CLOTHS</span>
          <span className="font-extralight text-xs text-gray">Site developed by
          <Link href="https://vladimirgotay.com/" target="_blank" className="hover:text-black"> Vladimir G</Link>
          </span>
        </div>
        
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            {/* <span className="text-gray-500 mr-4">Language</span> */}
            <span className="font-medium">San Pedro Sula, Cortes | Honduras CA</span>
          </div>
          {/* <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">$ USD</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
