import React from 'react';

const marca = () => {
  return (
    <div className='px-4 pt-24 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      <div className='flex flex-col md:flex-row items-center md:items-start'>
        <img 
          src="/marca.jpg" 
          alt="About Us" 
          className='w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 md:mr-8 rounded-lg'
        />

        <div>
          <h1 className='text-2xl font-bold mb-4'>Fundadora de Mc Clothes</h1>
          <p className='text-l'>Mc Clothes  es una marca que ha evolucionado desde tops basicos  hasta hermosos vestidos de Gala. Inaugurado online en Febrero del 2020 desde la casa de nuestos entonces fundadores Marie Cantarero y Charles Walter  . Ahora tenemos una comunidad de 36 mil seguidores y un equipo que satisface las necesidades de nuestros clientes.
          </p><br></br>

          <p className='text-l'>Desde 15 de Febrero del 2020 el 100 % de las prendas son elaboradas en Honduras  con mucho amor, confeccionadas por costureras que les apasiona la moda; resultando prendas inspiradas para mujeres icónicas.</p><br></br>

          <p className='text-l'>Actualmente su matriz queda en San Pedro Sula, Honduras  donde sigue siendo una empresa online, y presencial que cuenta con un sistema integrado para mejorar la experiencia de la compra, con entregas a nivel nacional</p>
        </div>
      </div>
    </div>
  );
}

export default marca;
