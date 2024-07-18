import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const contacto = () => {
  return (
    <div className="px-4 pt-24 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-3xl font-bold text-center mb-6">Contacto</h1>
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2">
          <img
            src="/contacto.jpg" // replace with your image URL
            alt="Contact"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Escribenos</h2>
          <p className="text-gray-600 mb-4">
            Estamos a tu servicio.
          </p>

          <div className="text-gray-700">
            <p className="mb-8">
              <strong className='p-2'>
                <PlaceIcon className='contact-icon'/>
              </strong> 
              <a href="https://maps.app.goo.gl/zv9o5TyR6q9iYcwc8" target="_blank" rel="noopener noreferrer" className="text-hovr hover:text-button">
              san Pedro sula Colonia Los lauresles  Santorini Plaza, frente al CNA 
              </a>
            </p>
            <p className="mb-8">
              <strong className='p-2'>
                <PhoneIcon className='contact-icon'/>  
              </strong> 
              <a href="tel:+50495810750" className="text-hovr hover:text-button">
                +504 95810750
              </a>
            </p>
            <p className="mb-8">
              <strong className='p-2'>
              <WhatsAppIcon className='contact-icon'/>
              </strong> 
              <a href="https://wa.me/+50495810750" target="_blank" className="text-hovr hover:text-button">
                WhatsApp
              </a>
            </p>
            <p className="mb-8">
              <strong className='p-2'>
               <EmailIcon className='contact-icon'/>
              </strong> 
              <a href="mailto:Mc.clothes.hn@gmail.com" className="text-hovr hover:text-button">
                 Mc.clothes.hn@gmail.com
              </a>
            </p>
            {/* <p className="mb-8">
              <strong>Hours:</strong> Monday - Friday, 9am - 5pm
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default contacto;
