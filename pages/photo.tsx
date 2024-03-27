import Link from "next/link";
import Image from "next/image";
import {Flex} from "antd";
import React from "react";

interface Type {
    pic : string,
    name : string,
}

export default function Photo({ data } : any) {
    return (
       <Flex gap={20} wrap={"wrap"}>
            {data.map((value: Type , i: number) => (
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
