import {Button, Card, Flex} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import 'react-h5-audio-player/lib/styles.css';
import Head from "next/head";
import React from "react";

interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}




export default function Videos({ data } : any) {
    const schemaBreadcrumb = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "main",
          "item": `${process.env.APP_URL}`
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "video",
          "item": `${process.env.APP_URL}/video`
        }]
      }

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/video`}/>
                <title>موزیک ویدئو - شهرام عبدلی</title>
                <meta name="keywords"
                      content="موزیک ویدئو شهرام عبدلی, خواننده شهرام عبدلی, موزیک ویدئوهای شهرام عبدلی"/>
                <meta name="description"
                      content={'موزیک ویدئو های شهرام عبدلی'}/>
                <meta property="og:title" content={'موزیک ویدئو - شهرام عبدلی'}/>
                <meta property="og:url" content={`${process.env.APP_URL}/video`}/>
            </Head>
            <Flex justify={'center'} align={'center'} gap={35} wrap="wrap">
                {data.map((value: Type, i: number) => (
                    <div key={`div${i}`}>
                        {value.video ?
                            <Card
                            key={i}
                            className='!bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-5 shadow-2xl'
                            cover={
                                <video className='rounded' poster={`assets/pic/${value.name}.jpeg`} aria-label={value.name} key={`video${i}`}  width={300} height={250}
                                       controls preload={'metadata'}>
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
    const res = await fetch(`${process.env.API}/music/`)
    const data = await res.json()
    return {
        props: {data},
        revalidate: 3600
    }
}