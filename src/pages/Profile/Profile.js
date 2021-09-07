import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { Tabs } from "antd";
import { capNhatThongTinNguoiDungAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

const { TabPane } = Tabs;

function Profile(props) {
    // const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         email: thongTinNguoiDung.email,
    //         taiKhoan: thongTinNguoiDung.taiKhoan,
    //         hoTen: thongTinNguoiDung.hoTen,
    //         matKhau: thongTinNguoiDung.matKhau,
    //         soDT: thongTinNguoiDung.soDT,
    //         maNhom: thongTinNguoiDung.maNhom,
    //         maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung || 'KhachHang'
    //     },

    //     onSubmit: (values, { setSubmitting }) => {
    //         dispatch(capNhatThongTinNguoiDungAction(values));
    //         setSubmitting(false);
    //     }
    // });

    const {
        errors,
        values,
        handleChange,
        handleSubmit
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction());
    }, [])

    return (
        <div
            style={{
                backgroundSize: "100%",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <CustomCard
                style={{ paddingTop: 150, minHeight: "100vh" }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="mt-10 ml-72 w-full container bg-white px-5 py-5">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Thông tin cá nhân" key="1" style={{ minHeight: 300 }}>
                            <form className="w-full max-w-screen-lg" onSubmitCapture={handleSubmit}>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Email
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input value={values.email || ''} onChange={handleChange} name="email" className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                            <div className="text-red-500">{errors.email}</div>
                                        </div>
                                    </div>


                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Tài khoản
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input value={values.taiKhoan || ''} className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" disabled />
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Họ và tên
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input value={values.hoTen || ''} onChange={handleChange} name="hoTen" className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                            <div className="text-red-500">{errors.hoTen}</div>
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Mật khẩu
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input value={values.matKhau || ''} type="password" onChange={handleChange} name="matKhau" className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" />
                                            <div className="text-red-500">{errors.matKhau}</div>
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Số điện thoại
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input value={values.soDT || ''} onKeyDown={(e) => {
                                                if (!((e.key >= 0 && e.key <= 9)
                                                    || (e.key === 'Backspace')
                                                    || (e.key === 'ArrowLeft')
                                                    || (e.key === 'ArrowRight')
                                                    || (e.key === 'Tab')
                                                    || (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'x' || e.key === 'v')))) {
                                                    e.preventDefault();
                                                }
                                            }} onChange={handleChange} name="soDT" className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                            <div className="text-red-500">{errors.soDT}</div>
                                        </div>
                                    </div>
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-3/4">

                                        </div>
                                        <button type="submit" className="md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </TabPane>
                        <TabPane tab="Lịch sử đặt vé" key="2" style={{ minHeight: 300 }}>
                            <div className="w-full max-w-screen-lg">
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <img src="https://picsum.photos/200" alt="123" />
                                    </div>
                                    <div className="col-span-3 grid grid-rows-2">
                                        <div className="w-1/2 grid grid-cols-3 gap-2">
                                            <div>
                                                <img src="https://picsum.photos/200" alt="123" />
                                            </div>
                                            <div className="col-span-2 grid grid-rows-2">
                                                <div>
                                                    Tên rạp
                                                </div>
                                                <div>
                                                    Địa chỉ
                                                </div>
                                            </div>

                                        </div>
                                        <div className="my-5">
                                            ngày tháng năm
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>
        </div >
    );
}

const EditUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { thongTinNguoiDung } = props;

        return {
            email: thongTinNguoiDung.email,
            taiKhoan: thongTinNguoiDung.taiKhoan,
            hoTen: thongTinNguoiDung.hoTen,
            matKhau: thongTinNguoiDung.matKhau,
            soDT: thongTinNguoiDung.soDT,
            maNhom: thongTinNguoiDung.maNhom,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung || 'KhachHang'
        }
    },
    validationSchema: Yup.object().shape({
        soDT: Yup.string().required('Phone number is required!'),
        hoTen: Yup.string().required('Full name is required!'), 
        matKhau: Yup.string().required('Password is required!'), 
        email: Yup.string().required('Email is required!').email('Email is invalid!')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(true);
        props.dispatch(capNhatThongTinNguoiDungAction(values));
    },
})(Profile);

const mapStateToProps = (state) => ({

    thongTinNguoiDung: state.QuanLyNguoiDungReducer.thongTinNguoiDung

})

export default connect(mapStateToProps)(EditUserForm);
