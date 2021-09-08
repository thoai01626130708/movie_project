import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { layDanhSachLoaiNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';


function EditUser(props) {
    const { arrUserType } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();

    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDungAction());
        // dispatch({ type: SET_SUBMIT_CREATE_USER, submitFunction: handleSubmit });
    }, [])

    return (
        <>
            <p style={{ fontSize: "25px", fontWeight: "bold", marginBottom: '50px' }}>Cập nhật người dùng</p>
            <form className="w-full max-w-screen-lg">
                <div className="grid grid-cols-2 gap-1">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-account">
                                Tài khoản
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-account" type="text" />
                        </div>
                    </div>


                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email" type="text" />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Mật khẩu
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-phone-number">
                                Số điện thoại
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-phone-number" type="text" />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Họ tên
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
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
                                <select className="block appearance-none w-full border-2 border-gray-500 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-user-type">
                                    {/* <option>New Mexico</option>
                                    <option>Missouri</option>
                                    <option>Texas</option> */}
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
                        <button className="md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Cập nhật
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

const CreateUserForm = withFormik({
    mapPropsToValues: () => ({
        name: '',
        phoneNumber: '',
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        phoneNumber: Yup.string().required('Phone number is required!'),
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').max(32, 'Password must be at most 32 characters')
    }),
    handleSubmit: ({ name, phoneNumber, email, password }, { props, setSubmitting }) => {
        setSubmitting(true);
        // props.dispatch({
        //     type: CREATE_USER_SAGA,
        //     userSignup: {
        //         email: email,
        //         passWord: password,
        //         name: name,
        //         phoneNumber: phoneNumber
        //     }
        // })
    },
    displayName: 'EditUser',
})(EditUser);


export default connect()(CreateUserForm);