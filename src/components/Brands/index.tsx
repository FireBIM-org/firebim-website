import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <div className="mt-12 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-wrap items-center justify-center">
        {brandsData.map((brand) => (
          <SingleBrand key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="flex w-1/2 items-center justify-center px-3 py-4 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        title={name}
        className="relative h-12 w-full opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      >
        <Image src={image} alt={name} fill className="image-partner" />
      </a>
    </div>
  );
};
