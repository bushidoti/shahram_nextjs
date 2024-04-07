import {Button, Card, Flex} from "antd";
import {
    DownloadOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import Image from "next/image";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import type { Metadata } from 'next'
import Head from "next/head";
import React from "react";
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
    const schemaBreadcrumb = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "main",
          "item": "https://www.shahram-abdoli.ir"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "music",
          "item": "https://www.shahram-abdoli.ir/music"
        }]
      }

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa-IR" href="https://www.shahram-abdoli.ir/music"/>
                <title>آهنگ - شهرام عبدلی</title>
                <meta name="keywords"
                      content="آهنگ شهرام عبدلی, خواننده شهرام عبدلی, music shahram abdoli, music, آهنگ, شهرام عبدلی"/>
                <meta name="description"
                      content={'آهنگ های شهرام عبدلی'}/>
                <meta property="og:title" content={'آهنگ - شهرام عبدلی'}/>
                <meta property="og:url" content={'https://www.shahram-abdoli.ir/music'}/>
            </Head>
            <Flex justify={'center'} align={'center'} gap={35} wrap="wrap">
                {data.map((value: Type, i: number) => (
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
                            <Button  htmlType={"button"} type='link' target='_parent' download block key={`musicdownload${i}`} href={value.music}><DownloadOutlined/></Button>,
                            <Button htmlType={"button"} type='link' disabled={!value.video} download target='_parent' block key={`videodownload${i}`} href={value.video}><VideoCameraOutlined /></Button>,
                        ]}
                    >
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