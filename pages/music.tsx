import {Button, Card, Flex} from "antd";
import {
    DownloadOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import Image from "next/image";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import type { Metadata } from 'next'
import Head from "next/head";
const { Meta } = Card;

interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}


export const metadata: Metadata = {
  title: 'آهنگ های شهرام عبدلی',
  description: 'جدید ترین آهنگ های شهرام عبدلی',
}

export default function Music({ data } : any) {
    return (
        <>
             <Head>
                  <link rel="icon" href="/favicon.ico"/>
                  <title>آهنگ - شهرام عبدلی</title>
                  <meta name="description"
                        content={'آهنگ های شهرام عبدلی'}/>
                  <meta property="og:title" content={'آهنگ - شهرام عبدلی'}/>
                  <meta property="og:url" content={'https://digitkey.ir/music'}/>
             </Head>
            <Flex  justify={'center'} align={'center'} gap={35} wrap="wrap">
                {data.map((value: Type , i: number) => (
                    <Card
                        key={i}
                        className='!bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-5 shadow-2xl'
                        cover={
                            <Image
                                width={0}
                                height={0}
                                priority
                                sizes="100vw"
                                className='w-[500px] h-[250px]'
                                src={value.pic}
                                alt={value.pic}
                            />
                        }
                        actions={[
                            <Button  htmlType={"button"} type='link' target='_parent' block key={`musicdownload${i}`} href={value.music}><DownloadOutlined/></Button>,
                            <Button htmlType={"button"} type='link' disabled={!value.video} target='_parent' block key={`videodownload${i}`} href={value.video}><VideoCameraOutlined /></Button>,
                        ]}
                    >
                        <Meta
                          key={`meta${i}`}
                          className='!hidden'
                          title={value.name}
                          description={value.description}
                        />
                        <div key={`player${i}`} style={{direction: 'ltr'}}>
                            <AudioPlayer
                                className='!border-none !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-10 '
                                customVolumeControls={[]}
                                key={`player${i}`}
                                customAdditionalControls={[]}
                                preload={"none"}
                                showJumpControls={false}
                                header={<h2 key={`headermusic${i}`} className='text-center'>{value.name}</h2>}
                                footer={<h4  key={`footermusic${i}`} className='text-center'>{value.description}</h4>}
                                src={value.music}
                            />
                        </div>
                    </Card>
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