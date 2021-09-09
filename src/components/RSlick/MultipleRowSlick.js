import React, { useState } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import FilmFlip from "../Film/FilmFlip";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType'
import { useTranslation } from "react-i18next";
import { COMING_SOON, NOW_SHOWING } from "../../util/settings/config";
import { TrailerModal } from "../Film/TrailerModal";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
  const [state, setState] = useState({
    isDisplayModal: false,
    trailerUrl: ''
  });


  const setDispalyModalCallBack = (display, trailer) => {
    setState({
      ...state,
      isDisplayModal: display,
      trailerUrl: trailer
    });
  }

  const renderFilms = () => {

    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div className="mt-2" key={index}  >
        <FilmFlip item={item} setDispalyModalCallBack={setDispalyModalCallBack} />
      </div>
    })
  }
  let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { t } = useTranslation();

  return (
    <div>
      <div>
        <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 border-gray-800 border text-white mr-2`} onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU }
          dispatch(action);
        }}>{t(NOW_SHOWING).toUpperCase()}</button>
        <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={() => {
          const action = { type: SET_FILM_SAP_CHIEU }
          dispatch(action);
        }}>{t(COMING_SOON).toUpperCase()}</button>
        <Slider {...settings}>
          {renderFilms()}
        </Slider>
      </div>
      <TrailerModal trailerUrl={state.trailerUrl} isDisplay={state.isDisplayModal} setDispalyModalCallBack={setDispalyModalCallBack} />
    </div>
  );
}

export default MultipleRowSlick;