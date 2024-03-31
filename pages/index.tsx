import {AutoComplete, Carousel, Flex} from 'antd';
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useRouter } from 'next/router'


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

    const onSearch: SearchProps['onSearch'] = (value, _e) => router.push(`music/${data.map((item : {name : string}) => ({value: item.name.toLowerCase()  })).filter( (page:any) => page['value'].includes(value.toLowerCase()))[0].value}`);
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

                    <Flex vertical  align={"center"} justify={"center"}>
                        <AutoComplete
                            options={data.map((item : {name : string}) => ({value: item.name  }))}
                            className="!mb-2"
                            filterOption={(inputValue, option : any) =>
                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        >
                            <Search className="lg:!w-[50vw] md:!w-[50vw] sm:!w-[50vw]" placeholder="جستجو آهنگ ...." onSearch={onSearch} />
                        </AutoComplete>

                         <Carousel dots={false} autoplaySpeed={2000} className={'md:w-[50vw] sm:w-[50vw] mobile:w-[80vw] w-[60vw]'} autoplay effect="fade">
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
                                <Link key={`Link${i}`} href={`/music/${value.name.toLowerCase()}`}>
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
