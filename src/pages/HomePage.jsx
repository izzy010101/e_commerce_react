import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <div
          className="order-2 lg:order-1 w-full lg:w-1/2 h-[700px] md:h-[800px] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/bg_header.jpg')" }}
        ></div>

        <div className="order-1 lg:order-2 w-full lg:w-1/2 px-6 py-20 text-center flex flex-col justify-center items-center dark:bg-neutral-700 dark:text-white sm:relative absolute bg-black bg-opacity-30 sm:bg-gray-200 sm:bg-opacity-100">
          <h1 className="mb-6 text-6xl font-bold text-white lg:text-black">
            Shop With Ease
          </h1>
          <h3 className="mb-8 text-3xl font-bold text-white lg:text-black">
            Ziara Clothing
          </h3>
          <Link
            to="/register"
            className="bg-[#C5B358] text-white py-3 px-6 rounded font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-opacity-90"
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row relative">
        <div className="w-full lg:w-1/2 px-6 py-20 flex flex-col justify-center items-center text-center dark:bg-neutral-700 dark:text-white sm:relative absolute bg-black bg-opacity-30 sm:bg-gray-200 sm:bg-opacity-100 top-0 left-0 right-0 bottom-0">
          <h1 className="text-4xl font-thin mb-6 text-white lg:text-black">
            Introducing The Men 2024 Campaign
          </h1>
          <p className="mb-8 text-md lg:w-3/4 text-white lg:text-black">
            Spotlighting individuality in Ziara Colluci’s new men’s campaign for
            the House.
          </p>
          <Link
            to="#"
            className="text-lg font-semibold underline text-white lg:text-black"
          >
            Discover More
          </Link>
        </div>
        <div
          className="w-full lg:w-1/2 bg-cover bg-center h-[700px] md:h-[800px]"
          style={{ backgroundImage: "url('/assets/beige_man.jpg')" }}
        ></div>
      </div>

      <h1 className="text-5xl lg:text-6xl font-thin text-center mt-6 mb-6">
        Ziara Services
      </h1>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center text-center lg:gap-10 lg:pb-8">
        <div className="max-w-sm lg:w-1/3">
          <div>
            <video
              muted
              autoPlay
              loop
              className="w-full h-64 lg:h-96"
              preload="metadata"
            >
              <source src="/assets/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-5">
              <h5 className="text-2xl font-bold">Personalization</h5>
              <p className="text-md">
                We create personalized luxury clothing tailored to individual
                styles, ensuring a unique and exclusive experience.
              </p>
              <Link to="/personalization" className="underline text-lg">
                Find Out How
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-sm lg:w-1/3">
          <div>
            <video
              muted
              autoPlay
              loop
              className="w-full h-64 lg:h-96"
              preload="metadata"
            >
              <source src="/assets/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-5">
              <h5 className="text-2xl font-bold">Custom Orders</h5>
              <p className="text-md">
                Order with your exact measurements for a perfect fit, ensuring
                luxury and personalized comfort.
              </p>
              <Link to="/customorder" className="underline text-lg">
                Find Out How
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-sm lg:w-1/3">
          <div>
            <video
              muted
              autoPlay
              loop
              className="w-full h-64 lg:h-96"
              preload="metadata"
            >
              <source src="/assets/video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-5">
              <h5 className="text-2xl font-bold">Modern Design</h5>
              <p className="text-md">
                Order custom modern designs tailored to your style, offering
                exclusivity and personalized elegance.
              </p>
              <Link to="/moderndesign" className="underline text-lg">
                Find Out How
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
