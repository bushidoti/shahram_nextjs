import Image from "next/image";
import {Flex} from "antd";
import Head from "next/head";
import React from "react";

interface Type {
    pic : string,
    name : string,
}

export default function Photo({ data } : any) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="alternate" hrefLang="fa-IR" href="https://www.shahram-abdoli.ir/photo"/>
                <meta name="keywords"
                      content="شهرام عبدلی, shahram abdoli photo, خواننده شهرام عبدلی, shahram abdoli, musician shahram abdoli, عکس های شهرام عبدلی"/>
                <title>عکس - شهرام عبدلی</title>
                <meta name="description"
                      content={'عکس های شهرام عبدلی'}/>
                <meta property="og:title" content={'عکس - شهرام عبدلی'}/>
                <meta property="og:url" content={'https://www.shahram-abdoli.ir/photo'}/>
            </Head>
            <Flex gap={20} wrap={"wrap"} align={"center"} justify={"center"}>
                {data.map((value: Type, i: number) => (
                    <Image
                        key={`image${i}`}
                            priority
                            className='object-fill rounded w-[250px] h-[250px]'
                            width={250}
                            height={250}
                            src={value.pic}
                            alt={value.name}
                          />
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
