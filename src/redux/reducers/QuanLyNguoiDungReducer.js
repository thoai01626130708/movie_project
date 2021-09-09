import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_USER_EDIT } from "../actions/types/QuanLyNguoiDungType"


let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    arrUser: [],
    arrUserType: [],
    userEdit: {}
}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}
        }

        case SET_THONG_TIN_NGUOI_DUNG :{ 
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state};
        }

        case SET_DANH_SACH_NGUOI_DUNG: {
            state.arrUser = action.arrUser;
            return { ...state }
        }

        case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
            state.arrUserType = action.arrUserType;
            return { ...state }
        }

        case SET_USER_EDIT: {
            state.userEdit = action.userEdit;
            return { ...state }
        }

        default:
            return { ...state }
    }
}