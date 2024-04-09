import React, {useState} from 'react';
import {Avatar, Layout, GetProps, Flex} from 'antd';
import Icon , {UserOutlined} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import {Context} from "@/components/context"
import dynamic from 'next/dynamic';
const MenuLayout = dynamic(() => import('./menu_items'), {
  ssr: false,
});

const { Content, Footer, Sider } = Layout;

type CustomIconComponentProps = GetProps<typeof Icon>;

export const InstaIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image width={48} height={48}
                                 alt={'Instagram'} src="/insta.png" />)} {...props} />
);


export const AppleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image className='w-[48px] h-[48px]'
                                 width={48} height={48} alt={'Apple'} src="/apple.png" />)} {...props} />
);

export const SpotIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image className='w-[48px] h-[48px]'
                                 width={48} height={48} alt={'Spotify'} src="/spotify.png" />)} {...props} />
);


export default function Main({ children }: any) {
  const [breakP , setBreakP] = useState<boolean>(false)
  const [collapse , setCollapse] = useState<boolean>()
  const [siderW , setSiderW] = useState<number>()

  return (
    <Layout className='!bg-white !bg-clip-padding !bg-opacity-0' hasSider={true}>
        <Sider
            width={siderW}
            breakpoint="lg"
            className={breakP ? 'rounded !fixed  !z-[99] !h-[100vh] top-0 right-0' +
                ' bottom-0 !bg-green-900 !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-90'
                :
                '!fixed !h-[98.2vh] !bg-white !bg-clip-padding !backdrop-filter ' +
                '!backdrop-blur-sm !bg-opacity-30 rounded mt-2 ms-2'}
            collapsedWidth={0}
            onCollapse={(collapsed) => {
                setCollapse(collapsed)
            }}
            onBreakpoint={broken => {
                                       if (broken) {
                                           setSiderW(300)
                                           setBreakP(true)
                                       } else {
                                           setSiderW(200)
                                           setBreakP(false)
                                       }
                                   }}
        >
            <div className='flex flex-col items-center m-5'>
                <Avatar src={<Image priority width={100} height={100} src={'/avatar.jpeg'} alt={'Avatar'}/>} className='bg-sky-500 m-5' size={100} icon={<UserOutlined/>}/>
            </div>
            <MenuLayout/>
            <Flex  align='center' justify='center' gap={10} className='absolute w-full bottom-0 bg-gray-500 rounded'>
                <Link hidden={collapse} rel='noopener' target='_blank' href={'https://www.instagram.com/shahramabdoliofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='}><InstaIcon/></Link>
                <Link hidden={collapse} rel='noopener' target='_blank' href={'https://music.apple.com/us/artist/shahram-abdoli/1724411194'}><AppleIcon/></Link>
                <Link hidden={collapse} rel='noopener' target='_blank' href={'https://open.spotify.com/artist/0J6quVdkvtJUYUHIo9hqZk?si=F7kiDJjITrapVp8SFVkAZQ'}><SpotIcon/></Link>
            </Flex>
        </Sider>
        <Layout className="!bg-white !bg-clip-padding !backdrop-filter !bg-opacity-0">
            <Content className={breakP ? 'p-2' : 'p-2 ms-[210px] '}>
                <div
                    className='rounded overflow-auto h-[100vh] !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-50'
                    style={{padding: 24}}>
                    <Context.Provider value={{
                        breakP,
                        setBreakP
                    }}>
                      <main>{children}</main>
                    </Context.Provider>
                </div>
            </Content>
            <Footer className={breakP ? 'text-center m-2 rounded !bg-white' +
                '            !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-30' : 'text-center ms-[217px] !bg-white' +
                '            !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-30 rounded me-2 mb-2'}>
                <p className='mobile:text-xs italic'>Shahram Abdoli Official ©{new Date().getFullYear()} Created by
                    Bushidoti</p>
            </Footer>
        </Layout>
    </Layout>
  );
};
