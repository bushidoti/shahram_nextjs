import React from 'react';
import { Button, Result } from 'antd';
import {useRouter} from "next/router";
const Custom404 = () => {
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

export default Custom404;