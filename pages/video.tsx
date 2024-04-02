import {Button, Card, Flex} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import 'react-h5-audio-player/lib/styles.css';
import type { Metadata } from 'next'
import Head from "next/head";

interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}


export const metadata: Metadata = {
  title: 'موزیک ویدئو - شهرام عبدلی',
  description: 'جدید ترین موزیک ویدئو های شهرام عبدلی',
}

export default function Videos({ data } : any) {
    return (
        <>
            <Head>
                  <link rel="icon" href="/favicon.ico"/>
                  <title>موزیک ویدئو - شهرام عبدلی</title>
                  <meta name="description"
                        content={'موزیک ویدئو های شهرام عبدلی'}/>
                  <meta property="og:title" content={'موزیک ویدئو - شهرام عبدلی'}/>
                  <meta property="og:url" content={'https://digitkey.ir/video'}/>
            </Head>
            <Flex  justify={'center'} align={'center'} gap={35} wrap="wrap">
                {data.map((value: Type , i: number) => (
                    <div key={`div${i}`}>
                        {value.video ?
                            <Card
                            key={i}
                            className='!bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-5 shadow-2xl'
                            cover={
                                <video className='rounded' poster={value.pic} aria-label={value.name} key={`video${i}`}  width={300} height={250}
                                       controls preload={'none'}>
                                    <source src={value.video} type="video/mp4"/>
                                    مرورگر شما این قابلیت را پشتیبانی نمیکند
                                </video>
                            }
                            actions={[
                                <Button htmlType={"button"} type='link' download target='_parent' block key={`videodownload${i}`}
                                        href={value.video}><DownloadOutlined/></Button>,
                            ]}
                        >
                            <Flex vertical align='center' justify='center'>
                                <h2>{value.name}</h2>
                                <p>{value.description}</p>
                            </Flex>
                        </Card>
                  : null}</div>
                ))}
            </Flex>
        </>
    )
}


export async function getStaticProps() {
    const res = await fetch(`https://inventory.digitkey.ir/music/`)
    const data = await res.json()
    return {
        props: {data},
        revalidate: 3600
    }
}