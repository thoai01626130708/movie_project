import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { capNhatThongTinNguoiDungAdminAction, layDanhSachLoaiNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID, USER_TYPE_CUSTOMER } from '../../../../util/settings/config';


function EditUser(props) {
    const { arrUserType } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();

    const {
        errors,
        values,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDungAction());
    }, [dispatch])

    return (
        <>
            <p style={{ fontSize: "25px", fontWeight: "bold", marginBottom: '50px' }}>Thêm người dùng</p>
            <form className="w-full max-w-screen-lg" onSubmitCapture={handleSubmit}>
                <div className="grid grid-cols-2 gap-1">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-account">
                                Tài khoản
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input value={values.taiKhoan || ''} className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-account" type="text" disabled />
                            <div className="text-red-500">{errors.taiKhoan}</div>
                        </div>
                    </div>


                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input value={values.email || ''} name="email" onChange={handleChange} className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email" type="text" />
                            <div className="text-red-500">{errors.email}</div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Mật khẩu
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input value={values.matKhau || ''} name="matKhau" onChange={handleChange} className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" />
                            <div className="text-red-500">{errors.matKhau}</div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-phone-number">
                                Số điện thoại
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input value={values.soDt || ''} name="soDt" onChange={handleChange} className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-phone-number" type="text"
                                onKeyDown={(e) => {
                                    if (!((e.key >= 0 && e.key <= 9)
                                        || (e.key === 'Backspace')
                                        || (e.key === 'ArrowLeft')
                                        || (e.key === 'ArrowRight')
                                        || (e.key === 'Tab')
                                        || (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'x' || e.key === 'v')))) {
                                        e.preventDefault();
                                    }
                                }} />
                            <div className="text-red-500">{errors.soDt}</div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Họ tên
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input value={values.hoTen || ''} name="hoTen" onChange={handleChange} className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                            <div className="text-red-500">{errors.hoTen}</div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-user-type">
                                Loại người dùng
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <div className="relative">
                                <select value={values.maLoaiNguoiDung || ''} name="maLoaiNguoiDung" onChange={handleChange} className="block appearance-none w-full border-2 border-gray-500 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-user-type">
                                    {arrUserType.map((userType, index) => {
                                        return <option key={index} value={userType.maLoaiNguoiDung}>
                                            {userType.tenLoai}
                                        </option>
                                    })}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
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
        </>
    )
}

const EditUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userEdit } = props;

        return {
            taiKhoan: userEdit.taiKhoan,
            email: userEdit.email,
            matKhau: userEdit.matKhau,
            hoTen: userEdit.hoTen,
            soDt: userEdit.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung || USER_TYPE_CUSTOMER
        }
    },
    validationSchema: Yup.object().shape({
        taiKhoan: Yup.string().required('Vui lòng nhập tài khoản!'),
        hoTen: Yup.string().required('Vui lòng nhập họ tên!'),
        soDt: Yup.string().required('Vui lòng nhập số điện thoại!'),
        email: Yup.string().required('Vui lòng nhập email!').email('Email không hợp lệ!'),
        matKhau: Yup.string().required('Vui lòng nhập mật khẩu!')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(true);
        props.dispatch(capNhatThongTinNguoiDungAdminAction(values));
    },
    displayName: 'EditUser',
})(EditUser);

const mapStateToProps = (state) => ({

    userEdit: state.QuanLyNguoiDungReducer.userEdit

})

export default connect(mapStateToProps)(EditUserForm);
