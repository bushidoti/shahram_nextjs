import {Avatar, Flex} from "antd";
import Image from "next/image";
import {UserOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {Context} from "@/components/context";
import Link from "next/link";
import Head from "next/head";
import {AppleIcon, InstaIcon, ShazamIcon, SpotIcon, YoutubeIcon} from "@/components/icons";

export default function Bio({ data } : any) {

    const context = useContext(Context)
    const schemaBreadcrumb = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "main",
          "item": "https://www.shahramabdoli.ir"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "bio",
          "item": "https://www.shahramabdoli.ir/bio"
        }]
      }

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href="https://www.shahramabdoli.ir/bio"/>
                <title>بیوگرافی شهرام عبدلی</title>
                <meta name="keywords"
                      content="خواننده شهرام عبدلی, بیو گرافی شهرام عبدلی"/>
                <meta name="description"
                      content={data[0]?.bio}/>
                <meta property="og:image" content={'/assets/pic/avatar.jpeg'}/>
                <meta property="og:title" content={'بیوگرافی - شهرام عبدلی'}/>
                <meta property="og:url" content={'https://www.shahramabdoli.ir/bio'}/>
            </Head>
            <Flex vertical gap={100}>
                <h1 hidden>بیوگرافی</h1>
                <Flex wrap={'wrap'} gap={10} align={context.breakP ? "center" : ""} justify={context.breakP ? "center" : ""}>
                   <Avatar src={<Image className='object-top w-full' sizes='250px' priority width={1254}
                    height={1254} src={'/assets/pic/bio.jpeg'} alt={'bio'}/>} shape="square" size={200} icon={<UserOutlined/>}/>
                    <Flex vertical justify={'flex-end'} gap={10}>
                        <h2 hidden>شهرام عبدلی</h2>
                        <p>تاریخ تولد : ۵ دی‌ماه ۱۳۵۳ </p>
                        <p>محل تولد : میانه </p>
                        <label className='text-center mb-2'>لینک های شبکه های اجتماعی : </label>
                        <Flex wrap={"wrap"}  gap={10} className='w-full'>
                            {data[0]?.insta ?  <Link
                              rel='noopener' target='_blank' href={data[0]?.insta}><InstaIcon/></Link> : null}
                            {data[0]?.apple ? <Link
                              rel='noopener' target='_blank' href={data[0]?.apple}><AppleIcon/></Link> : null}
                            {data[0]?.spotify ? <Link
                              rel='noopener' target='_blank' href={data[0]?.spotify}><SpotIcon/></Link> : null}
                            {data[0]?.youtube ? <Link
                              rel='noopener' target='_blank' href={data[0]?.youtube || '#'}><YoutubeIcon/></Link> : null}
                            {data[0]?.shazam ? <Link
                              rel='noopener' target='_blank' href={data[0]?.shazam || '#'}><ShazamIcon/></Link> : null}
                        </Flex>
                    </Flex>
                </Flex>
                   <pre className="text-wrap italic antialiased text-lg">
                       {data[0]?.bio}
                   </pre>
            </Flex>
        </>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.API}/panel/`)
    const data = await res.json()
    return {
        props: {data},
        revalidate: 3600
    }
}
