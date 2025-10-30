"use client";

import { Component } from "@/components/ui/image-auto-slider";

// Demo uses local Draco gallery images placed in public/images/tenants/draco/gallery
const localImages = [
  "/images/tenants/draco/gallery/dracogallery.png",
  "/images/tenants/draco/gallery/dracogallery2.png",
  "/images/tenants/draco/gallery/dracogallery3.png",
  "/images/tenants/draco/gallery/dracogallery4.png",
  "/images/tenants/draco/gallery/dracogallery5.png",
  "/images/tenants/draco/gallery/dracogallery6.png",
  "/images/tenants/draco/gallery/dracogallery7.png",
  "/images/tenants/draco/gallery/dracogallery8.png",
  "/images/tenants/draco/gallery/dracogallery9.png",
  "/images/tenants/draco/gallery/dracogallery10.png",
  "/images/tenants/draco/gallery/dracogallery11.png",
  "/images/tenants/draco/gallery/dracogallery12.png",
  "/images/tenants/draco/gallery/dracogallery13.png",
  "/images/tenants/draco/gallery/dracogallery14.png",
];

const DemoOne = () => {
  return <Component images={localImages} />;
};

export { DemoOne };

