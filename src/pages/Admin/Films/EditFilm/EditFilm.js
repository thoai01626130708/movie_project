import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';

const EditFilm = (props) => {

  const [componentSize, setComponentSize] = useState('default');
  const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      maNhom: GROUPID,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      hinhAnh: null
    },

    onSubmit: (values) => {
      values.maNhom = GROUPID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key === 'ngayKhoiChieu') {
          formData.append(key, moment(values[key]).format('DD/MM/YYYY'));
        } else if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append('File', values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //Cập nhật phim upload hình
      dispatch(capNhatPhimUploadAction(formData));

    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    }
  }

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      //Đem dữ liệu file lưu vào formik
      await formik.setFieldValue('hinhAnh', file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);//Hình base 64
      }

    }
  }


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <>

      <Form {...layout}
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <p style={{ fontSize: "25px", fontWeight: "bold" }}>Cập nhật phim</p>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker allowClear={false} onChange={handleChangeDatePicker} format="DD/MM/YYYY" value={moment(formik.values.ngayKhoiChieu)} />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch name="hot" onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
        </Form.Item>


        <Form.Item label="Số sao">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img width={100} height={100} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt={thongTinPhim.hinhAnh} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <button type="submit" className="bg-blue-500 text-white pt-2 pb-2 pl-3 pr-3">Cập nhật</button>
        </Form.Item>
      </Form>
    </>
  );
};



export default EditFilm;



