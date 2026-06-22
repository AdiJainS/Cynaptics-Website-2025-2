"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";

const ProjectCarousel = ({ projects = [] }) => {
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const grid = document.getElementById("grid-desktop");
    if (!grid) return;

    const getLayers = () => document.getElementsByClassName("layer");

    const changeLayer = () => {
      const count = getLayers();
      if (!count[0]) return;

      count[0].removeAttribute("on");
      grid.appendChild(count[0]);
    };

    const handleMouseWheel = () => {
      const count = getLayers();
      if (!count[0]) return;

      count[0].removeAttribute("on");
      count[0].removeAttribute("open");
      changeLayer();
    };

    const handleMouseMove = () => {
      const count = getLayers();
      if (!count[0]) return;

      count[0].setAttribute("on", "true");
    };

    const handleMouseLeave = () => {
      const count = getLayers();
      if (!count[0]) return;

      count[0].removeAttribute("on");
      count[0].removeAttribute("open");
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setStartX(touch.clientX);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      setEndX(touch.clientX);
    };

    const handleTouchEnd = () => {
      if (startX !== null && endX !== null) {
        changeLayer();
        setStartX(null);
        setEndX(null);
      }
    };

    grid.addEventListener("wheel", handleMouseWheel);
    grid.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseleave", handleMouseLeave);
    grid.addEventListener("touchstart", handleTouchStart);
    grid.addEventListener("touchmove", handleTouchMove);
    grid.addEventListener("touchend", handleTouchEnd);

    return () => {
      grid.removeEventListener("wheel", handleMouseWheel);
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseleave", handleMouseLeave);
      grid.removeEventListener("touchstart", handleTouchStart);
      grid.removeEventListener("touchmove", handleTouchMove);
      grid.removeEventListener("touchend", handleTouchEnd);
    };
  }, [endX, startX]);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-white py-20">
        No projects found. Please check Firebase projects data.
      </div>
    );
  }

  return (
    <div
      id="ProjectsCarousel"
      className="!w-full !min-h-[550px] flex justify-center items-center my-auto !text-black"
    >
      <div className="hidden lg:flex w-full h-full justify-center">
        <div
          id="grid-desktop"
          className="lg:flex justify-center"
          ref={carouselRef}
        >
          {projects.map((ele, index) => (
            <div
              key={ele.id}
              className={`layer hidden lg:flex flex-col lg:flex-row items-center my-auto !border-2 group !border-black break-words !justify-center !lg:justify-start lg:!rounded-[40px] !rounded-[20px] ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                id="left-btn"
                className="w-[30px] rounded-tr-full rounded-br-full h-[300px] invert bg-orange-500"
              ></div>

              <div className="w-[600px]">
                {ele.display_image && (
                  <img
                    className="w-[300px] h-[200px] lg:w-[350px] lg:h-[300px] mx-auto rounded-xl transition-all fade-in-out lg:ml-6 border-2 border-black object-cover"
                    src={ele.display_image}
                    alt={ele.project_title || "Project image"}
                  />
                )}
              </div>

              <div className="font-bold lg:mx-10 lg:flex flex-col items-center lg:my-auto lg:w-[90%] lg:h-[100%] break-words relative">
                <div className="lg:pt-auto !text-center items-baseline justify-center lg:justify-start lg:!text-start pb-2 flex flex-wrap text-wrap text-xl mx-2">
                  {ele.project_title}
                </div>

                <div className="lg:pt-auto !text-center items-baseline justify-center lg:justify-start lg:!text-start pb-2 flex flex-wrap !text-black opacity-70 font-thin text-wrap text-sm mx-2">
                  {parse(
                    ele.display_desc ||
                      ele.description_1 ||
                      ele.desc1 ||
                      ""
                  )}
                </div>

                <div
                  id="Know_More"
                  className="lg:p-2 lg:text-lg !text-md w-fit lg:fixed bottom-[355px] lg:translate-y-[125px] h-fit mx-auto border-2 bg-gradient-to-tr from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all fade-in-out font-bold !text-black invert rounded-md p-4 hover:!ring-orange-500 !ring-opacity-50 hover:!ring-4"
                >
                  <Link
                    aria-label="The link of the respective project"
                    className="w-full flex justify-center text-center"
                    href={`/ProjectsPage/${ele.project_title} + ${ele.id.toString()}`}
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden w-full h-full justify-center flex">
        <div id="grid-mobile" className="lg:flex justify-center !h-full">
          {projects.map((ele) => (
            <div
              key={ele.id}
              className="lg:hidden flex-col lg:flex-row items-center !bg-white px-10 !border-2 group !border-black break-words !justify-center !rounded-[20px] pb-10 my-10"
            >
              <div
                id="left-btn"
                className="max-w-[300px] invert rounded-br-full rounded-bl-full h-[20px] bg-orange-500 border-2 border-red-500 mx-auto mb-5"
              ></div>

              <div className="w-full">
                {ele.display_image && (
                  <img
                    className="w-[200px] h-[150px] mx-auto rounded-xl transition-all fade-in-out lg:ml-6 object-cover"
                    src={ele.display_image}
                    alt={ele.project_title || "Project image"}
                  />
                )}
              </div>

              <div className="font-bold lg:mx-10 flex flex-col items-center justify-center lg:my-auto lg:w-[90%] lg:h-[100%] break-words">
                <div className="pt-10 lg:pt-auto !text-center items-baseline justify-center lg:justify-start lg:!text-start pb-2 flex flex-wrap text-wrap lg:text-5xl text-xl mx-2">
                  {ele.project_title}
                </div>

                <div
                  id="Know_More"
                  className="lg:p-2 lg:text-lg !text-md w-fit lg:fixed lg:translate-y-[125px] h-fit !mx-auto border-2 bg-gradient-to-tr from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all fade-in-out !text-black font-bold rounded-md p-4 invert hover:!ring-orange-500 !ring-opacity-50 hover:!ring-4 mt-10"
                >
                  <Link
                    aria-label="The link of the respective project"
                    className="w-full flex justify-center text-center"
                    href={`/ProjectsPage/${ele.project_title} + ${ele.id.toString()}`}
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        #left-btn {
          background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
          animation: changeclr 2s ease-in-out infinite;
        }

        @keyframes changeclr {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        #grid-desktop {
          width: 70%;
          height: 450px;
          position: relative;
          cursor: pointer;
        }

        #Know_More {
          display: inline-flex;
          background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
          padding: 15px 35px;
          border-radius: 50px;
          color: #fff;
          box-shadow: 0px 14px 80px rgba(252, 56, 56, 0.4);
          text-decoration: none;
          font-weight: 500;
          justify-content: center;
          text-align: center;
          letter-spacing: 1px;
        }

        .layer {
          width: 95%;
          position: absolute;
          max-width: 800px;
          margin: auto;
          background: #fff;
          box-shadow: 0px 14px 80px rgba(34, 35, 58, 2);
          padding: 25px 0px;
          border-radius: 25px;
          height: 400px;
          transition: all 0.3s;
        }

        .layer[on="true"] {
          z-index: 999 !important;
          opacity: 1 !important;
        }

        .layer:nth-child(1) {
          transition: 0.5s all ease;
          top: 0px;
          z-index: 3;
          width: 95%;
          left: 2.5%;
          opacity: 1;
        }

        .layer:nth-child(2) {
          transition: 1s all ease;
          top: 20px;
          z-index: 2;
          width: 90%;
          left: 5%;
          background: #b6b7bb;
        }

        .layer:nth-child(3) {
          transition: 1.5s all ease;
          top: 30px;
          z-index: 1;
          width: 85%;
          left: 7.5%;
          background: #616368;
        }

        .layer:nth-child(4) {
          transition: 2s all ease;
          top: 40px;
          z-index: 0;
          width: 80%;
          left: 10%;
          opacity: 0.75;
          background: #414348;
        }

        .layer:nth-child(5) {
          transition: 2.5s all ease;
          top: 50px;
          z-index: -1;
          width: 75%;
          left: 12.5%;
          opacity: 0;
        }

        .layer:nth-child(n + 6) {
          opacity: 0;
          z-index: -2;
        }
      `}</style>
    </div>
  );
};

export default ProjectCarousel;