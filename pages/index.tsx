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


interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}

const { Search } = Input;


export default function Home({ data } : any) {
    const router = useRouter()
    const [playIndex , setPlayIndex] = useState<number>(0)

    function handleClickPrevious () {
        setPlayIndex(prevState => prevState === 0 ? data.length - 1 : prevState - 1)
    }

     function handleClickNext () {
        setPlayIndex(prevState => prevState < data.length - 1 ? prevState + 1 : 0)
    }

  const schemaPerson = {
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": "Shahram abdoli",
      "url": "https://www.shahram-abdoli.ir",
      "image": "/avatar.jpeg",
      "sameAs": [
        "https://www.instagram.com/shahramabdoliofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        "https://www.youtube.com/@shahramabdoli"
      ],
      "jobTitle": "Singer"
    }

    const onSearch: SearchProps['onSearch'] = (value, _e) =>
        router.push(`music/${data.map((item : {name : string}) => ({value: item.name.toLowerCase()}))
            .filter( (page:any) => page['value'].includes(value.toLowerCase()))[0].value}`);

    return (
        <>
            <h1 hidden={true}>خواننده شهرام عبدلی - Shahram Abdoli</h1>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaPerson)}}
                />
                <link rel="alternate" hrefLang="fa-IR" href="https://www.shahram-abdoli.ir/"/>
                <title>خواننده شهرام عبدلی - Shahram Abdoli</title>
                <meta name="keywords" content="Musician, Singer, Songwriter, Composer, Pop Music, Persian Music, Shahram Abdoli, خواننده شهرام عبدلی, آهنگ شهرام عبدلی, موسیقی ایرانی,آهنگساز"/>
                <meta name="description"
                      content={'سایت شخصی خواننده شهرام عبدلی منبع رسمی انتشار موزیک ها و موزیک ویدئو ها'}/>
                <meta property="og:title" content={'خواننده شهرام عبدلی - Shahram Abdoli'}/>
                <meta property="og:url" content={'https://www.shahram-abdoli.ir'}/>
                <meta property="og:image" content={'/avatar.jpeg'}/>
            </Head>
            <Flex vertical>
                <Flex wrap={"wrap"} gap={40} align={"center"} justify={"center"}>
                    <Flex vertical align={"center"} justify={"center"}>
                        <AutoComplete
                            options={data.map((item: { name: string }) => ({value: item.name}))}
                            className="!mb-2"
                            filterOption={(inputValue, option: any) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        >
                            <Search className="lg:!w-[40vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]"
                                    placeholder="جستجو آهنگ ...." onSearch={onSearch}/>
                        </AutoComplete>
                        <Carousel dots={false} autoplaySpeed={2000}
                                  className={'lg:!w-[40vw] md:w-[40vw] sm:w-[40vw] mobile:w-[80vw] w-[60vw]'} autoplay
                                  effect="fade">
                            {data.map((value: Type, i: number) => (
                                <Image
                                    key={`image${i}`}
                                    className={`rounded mobile:h-[50vh] lg:h-[60vh] sm:h-[60vh] md:h-[60vh]`}
                                    sizes={'350px'}
                                    placeholder="blur"
                                    blurDataURL={value.pic}
                                    width={500}
                                    loading={"eager"}
                                    height={500}
                                    src={value.pic}
                                    alt={value.name}
                                />
                            ))}
                        </Carousel>
                    </Flex>
                    <Flex vertical align={"center"} justify={"center"} gap={20}>
                        <h2><strong>لیست پخش</strong></h2>
                        <Card
                            className='!bg-white !bg-clip-padding !backdrop-filter
                        !backdrop-blur-sm !bg-opacity-5 shadow-2xl
                         lg:!w-[25vw] md:!w-[40vw] sm:!w-[40vw] mobile:!w-[80vw]'
                            cover={
                                <Image
                                    src={data[playIndex].pic}
                                    alt={data[playIndex].pic}
                                    placeholder="blur"
                                    blurDataURL={data[playIndex].pic}
                                    width={0}
                                    loading={"eager"}
                                    height={0}
                                    sizes="200px"
                                    className='w-[500px] h-[350px]'
                                />
                            }
                        >
                            <div style={{direction: 'ltr'}}>
                                <AudioPlayer
                                    className='!border-none !bg-white !bg-clip-padding
                                 !backdrop-filter !backdrop-blur-sm !bg-opacity-10 '
                                    onEnded={handleClickNext}
                                    autoPlayAfterSrcChange={true}
                                    showSkipControls={true}
                                    preload={"none"}
                                    customVolumeControls={[]}
                                    footer={<h4 className='text-center'>{data[playIndex].description}</h4>}
                                    header={<h2 className='text-center'>{data[playIndex].name}</h2>}
                                    showJumpControls={false}
                                    src={data[playIndex].music}
                                    onClickPrevious={handleClickPrevious}
                                    onClickNext={handleClickNext}
                                />
                            </div>
                        </Card>
                    </Flex>

                </Flex>
                <div className='overflow-auto'>
                    <h2 className='my-2'>موزیک های اخیر</h2>
                    <Flex gap={20}>
                        {data.slice(0).reverse().map((value: Type, i: number) => (
                            <Link rel='canonical' key={`Link${i}`} href={`/music/${value.name.toLowerCase()}`}>
                                <Image
                                    key={`image${i}`}
                                    loading={"eager"}
                                    className='object-fill rounded w-[250px] h-[250px]'
                                    width={250}
                                    height={250}
                                    sizes={'200px'}
                                    placeholder="blur"
                                    blurDataURL={value.pic}
                                    src={value.pic}
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
    const res = await fetch(`https://inventory.digitkey.ir/music/`)
    const data = await res.json()
    return {
        props: {data},
        revalidate: 3600
    }
}
