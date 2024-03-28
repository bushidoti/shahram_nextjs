import {useContext, useEffect, useState} from 'react';
import {Carousel, Flex} from 'antd';
import Image from "next/image";
import Link from "next/link";
import {Context} from "@/components/context";
import Head from "next/head";


interface Type {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}

export default function Home({ data } : any) {

    return (
        <>
        <Head>
              <link rel="icon" href="/favicon.ico"/>
              <title>شهرام عبدلی</title>
              <meta name="description"
                    content={'سایت شخصی شهرام عبدلی'}/>
              <meta property="og:title" content={'شهرام عبدلی'}/>
              <meta property="og:url" content={'https://digitkey.ir'}/>
        </Head>
            <Flex vertical>
                    <Flex  align={"center"} justify={"center"}>
                         <Carousel dots={false} autoplaySpeed={2000} className={'md:w-[50vw] sm:w-[50vw]  mobile:w-[80vw] w-[60vw]'} autoplay effect="fade">
                             {data.map((value: Type , i: number) => (
                                  <Image
                                    key={`image${i}`}
                                    priority
                                    className={`rounded mobile:h-[50vh] lg:h-[60vh]`}
                                    sizes={'200px'}
                                    width={500}
                                    loading={"eager"}
                                    height={500}
                                    src={value.pic}
                                    alt={value.name}
                                />
                             ))}
                         </Carousel>
                     </Flex>
                     <div className='overflow-auto'>
                        <h2 className='my-2'>موزیک های اخیر</h2>
                         <Flex gap={20}>
                            {data.slice(0).reverse().map((value: Type , i: number) => (
                                <Link key={`Link${i}`} href={`/music/${value.name}`}>
                                      <Image
                                        key={`image${i}`}
                                        priority
                                        loading={"eager"}
                                        className='object-fill rounded w-[250px] h-[250px]'
                                        width={250}
                                        height={250}
                                        sizes={'200px'}
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
