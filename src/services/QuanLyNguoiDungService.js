import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";
export class QuanLyNguoiDungService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }

    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    layDanhSachNguoiDung = (tuKhoa = '') => {
        if (tuKhoa.trim() !== '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`)
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api//QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    themNguoiDung = (user) => {
        return this.post('/api/QuanLyNguoiDung/ThemNguoiDung', user);
    }

    capNhatNguoiDungAdmin = (thongTinCapNhat) => {
        return this.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinCapNhat);
    }

}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
