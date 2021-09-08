import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";
export class QuanLyNguoiDungService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
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
    
    capNhatNguoiDung = (thongTinCapNhat) => {
        return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinCapNhat);
    }

}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
