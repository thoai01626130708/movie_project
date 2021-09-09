import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'
import { notifiFunction } from "../../util/Notification/Notification";



export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });

                history.goBack();
            }
            else {
                notifiFunction('error', 'Đăng nhập thất bại. Vui lòng thử lại!');
            }

        } catch (error) {
            notifiFunction('error', 'Đăng nhập thất bại. Vui lòng thử lại!');
            console.log(error.response?.data);
        }
    }
}


export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);


            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Đăng ký thành công. Vui lòng đăng nhập để sử dụng!');
                history.push('/login');
            }
            else {
                notifiFunction('error', 'Đăng ký thất bại. Vui lòng thử lại!');
            }

        } catch (error) {
            notifiFunction('error', 'Đăng ký thất bại. Vui lòng thử lại!');
            console.log(error.response?.data);
        }
    }
}




export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const layDanhSachNguoiDungAction = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);

            if (result.data.statusCode === 200) {
                const arrUserWithIndex = result.data.content.map((user, index) => {
                    return { ...user, id: index };
                })

                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    arrUser: arrUserWithIndex
                })
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    };
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            notifiFunction('success', 'Xoá người dùng thành công!');
            dispatch(layDanhSachNguoiDungAction())
        } catch (errors) {
            notifiFunction('error', 'Xoá người dùng thất bại!')
            console.log(errors.response?.data)
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
                    arrUserType: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const themNguoiDungAction = (user) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(user);

            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Thêm người dùng thành công!');

                dispatch(layDanhSachNguoiDungAction());
                history.push('/admin/users');
            }

        } catch (errors) {
            notifiFunction('error', 'Thêm người dùng thất bại!');
            console.log(errors.response?.data)
        }
    }
}

export const capNhatThongTinNguoiDungAdminAction = (thongTinCapNhat) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatNguoiDungAdmin(thongTinCapNhat);
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Cập nhật người dùng thành công!');

                dispatch(layDanhSachNguoiDungAction());
                history.push('/admin/users');
            }
        } catch (error) {
            notifiFunction('error', 'Cập nhật người dùng thất bại!');
            console.log(error.response?.data);
        }
    }
}