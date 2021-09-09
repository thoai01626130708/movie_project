import { DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../App';
import { NavLink } from 'react-router-dom';
import { SET_USER_EDIT } from '../../../redux/actions/types/QuanLyNguoiDungType';

export default function Users() {
    const { arrUser } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());

    }, [])

    const onSearch = (value) => {
        dispatch(layDanhSachNguoiDungAction(value));
    }

    const renderSearchBox = () => {
        const { Search } = Input;

        return <div className="mt-3 mb-3">
            <Search placeholder="Search..." allowClear enterButton={<SearchOutlined />} size="large" onSearch={onSearch} />
        </div>
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            sorter: (item2, item1) => {
                let taiKhoan1 = item1.taiKhoan?.trim().toLowerCase();
                let taiKhoan2 = item2.taiKhoan?.trim().toLowerCase();
                if (taiKhoan1 < taiKhoan2) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            key: 'matKhau',
            sorter: (item2, item1) => {
                let matKhau1 = item1.matKhau?.trim().toLowerCase();
                let matKhau2 = item2.matKhau?.trim().toLowerCase();
                if (matKhau1 < matKhau2) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            sorter: (item2, item1) => {
                let hoTen1 = item1.hoTen?.trim().toLowerCase();
                let hoTen2 = item2.hoTen?.trim().toLowerCase();
                if (hoTen1 < hoTen2) {
                    return -1;
                }
                return 1;
            },
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase();
                if (email1 < email2) {
                    return -1;
                }
                return 1;
            },
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            key: 'soDt',
            sorter: (item2, item1) => {
                let soDt1 = item1.soDt;
                let soDt2 = item2.soDt;
                if (soDt1 < soDt2) {
                    return -1;
                }
                return 1;
            },
        },

        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            sorter: (item2, item1) => {
                let maLoaiNguoiDungt1 = item1.maLoaiNguoiDung;
                let maLoaiNguoiDung2 = item2.maLoaiNguoiDung;
                if (maLoaiNguoiDungt1 < maLoaiNguoiDung2) {
                    return -1;
                }
                return 1;
            },
        },

        {
            title: 'Thao tác',
            dataIndex: '',
            key: 'x',
            render: (text, user) => {
                return <div className="md:flex">
                    <div className=" mr-2 text-xl cursor-pointer" onClick={() => {
                        dispatch({
                            type: SET_USER_EDIT,
                            userEdit: user
                        });
                        history.push(`/admin/users/edit/${user.taiKhoan}`)
                    }} ><EditOutlined style={{ color: 'blue' }} /> </div>
                    <Popconfirm
                        title="Bạn có chắc muốn xoá người dùng này?"
                        onConfirm={() => {
                            dispatch(xoaNguoiDungAction(user.taiKhoan));
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="mr-2 text-xl">
                            <DeleteOutlined style={{ color: 'red' }} />
                        </button>
                    </Popconfirm>

                </div>
            },
        }
    ];

    return (
        <div className="container-fluid m-5">
            <h3 className="text-4xl">Quản lý người dùng</h3>
            <Button shape="round" type="primary" icon={<UserAddOutlined />}
                onClick={() => {
                    history.push('/admin/users/addnew');
                }}>Thêm người dùng</Button>
            {renderSearchBox()}
            <Table columns={columns} rowKey={"id"} dataSource={arrUser} onChange={() => { }} />
        </div>
    )
}
