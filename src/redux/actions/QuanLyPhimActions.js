import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from '../../App'
import { notifiFunction } from "../../util/Notification/Notification";



export const layDanhSachPhimAction = (tenPhim = '') => {


    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            await quanLyPhimService.themPhimUploadHinh(formData);
            notifiFunction('success', 'Thêm phim thành công!');
        } catch (errors) {
            notifiFunction('success', 'Thêm phim thất bại!');
            console.log(errors.response?.data)
        }
    }
}


export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {


            await quanLyPhimService.capNhatPhimUpload(formData);
            notifiFunction('success', 'Cập nhật phim thành công!');

            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');


        } catch (errors) {
            notifiFunction('success', 'Cập nhật phim thất bại!');
            console.log(errors.response?.data)
        }
    }
}



export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layThongTinPhim(maPhim);



            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content

            })

        } catch (errors) {
            console.log('errors', errors)
        }
    };
}



export const xoaPhimAction = (maPhim) => {


    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            await quanLyPhimService.xoaPhim(maPhim);
            notifiFunction('success', 'Xoá phim thành công!');
            //Sau khi xoá load lại danh sách phim mới;
            dispatch(layDanhSachPhimAction())



        } catch (errors) {
            notifiFunction('error', 'Xoá phim thất bại!')
            console.log(errors.response?.data)
        }
    }
}