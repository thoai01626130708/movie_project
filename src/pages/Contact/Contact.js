import React from 'react'
import '@tsamantanis/react-glassmorphism/dist/index.css'

export default function Contact(props) {


    return (
        <div className="bg-gray-200">
            <div className="mx-5 min-h-screen grid place-content-center">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl text-white p-8 text-center h-72 max-w-sm mx-auto" style={{ marginTop: '180px' }}>
                    <h1 className="text-3xl mb-3">Hi!</h1>
                    <p className="text-lg">You can contact us whenever you need help or just curious about something.</p>
                </div>
                <div className="bg-white py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
                    <h2 className="font-semibold text-2xl mb-6">Start chatting</h2>
                    <img className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src="./img/cybersoft.jpg" alt="User avatar" />
                    <p className="capitalize text-xl mt-1">CyberSoft</p>
                    <span className="flex items-center border rounded-full w-24 pr-2 justify-center mx-auto mt-2 mb-12"><div className="bg-green-400 rounded-full w-2.5 h-2.5 block mr-2" />Active</span>
                    <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline" onClick={() => window.open("https://www.facebook.com/lophocviet/", "_blank")}>Send a message</button>
                </div>
            </div>
        </div>


    )
}
