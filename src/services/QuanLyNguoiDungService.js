import { baseService } from "./baseService";
export class QuanLyNguoiDungService  extends baseService{

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
    }
    
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    capNhatNguoiDung = (thongTinCapNhat) => {
        return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinCapNhat);
    }
  
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
