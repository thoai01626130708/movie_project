import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, layChiTietPhongVeAction, datVeAction } from '../../redux/actions/QuanLyDatVeActions';
import style from './Checkout.module.css';
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import './Checkout.css';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../../index';
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CHANGE_TAB_ACTIVE, DAT_GHE } from '../../redux/actions/types/QuanLyDatVeType';
import { ADDRESS, BOOKING, DATE, THEATER_NAME, TIME, TOKEN, USER_LOGIN, LOG_OUT, CHOOSE_SEAT_AND_PAY, BOOKING_RESULT, HELLO, BOOKING_HISTORY, BOOKING_HISTORY_MESSAGE, SCREEN, SEAT_CODE, DATE_TIME, AVAILABLE, RESERVED, VIP, SELECTED, OCCUPIED, YOUR_RESERVATION } from "../../util/settings/config";

function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);
    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        //Gọi hàm tạo ra 1 async function 
        const action = layChiTietPhongVeAction(props.match.params.id);
        //Dispatch function này đi
        dispatch(action);

        //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
        connection.on('datVeThanhCong', () => {
            dispatch(action);
        })



        //Vừa vào trang load tất cả ghế của các người khác đang đặt
        connection.invoke('loadDanhSachGhe', props.match.params.id);


        //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            //Bước 1: Loại mình ra khỏi danh sách 
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung 
            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);

                return [...result, ...arrGhe];
            }, []);

            //Đưa dữ liệu ghế khách đặt cập nhật redux
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');

            //Đưa dữ liệu ghế khách đặt về redux
            dispatch({
                type: DAT_GHE,
                arrGheKhachDat
            })

        })

        //Cài đặt sự kiện khi reload trang
        window.addEventListener("beforeunload", clearGhe);

        return () => {
            clearGhe();
            window.removeEventListener('beforeunload', clearGhe);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const clearGhe = function (event) {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);
    }

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderTrangThaiGhe = (ghe, classGheDaDuocDat, classGheKhachDat) => {
        if (ghe.daDat) {
            return (
                classGheDaDuocDat !== ''
                    ?
                    <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    :
                    <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
            );
        } else {
            return classGheKhachDat !== ''
                ?
                <SmileOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                :
                ghe.stt
        }
    }

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

            //Kiểm tra từng render xem có phải ghế khách đặt hay không
            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheKhachDat';
            }
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }


            if (indexGheDD !== -1) {
                classGheDaDat = 'gheDangDat';
            }


            return <Fragment key={index}>
                <button onClick={() => {

                    const action = datGheAction(ghe, props.match.params.id);
                    dispatch(action);


                }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`} key={index}>
                    {renderTrangThaiGhe(ghe, classGheDaDuocDat, classGheKhachDat)}
                    {/* {ghe.daDat
                        ?
                        classGheDaDuocDat !== ''
                            ?
                            <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                            :
                            <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                        :
                        classGheKhachDat !== ''
                            ?
                            <SmileOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                            :
                            ghe.stt
                    } */}

                </button>

                {(index + 1) % 16 === 0 ? <br /> : ''}

            </Fragment>
        })
    }

    return (
        <div className=" min-h-screen mt-5" >
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black " style={{ width: '80%', height: 15 }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black ">{t(SCREEN)}</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <table className=" divide-y divide-gray-600 w-2/3">
                            <thead className=" p-5">
                                <tr>
                                    <th>{t(AVAILABLE)}</th>
                                    <th>{t(SELECTED)}</th>
                                    <th>{t(VIP)}</th>
                                    <th>{t(RESERVED)}</th>
                                    <th>{t(YOUR_RESERVATION)}</th>
                                    <th>{t(OCCUPIED)}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                <tr>
                                    <td><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheKhachDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-span-3">
                    <h3 className="text-green-400 text-center text-4xl"> {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe;
                    }, 0).toLocaleString()} đ</h3>
                    <hr />
                    <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
                    <div><span className="font-bold mr-1">{t(ADDRESS)}:</span> {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</div>
                    <div><span className="font-bold mr-1">{t(DATE_TIME)}:</span> {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</div>
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5">
                            <span className="text-red-500 font-bold text-lg mr-1">{t(SEAT_CODE)}</span>

                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl"> {gheDD.stt}</span>
                            })}
                        </div>
                        <div className="text-right col-span-1">
                            <span className="text-green-800 text-lg">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="my-5">
                        <i className="font-bold">Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className="my-5">
                        <i className="font-bold">Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom: 0 }}>
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            dispatch(datVeAction(thongTinDatVe));
                        }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer rounded">
                            {t(BOOKING)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




const { TabPane } = Tabs;

export default function CheckoutTab(props) {
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    useEffect(() => {
        return () => {
            dispatch({
                type: CHANGE_TAB_ACTIVE,
                number: '1'
            })
        }
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <div className="self-center px-8 py-3 text-lg">{t(HELLO)}<span className="ml-1 mr-1 text-lg font-bold">{userLogin.taiKhoan}</span>!</div></button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className="text-blue-800 text-lg">{t(LOG_OUT)}</button> </Fragment> : ''}
    </Fragment>

    return <div className="blur-lg p-5" style={{ backgroundImage: 'url(./../img/theater.jpg)' }}>
        <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,.8)' }}>
            <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
                dispatch({
                    type: CHANGE_TAB_ACTIVE,
                    number: key.toString()
                })
            }}>
                <TabPane tab={t(CHOOSE_SEAT_AND_PAY).toUpperCase()} key="1" >
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab={t(BOOKING_RESULT).toUpperCase()} key="2">
                    <KetQuaDatVe {...props} />
                </TabPane>
                <TabPane tab={<div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><NavLink to="/"><HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} /></NavLink></div>} key="3">

                </TabPane>
            </Tabs>
        </div>
    </div>

}


function KetQuaDatVe(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    }, [dispatch])

    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);

            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center bg-red-50 border-gray-500 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-green-700 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
                        <p><span className="font-bold">{t(TIME)}:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">{t(DATE)}:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                        <p><span className="font-bold">{t(ADDRESS)}:</span> {seats.tenHeThongRap}   </p>
                        <p>
                            <span className="font-bold">{t(THEATER_NAME)}:</span> {seats.tenCumRap} - <span className="font-bold">{t(SEAT_CODE)}:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                        </p>
                    </div>
                </div>
            </div>
        })
    }

    return <div className="p-5">

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-yellow-600 ">{t(BOOKING_HISTORY)}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{t(BOOKING_HISTORY_MESSAGE)}</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}