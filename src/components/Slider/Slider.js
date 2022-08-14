import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "semantic-ui-react";
import "./Slider.css";

const settings = {
  initialSlide: 0,
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      },
    },
  ],
};

const Slide = (props) => (
  <Slider {...settings}>
    {props.mainDatas &&
      props.mainDatas.map((mainData) => (
        <div key={mainData.key}>
          <a
            className="SliderAnchor"
            href={
              props.hrefMainUrl
                ? `${props.hrefMainUrl}${mainData.key}`
                : `${mainData.creditUrl}${mainData.key}`
            }
          >
            <div className="SliderDiv">
              <Image
                alt="Main Image"
                className="SliderImage"
                src={
                  mainData.image ||
                  mainData.actorImage ||
                  mainData.recommendedMovieImage ||
                  mainData.creditPicture ||
                  mainData.recommendedTvShowImage
                }
              />
              <h1 className="SliderHeader">
                {mainData.name ||
                  mainData.actorName ||
                  mainData.recommendedMovieName ||
                  mainData.recommendedTvShowName ||
                  mainData.creditName}
              </h1>
              <p>
                {mainData.releaseDate ||
                  mainData.characterName ||
                  mainData.recommendedMovieReleaseDate ||
                  mainData.recommendedTvShowDate ||
                  mainData.creditReleaseDate}
              </p>
            </div>
          </a>
        </div>
      ))}
  </Slider>
);
export default Slide;
