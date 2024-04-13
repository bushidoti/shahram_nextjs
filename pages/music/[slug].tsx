import type {
  InferGetStaticPropsType,
} from 'next'
import {Button, Flex} from "antd";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import Image from "next/image";
import React, {useContext} from "react";
import {Context} from "@/components/context";
import {DownloadOutlined} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import {AppleIcon, ShazamIcon, SpotIcon, YoutubeIcon} from "@/components/icons";




export async function getStaticPaths() {
  const res = await fetch(`${process.env.API}/music/`)
  const musics = await res.json()
  const paths = musics.map((post: { name: string; }) => ({
    params: { slug: post.name.toLowerCase() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params } : any) {
  const res = await fetch(`${process.env.API}/music/?name=${params.slug}`)
  const music = await res.json()
  return { props: { music } }
}

export default function Page({
  music,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const context = useContext(Context)
  const title = ` آهنگ ${music[0].name}`
  const schemaVideo = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": music[0].name,
      "uploadDate": music[0].release,
      "description": music[0].description,
      "thumbnailUrl": music[0].video,
      "contentUrl": music[0].video
    }
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
          "name": "music",
          "item": `${process.env.APP_URL}/music`
        },{
          "@type": "ListItem",
          "position": 3,
          "name": music[0].name,
          "item": `${process.env.APP_URL}/music/${music[0].name}`
        }]
      }
  return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico"/>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{__html: JSON.stringify(schemaVideo)}}
          />
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
          />
          <title>{title}</title>
          <link rel="alternate" hrefLang="fa-IR" href={`${process.env.APP_URL}/music/${music[0].name}`}/>
          <meta property='og:video' content={music[0].video}/>
          <meta name="keywords"
                content={`آهنگ ${music[0].name}, اهنگ شهرام عبدلی ${music[0].name}, خواننده شهرام عبدلی, اهنگ شهرام عبدلی, ${music[0].name}, شهرام عبدلی ${music[0].name}, شهرام عبدلی, عبدلی, shahram abdoli, آهنگ شهرام عبدلی`}/>
          <meta name="description"
                content={music[0].description}/>
          <meta property="og:title" content={`آهنگ - ${music[0].name}`}/>
          <meta property="og:url" content={`${process.env.APP_URL}/music/${music[0].name}`}/>
        </Head>
        {context.breakP ?
            <>
                <h1 className='text-center mb-2'>{music[0].name}</h1>
                <Flex gap={10} justify={"center"} wrap="wrap" align={"center"}>
                    <Flex className='w-full' gap={20} wrap='wrap' justify={"center"} align={"center"}>
                        {music[0].video ?
                            <div className='w-[300px]'>
                                <main>
                                    <video className='rounded w-full h-full' poster={music[0].pic}
                                           aria-label={music[0].name}
                                           width={250} height={250}
                                           controls preload={'metadata'}>
                                        <source src={music[0].video} type="video/mp4"/>
                                        مرورگر شما این قابلیت را پشتیبانی نمیکند
                                    </video>
                                </main>
                            </div>
                            :
                            <Image
                                width={0}
                                height={0}
                                priority
                                sizes="100vw"
                                className='w-[250px] h-full rounded'
                                src={music[0].pic}
                                alt={music[0].pic}
                            />
                        }

                        <Flex vertical justify={'space-between'} align={'flex-start'}>
                            <Flex gap={10}>
                                <div>
                                    <label className='text-center mb-2'>دانلود mp3 : </label>
                                    <Button download htmlType={"button"} type='primary' target='_self'
                                            href={music[0].music}><DownloadOutlined/></Button>
                                </div>
                                <div>
                                    <label className='text-center mb-2'>دانلود موزیک ویدئو : </label>
                                    <Button download htmlType={"button"} type='primary' target='_self'
                                            href={music[0].video}><DownloadOutlined/></Button>
                                </div>
                            </Flex>
                        </Flex>
                        <h3 className='text-center mb-2 flex gap-1'>سال انتشار : <p>{music[0].release}</p></h3>
                        <Flex gap={10} justify={"center"} align={"center"}>
                            {music[0].apple || music[0].spotify ?
                                <label className='text-center mb-2'>لینک ها : </label>
                                : null}
                            {
                                music[0].apple ?
                                    <Link rel='noopener' target='_blank' href={music[0].apple}><AppleIcon/></Link>
                                    : null
                            }{
                            music[0].spotify ?
                                <Link rel='noopener' target='_blank' href={music[0].spotify}><SpotIcon/></Link>
                                : null
                        }{
                            music[0].youtube ?
                                <Link target='_blank' href={music[0].youtube}><YoutubeIcon/></Link>
                                : null
                        }{
                            music[0].shazam ?
                                <Link target='_blank' href={music[0].shazam}><ShazamIcon/></Link>
                                : null
                        }
                        </Flex>
                    </Flex>
                    <div className='w-full' style={{direction: 'ltr'}}>
                        <AudioPlayer
                            layout="horizontal"
                            customVolumeControls={[]}
                            className='!border-none !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-10'
                            key={`player`}
                            preload={"none"}
                            showJumpControls={false}
                            src={music[0].music}
                        />
                    </div>
                </Flex>
            </>
            :

            <>
                <Flex gap={10} justify={"center"} align={"center"} vertical>
                    <Flex className='w-full' gap={20}>
                        {music[0].video ?
                            <div className='w-[300px]'>
                                <video className='rounded w-full h-full' poster={music[0].pic}
                                       aria-label={music[0].name}
                                       width={250} height={250}
                                       controls preload={'metadata'}>
                                    <source src={music[0].video} type="video/mp4"/>
                                    مرورگر شما این قابلیت را پشتیبانی نمیکند
                                </video>
                            </div>
                            :
                            <Image
                                width={0}
                                height={0}
                                priority
                                sizes="100vw"
                                className='w-[250px] h-full rounded'
                                src={music[0].pic}
                                alt={music[0].pic}
                            />
                        }

                        <Flex vertical justify={'space-between'} align={'flex-start'}>
                            <h1 className='text-center mb-2'>{music[0].name}</h1>
                            <h3 className='text-center mb-2 flex gap-1'>سال انتشار : <p>{music[0].release}</p></h3>
                            <Flex gap={10} justify={"center"} align={"center"}>
                                {music[0].apple || music[0].spotify ?
                                    <label className='text-center mb-2'>لینک ها : </label>
                                    : null}
                                {
                                    music[0].apple ?
                                        <Link target='_blank' href={music[0].apple}><AppleIcon/></Link>
                                        : null
                                }{
                                music[0].spotify ?
                                    <Link target='_blank' href={music[0].spotify}><SpotIcon/></Link>
                                    : null
                            }{
                                music[0].youtube ?
                                    <Link target='_blank' href={music[0].youtube}><YoutubeIcon/></Link>
                                    : null
                            }{
                                music[0].shazam ?
                                    <Link target='_blank' href={music[0].shazam}><ShazamIcon/></Link>
                                    : null
                            }
                            </Flex>
                            <Flex gap={10}>
                                <div>
                                    <label className='text-center mb-2'>دانلود mp3 : </label>
                                    <Button htmlType={"button"} type='primary' target='_self'
                                            href={music[0].music}><DownloadOutlined/></Button>
                                </div>
                                <div>
                                    <label className='text-center mb-2'>دانلود موزیک ویدئو : </label>
                                    <Button htmlType={"button"} type='primary' target='_self'
                                            href={music[0].video}><DownloadOutlined/></Button>
                                </div>
                            </Flex>
                        </Flex>
                    </Flex>
                    <div className='w-full' style={{direction: 'ltr'}}>
                        <AudioPlayer
                            layout="horizontal"
                            customVolumeControls={[]}
                            className='!border-none !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-10'
                            key={`player`}
                            preload={"none"}
                            showJumpControls={false}
                            src={music[0].music}
                        />
                    </div>
                </Flex>
            </>
        }

      </>
  )
}