"use client";

import Link from "next/link";
import AdjustIcon from '@mui/icons-material/Adjust';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [selectedSize, setSelectedSize] = useState('');

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSize(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('size', value);
    } else {
      params.delete('size');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 py-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 py-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        <select value={selectedSize} onChange={handleSizeChange} className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]">
          <option value="">All Sizes</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
        </select>

        <ul className="flex gap-4 pl-2 py-2 flex-wrap">
          <li>
            <Link href="/list?cat=all-products" className="text-xs text-gray-600 hover:text-gray-900 align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px'}}/>Todos los productos</Link>
          </li>

          <li>
            <Link href="/list?cat=best-sellers" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Best Sellers</Link>
          </li>

          <li>
            <Link href="/list?cat=dresses" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Dresses </Link>
          </li>

          <li>
            <Link href="/list?cat=faldas-y-pantalones" className="text-xs text-gray-600 hover:text-gray-900"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Faldas y Pantalones</Link>
          </li>

          <li>
            <Link href="/list?cat=nueva-colección" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Nueva Colección</Link>
          </li>

          <li>
            <Link href="/list?cat=sets" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Sets</Link>
          </li>

          <li>
            <Link href="/list?cat=shorts" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Shorts</Link>
          </li>

          <li>
            <Link href="/list?cat=tops" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Tops</Link>
          </li>

          <li>
            <Link href="/list?cat=plus-size" className="text-xs text-gray-600 hover:text-gray-900  align-middle"><AdjustIcon sx={{ fontSize: 'inherit', marginRight: '3px' }}/>Plus size</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
