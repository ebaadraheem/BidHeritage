import React from 'react';
import { useRouter } from 'next/navigation';
const Card = ({ params }) => {
  const router = useRouter()

  const handleClick = (id) => {
    router.push(`/description/${id}`);
  };
  return (
    <div className='flex justify-center p-1'>
      <div onClick={() => handleClick(params.specificId)} className='flex max-md:w-[370px] max-sm:w-[320px] bg-[#F5DEB3] overflow-hidden cursor-pointer rounded-md  max-md:pb-3 md:py-3 flex-col  items-center md:flex-row md:max-w-lg w-full hover:scale-95 hover:shadow-lg transition-transform transform'>
        <img
          className="md:object-cover object-contain overflow-hidden rounded-lg w-full h-36 md:w-36   "
          src={params.images[0]}
          alt={params.title}
        />
        <div className='transition-all rounded-md cursor-pointer flex flex-col gap-2 px-2 w-full md:w-80 h-auto'>
          <div className='overflow-hidden text-[#4B2E2E] max-md:text-[1.30rem] text-2xl h-[66px] flex justify-center items-center text-center font-bold line-clamp-2'>
            {params.title}
          </div>
          <p className='overflow-hidden text-[#4A4A4A] flex items-center justify-center h-[97px] text-sm text-center line-clamp-3'>
            {params.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Card;
