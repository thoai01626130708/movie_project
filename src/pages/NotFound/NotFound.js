import React from 'react'
import { Result, Button } from 'antd';
import { history } from "../../App";

export default function NotFound() {
    return (
        <Result style={{paddingTop: '150px'}}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => { history.push('/home'); }}>Back Home</Button>}
        />
    )
}