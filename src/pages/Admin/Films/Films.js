import React, { Fragment, useEffect } from 'react'
import { Button, Popconfirm, Table } from 'antd';

import { Input } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
const { Search } = Input;

export default function Films() {

    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachPhimAction());

    }, [])



    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            },
            width: '10%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + ' ...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '35%'
        },
        {
            title: 'Thao tác',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return <Fragment>
                    <NavLink key={1} className=" mr-2  text-xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>

                    <Popconfirm
                        title="Bạn có chắc muốn xoá phim này?"
                        onConfirm={() => {
                            dispatch(xoaPhimAction(film.maPhim));
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <span style={{ cursor: 'pointer' }} key={2} className="text-xl" onClick={() => {
                        }}><DeleteOutlined style={{ color: 'red' }} /> </span>
                    </Popconfirm>

                    <NavLink key={3} className=" mr-2 text-xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                        localStorage.setItem('filmParams', JSON.stringify(film));
                    }}><CalendarOutlined style={{ color: 'green' }} /> </NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
    ];
    const data = arrFilmDefault;



    const onSearch = value => {
        dispatch(layDanhSachPhimAction(value));

    };

    function onChange(pagination, filters, sorter, extra) {
    }

    return (
        <div>
            <h3 className="text-4xl">Quản lý phim</h3>
            <Button shape="round" type="primary" className="mb-5 bg-red-200" onClick={() => {
                history.push('/admin/films/addnew');
            }}>Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="Search..."
                enterButton={<SearchOutlined />}
                size="large"

                onSearch={onSearch}
            />

            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </div>
    )
}
