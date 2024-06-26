import {AutoComplete, Card, Carousel, Flex} from 'antd';
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useRouter } from 'next/router'
import AudioPlayer from "react-h5-audio-player";
import React, {useState} from "react";
import 'react-h5-audio-player/lib/styles.css';
import path from 'path'
import { writeFile } from "fs/promises";


interface Type {
    music : string,
    pic : string,
    carousel1 : string,
    carousel2 : string,
    carousel3 : string,
    video : string,
    name : string,
    description : string,
}

const { Search } = Input;


export default function Home({ dataMusic } : any) {
    const router = useRouter()
    const [playIndex , setPlayIndex] = useState<number>(0)

    function handleClickPrevious () {
        setPlayIndex(prevState => prevState === 0 ? dataMusic.length - 1 : prevState - 1)
    }

     function handleClickNext () {
        setPlayIndex(prevState => prevState < dataMusic.length - 1 ? prevState + 1 : 0)
    }

  const schemaPerson = {
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": "شهرام عبدلی",
      "url": `${process.env.APP_URL}`,
      "image": "/assets/pic/avatar.jpeg",
      "sameAs": [
        "https://www.instagram.com/shahramabdoliofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        "https://www.youtube.com/@shahramabdoli"
      ],
      "jobTitle": "Singer"
    }

    const onSearch: SearchProps['onSearch'] = (value, _e) =>
        router.push(`music/${dataMusic.map((item : {name : string}) => ({value: item.name.toLowerCase()}))
            .filter( (page:any) => page['value'].includes(value.toLowerCase()))[0].value}`);

    return (
        <>
            <h1 hidden={true}>شهرام عبدلی</h1>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaPerson)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/`}/>
                <title>خواننده شهرام عبدلی</title>
                <meta name="keywords"
                      content="شهرام عبدلی, خواننده شهرام عبدلی, آهنگ شهرام عبدلی,موسیقی شهرام عبدلی"/>
                <meta name="description"
                      content={'سایت شخصی خواننده شهرام عبدلی منبع رسمی انتشار موزیک ها و موزیک ویدئو ها'}/>
                <meta property="og:title" content={'خواننده شهرام عبدلی | Shahram Abdoli'}/>
                <meta property="og:url" content={`${process.env.APP_URL}`}/>
                <meta property="og:image" content={'/assets/pic/avatar.jpeg'}/>
            </Head>
            <Flex gap={20} vertical>
                <Flex wrap={"wrap"} gap={40} align={"center"} justify={"center"}>
                    <Flex vertical align={"center"} justify={"center"}>
                        <AutoComplete
                            options={dataMusic.map((item: { name: string }) => ({value: item.name}))}
                            className="!mb-4"
                            filterOption={(inputValue: string, option: any) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        >
                            <Search className="lg:!w-[40vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]"
                                    placeholder="جستجو آهنگ ...." onSearch={onSearch}/>
                        </AutoComplete>
                        <Carousel dots={false} autoplaySpeed={5000}
                                  className={'lg:!w-[40vw]  md:w-[40vw] sm:w-[40vw] mobile:w-[80vw] w-[60vw]'} autoplay
                                  effect="fade">
                            <Image
                                className={`rounded  mobile:h-[300px] lg:h-[50vh] sm:h-[50vh] md:h-[50vh]`}
                                sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                placeholder="blur"
                                blurDataURL={'/assets/pic/carousel1.jpeg'}
                                width={150}
                                loading={"eager"}
                                height={150}
                                src={'/assets/pic/carousel1.jpeg'}
                                alt={'/assets/pic/carousel1.jpeg'}
                            />
                            <Image
                                className={`rounded  mobile:h-[300px] lg:h-[50vh] sm:h-[50vh] md:h-[50vh]`}
                                sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                placeholder="blur"
                                blurDataURL={'/assets/pic/carousel2.jpeg'}
                                width={150}
                                loading={"eager"}
                                height={150}
                                src={'/assets/pic/carousel2.jpeg'}
                                alt={'/assets/pic/carousel2.jpeg'}
                            />
                            <Image
                                className={`rounded  mobile:h-[300px] lg:h-[50vh] sm:h-[50vh] md:h-[50vh]`}
                                sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                placeholder="blur"
                                blurDataURL={'/assets/pic/carousel3.jpeg'}
                                width={150}
                                loading={"eager"}
                                height={150}
                                src={'/assets/pic/carousel3.jpeg'}
                                alt={'/assets/pic/carousel3.jpeg'}
                            />
                        </Carousel>
                    </Flex>
                    <Flex vertical align={"center"} justify={"center"} gap={20}>
                        <h2><strong>لیست پخش</strong></h2>
                        <Card
                            className='!bg-white  !bg-clip-padding !backdrop-filter
                        !backdrop-blur-sm !bg-opacity-5 shadow-2xl
                         lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                            cover={
                                <Image
                                    src={`/assets/pic/${dataMusic[playIndex].name}.jpeg`}
                                    alt={dataMusic[playIndex].name}
                                    placeholder="blur"
                                    blurDataURL={`/assets/pic/${dataMusic[playIndex].name}.jpeg`}
                                    width={150}
                                    loading={"eager"}
                                    height={150}
                                    sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 350px"
                                    className='w-[300px] h-[300px]'
                                />
                            }
                        >
                            <div style={{direction: 'ltr'}}>
                                <AudioPlayer
                                    className=' !border-none !bg-white !bg-clip-padding
                                 !backdrop-filter !backdrop-blur-sm !bg-opacity-10 '
                                    onEnded={handleClickNext}
                                    autoPlayAfterSrcChange={true}
                                    showSkipControls={true}
                                    preload={"metadata"}
                                    customVolumeControls={[]}
                                    header={<h2 className='text-center'>{dataMusic[playIndex].name}</h2>}
                                    showJumpControls={false}
                                    src={`/assets/music/${dataMusic[playIndex].name}.mp3`}
                                    onClickPrevious={handleClickPrevious}
                                    onClickNext={handleClickNext}
                                />
                            </div>
                        </Card>
                    </Flex>

                </Flex>
                <h2 className='my-2'>موزیک های اخیر</h2>
                <div className='overflow-auto'>
                    <Flex gap={20}>
                        {dataMusic.slice(0).reverse().map((value: Type, i: number) => (
                            <Link rel='canonical' key={`Link${i}`} href={`/music/${value.name.toLowerCase()}`}>
                                <Image
                                    key={`image${i}`}
                                    loading={"eager"}
                                    className='object-cover rounded w-[250px] h-[250px]'
                                    width={150}
                                    height={150}
                                    sizes="(max-width: 360px) 100px, (max-width: 576px) 100px, 150px"
                                    placeholder="blur"
                                    blurDataURL={`/assets/pic/${value.name}.jpeg`}
                                    src={`/assets/pic/${value.name}.jpeg`}
                                    alt={value.name}
                                />
                            </Link>
                        ))}
                    </Flex>
                </div>
            </Flex>
        </>
    )
}

export async function getStaticProps() {
    const music = await fetch(`${process.env.API}/music/`)
    const panel = await fetch(`${process.env.API}/panel/`)
    const dataMusic = await music.json()
    const dataPanel = await panel.json()

    dataMusic.map(async (value: any) => {
        let file = await fetch(value.pic)
        let fileBuf = Buffer.from(await file.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/" + value.name + '.' + 'jpeg'),
            fileBuf
        );
    })



    dataMusic.map(async (value: any) => {
        let file = await fetch(value.music)
        let fileBuf = Buffer.from(await file.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/music/" + value.name + '.' + 'mp3'),
            fileBuf
        );
    })

    let fileProfile = await fetch(dataPanel[0].pic)
    let fileProfileBuf = Buffer.from(await fileProfile.arrayBuffer())
    await writeFile(
        path.join(process.cwd(), "public/assets/pic/avatar.jpeg"),
        fileProfileBuf
    );

    let fileBioPic = await fetch(dataPanel[0].biopic)
    let fileBioPicBuf = Buffer.from(await fileBioPic.arrayBuffer())
    await writeFile(
        path.join(process.cwd(), "public/assets/pic/bio.jpeg"),
        fileBioPicBuf
    );

    if (dataPanel[0].carousel1) {
        let fileCarousel1 = await fetch(dataPanel[0].carousel1)
        let fileCarousel1Buf = Buffer.from(await fileCarousel1.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/carousel1.jpeg"),
            fileCarousel1Buf
        );
    }

    if (dataPanel[0].carousel2) {
        let fileCarousel2 = await fetch(dataPanel[0].carousel2)
        let fileCarousel2Buf = Buffer.from(await fileCarousel2.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/carousel2.jpeg"),
            fileCarousel2Buf
        );
    }

    if (dataPanel[0].carousel3) {
        let fileCarousel3 = await fetch(dataPanel[0].carousel3)
        let fileCarousel3Buf = Buffer.from(await fileCarousel3.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/carousel3.jpeg"),
            fileCarousel3Buf
        );
    }

    return {
        props: {dataMusic},
        revalidate: 3600
    }
}
