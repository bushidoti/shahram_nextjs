import {Button, Card, Flex} from "antd";
import {
    DownloadOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
import 'react-h5-audio-player/lib/styles.css';
import type { Metadata } from 'next'

interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}


export const metadata: Metadata = {
  title: 'موزیک ویدئو های شهرام عبدلی',
  description: 'جدید ترین موزیک ویدئو های شهرام عبدلی',
}

export default function Videos({ data } : any) {
    return (
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
                            <Button htmlType={"button"} type='link' target='_parent' block key={`videodownload${i}`}
                                    href={value.video}><DownloadOutlined/></Button>,
                        ]}
                    >
                        <Meta
                            className='text-center p-2 font-bold'
                            key={`meta${i}`}
                            title={value.name}
                            description={value.description}
                        />
                    </Card>
              : null}</div>
            ))}
        </Flex>
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