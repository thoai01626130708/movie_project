import React from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default function Profile() {
    return (
        <div
            style={{
                backgroundSize: "100%",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <CustomCard
                style={{ paddingTop: 150, minHeight: "100vh" }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="mt-10 ml-72 w-full container bg-white px-5 py-5">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Thông tin cá nhân" key="1" style={{ minHeight: 300 }}>
                            <form className="w-full max-w-screen-lg">
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Full Name
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                        </div>
                                    </div>


                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Tài khoản
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Họ và tên
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Mật khẩu
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                                Số điện thoại
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                        </div>
                                    </div>
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-3/4">

                                        </div>
                                        <button className="md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </TabPane>
                        <TabPane tab="Lịch sử đặt vé" key="2" style={{ minHeight: 300 }}>
                            <div className="w-full max-w-screen-lg">
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <img src="https://picsum.photos/200" alt="123" />
                                    </div>
                                    <div className="col-span-3 grid grid-rows-2">
                                        <div className="w-1/2 grid grid-cols-3 gap-2">
                                            <div>
                                                <img src="https://picsum.photos/200" alt="123" />
                                            </div>
                                            <div className="col-span-2 grid grid-rows-2">
                                                <div>
                                                    Tên rạp
                                                </div>
                                                <div>
                                                    Địa chỉ
                                                </div>
                                            </div>

                                        </div>
                                        <div className="my-5">
                                            ngày tháng năm
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>
        </div >
    );
}
