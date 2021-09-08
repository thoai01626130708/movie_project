import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import './FlimFlip.css'
import { history } from "../../App";
import { BOOKING } from '../../util/settings/config';
import { useTranslation } from 'react-i18next';

export default function FilmFlip(props) {

    const { item } = props;
    const { t, i18n } = useTranslation();


    return (
        <div className="flip-card mt-2">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} onError={e => { e.target.onerror = null; e.target.src = './img/film.jpg'; }} />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }} >
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} onError={e => { e.target.onerror = null; e.target.src = './img/film.jpg'; }} />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <PlayCircleOutlined onClick={() => { props.setDispalyModalCallBack(true) }} style={{ fontSize: '50px' }} />
                            <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div onClick={() => {
                history.push(`/detail/${item.maPhim}`);
            }} className="text-center cursor-pointer py-2 bg-red-500 my-2 text-success-50 font-bold">{t(BOOKING)}</div>
        </div>
    )
}
