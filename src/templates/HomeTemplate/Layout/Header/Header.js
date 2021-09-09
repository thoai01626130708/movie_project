import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';
import { Select } from 'antd';

//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { CONTACT, HELLO, HOME, LOG_OUT, SIGN_IN, SIGN_UP, TOKEN, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;


export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { t, i18n } = useTranslation();


    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }


    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50 text-lg">{t(SIGN_IN)}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50 text-lg">{t(SIGN_UP)}</button>

            </Fragment>
        }


        return <Fragment> <button onClick={() => { history.push('/profile') }} className="self-center px-8 py-3 text-lg">
            {t(HELLO)}<span className="ml-1 mr-1 text-lg font-bold">{userLogin.taiKhoan}</span>!</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className="text-yellow-500 mr-5 text-lg">{t(LOG_OUT)}</button>
        </Fragment>
    }
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10" >
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white text-lg" activeClassName="border-b-2 border-white">{t(HOME)}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white text-lg" activeClassName="border-b-2 border-white">{t(CONTACT)}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/admin" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white text-lg" activeClassName="border-b-2 border-white">Admin</NavLink>
                    </li>

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">EN</Option>
                        <Option value="vi">VI</Option>
                    </Select>

                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
