import Image from "next/image";
import {Empty, Flex} from "antd";
import Head from "next/head";
import React from "react";
import {writeFile} from "fs/promises";
import path from "path";



export default function Photo({ data } : any) {
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
          "name": "photo",
          "item": `${process.env.APP_URL}/photo`
        }]
      }
    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}
                />
                <link rel="alternate" hrefLang="fa" href={`${process.env.APP_URL}/photo`}/>
                <meta name="keywords"
                      content="عکس شهرام عبدلی,خواننده شهرام عبدلی , عکس های شهرام عبدلی"/>
                <title>عکس های شهرام عبدلی</title>
                <meta name="description"
                      content={'عکس های شهرام عبدلی'}/>
                <meta property="og:title" content={'عکس های شهرام عبدلی'}/>
                <meta property="og:url" content={`${process.env.APP_URL}/photo`}/>
            </Head>
            <Flex gap={20} wrap={"wrap"} align={"center"} justify={"center"}>
                {data.map((value : any,i: number) => (
                    <Image
                        key={`image${i}`}
                            priority
                            className='object-fill rounded w-[250px] h-[250px]'
                            width={250}
                            height={250}
                            src={`/assets/pic/selfie${i}.jpeg`}
                            alt={`/assets/pic/selfie${i}.jpeg`}
                          />
                ))}
           </Flex>

            {data.length !== 0 ? '' : <Empty />}

       </>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.API}/selfie/`)
    const data = await res.json()

    data.map(async (value: any , i: number) => {
        let file = await fetch(value.pic)
        let fileBuf = Buffer.from(await file.arrayBuffer())
        await writeFile(
            path.join(process.cwd(), "public/assets/pic/selfie" + `${i}` + '.' + 'jpeg'),
            fileBuf
        );
    })

    return {
        props: {data},
        revalidate: 3600
    }
}
