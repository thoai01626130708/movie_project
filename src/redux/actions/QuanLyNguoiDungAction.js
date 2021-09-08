import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
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
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }

        } catch (error) {
            notifiFunction('error', 'Đăng nhập thất bại. Vui lòng thử lại!');
            console.log('error', error.response.data);
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

export const capNhatThongTinNguoiDungAction = (thongTinCapNhat) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatNguoiDung(thongTinCapNhat);
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Cập nhật người dùng thành công!');
                
            }
        } catch (error) {
            console.log(error.response?.data);
            notifiFunction('error', 'Cập nhật người dùng thất bại!');
        }
    }
}
