'use client';

import Image from 'next/image';
import React from 'react';


interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageSrc: string; // or StaticImageData if you're using next/image imported images
  imageAlt: string;
}

export default function HeroSection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="relative p-20 rounded-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-blue-100 mb-4">{title}</h1>
          <p className="text-lg text-gray-100">{subtitle}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src={imageSrc} alt={imageAlt} className="rounded-lg" width={400} height={400} />
        </div>
      </div>
    </section>
  );
}
