import React from 'react';
import { Button, Result } from 'antd';
import {useRouter} from "next/router";
export default function () {
    const router = useRouter()

    return (
        <Result
            status="404"
            title="404"
            subTitle="متاسفانه صفحه مورد نظر یافت نشد."
            extra={<Button type="primary" onClick={() => {
                router.push("/")
            }}>برگشت صفحه اصلی</Button>}
          />
    )
}
