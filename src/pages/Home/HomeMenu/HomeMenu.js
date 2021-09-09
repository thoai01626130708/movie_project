import React, { Fragment } from 'react';
import { Button, Tabs } from 'antd';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;

export default class Demo extends React.PureComponent {


    state = {
        tabPosition: 'left',
    };

    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };
    componentDidMount() {

    }

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            let { tabPosition } = this.state;
            return <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width="50" alt={heThongRap.logo} />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div style={{ width: '400px', display: 'flex' }} >
                                <img src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" alt="ddc-dong-da-15379624326697.jpg" /> <br />
                                <div className="text-left ml-2" style={{ fontSize: "15px", fontWeight: "bold" }}>
                                    {cumRap.tenCumRap}
                                </div>
                            </div>
                        }
                            key={index}>
                            {/*Load phim tương ứng */}
                            {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="my-5" >
                                        <div style={{ display: 'flex' }}>
                                            <img style={{ height: 75, width: 75 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />

                                            <div className="ml-2">
                                                <h4 className="text-2xl text-green-700">{phim.tenPhim}</h4>
                                                <p>{cumRap.diaChi}</p>
                                                <div className="grid grid-cols-6 gap-6">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink style={{ fontSize: "18px" }} className="text-2xl text-green-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}


                        </TabPane>

                    })}
                </Tabs>
            </TabPane>
        })
    }

    render() {

        const { tabPosition } = this.state;
        return (
            <>

                <Tabs tabPosition={tabPosition}>
                    {this.renderHeThongRap()}
                </Tabs>
            </>
        );
    }
}

