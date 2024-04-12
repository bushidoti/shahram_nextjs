import React, {useEffect, useState} from 'react';
import {Avatar, Layout, Flex, Menu, Button} from 'antd';
import {MenuOutlined, UserOutlined} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import {Context} from "@/components/context"
import dynamic from 'next/dynamic';
import {AppleIcon, InstaIcon, ShazamIcon, SpotIcon, YoutubeIcon} from "@/components/icons";
const MenuLayout = dynamic(() => import('./menu_items'), {
  ssr: true,
});

const { Header, Content, Footer, Sider } = Layout;


interface Type {
    apple : string,
    pic : string,
    spotify : string,
    shazam : string,
    youtube : string,
    insta : string,
}

export default function Main({ children }: any) {
  const [breakP , setBreakP] = useState<boolean>(false)
  const [collapse , setCollapse] = useState<boolean>(true)
  const [siderW , setSiderW] = useState<number>()
  const [data, setData] = useState<Type>()


  useEffect(() => {
    fetch('https://api.shahramabdoli.ir/panel/')
      .then((res) => res.json())
      .then((data) => {
        setData(data[0])
      })
  }, [])


  return (
    <Layout className='!bg-white !bg-clip-padding !bg-opacity-0' hasSider={true}>
        <Sider
            width={siderW}
            collapsed={collapse}
            breakpoint="lg"
            className={breakP ? 'rounded !fixed  !z-[99] !h-[100vh] top-0 right-0' +
                ' bottom-0 !bg-green-900 !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-90'
                :
                '!fixed !h-[98.2vh] !bg-white !bg-clip-padding !backdrop-filter ' +
                '!backdrop-blur-sm !bg-opacity-30 rounded mt-2 ms-2'}
            collapsedWidth={0}
            zeroWidthTriggerStyle={{display:collapse ? 'none' : '' }}
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
                <Avatar src={<Image priority sizes={'100px'} width={100} height={100} src={data?.pic || '/avatar.jpeg'}
                    alt={'Avatar'}/>} className='bg-sky-500 m-5 !border-solid !border-2 !border-blue-500'
                        size={100} icon={<UserOutlined/>}/>
            </div>
              <Context.Provider value={{
                        breakP,
                        setCollapse,
                        setBreakP
                    }}>
                  <MenuLayout/>
              </Context.Provider>
            <Flex align='center' justify='center' wrap={"wrap"} gap={breakP ? 10 : 1}
                   className={breakP ? 'w-full': 'w-full absolute bottom-0 bg-gray-500 rounded' }>
                {data?.insta ?  <Link hidden={collapse}
                  rel='noopener' target='_blank' href={data?.insta}><InstaIcon/></Link> : null}
                {data?.apple ? <Link hidden={collapse}
                  rel='noopener' target='_blank' href={data?.apple}><AppleIcon/></Link> : null}
                {data?.spotify ? <Link hidden={collapse}
                  rel='noopener' target='_blank' href={data?.spotify}><SpotIcon/></Link> : null}
                {data?.youtube ? <Link hidden={collapse}
                  rel='noopener' target='_blank' href={data?.youtube || '#'}><YoutubeIcon/></Link> : null}
                 {data?.shazam ? <Link hidden={collapse}
                  rel='noopener' target='_blank' href={data?.shazam || '#'}><ShazamIcon/></Link> : null}
            </Flex>
        </Sider>
        <Layout className="!bg-white !bg-clip-padding !backdrop-filter !bg-opacity-0">
             <Header hidden={!breakP}   style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  display: breakP ?  'flex' : '',
                  alignItems: 'center',
                }}  className={"m-2 rounded !bg-white !bg-clip-padding" +
                 " !backdrop-filter !backdrop-blur-sm !bg-opacity-30"}>
                 <Flex gap={10} align={"center"} justify={"center"}>
                   <Button onClick={() => setCollapse(false)}><MenuOutlined/></Button>
                   <Avatar src={<Image priority sizes={'48px'} width={48} height={48} src={data?.pic || '/avatar.jpeg'}
                    alt={'Avatar'}/>} className='bg-sky-500 !border-solid !border-2 !border-blue-500'
                        size={48} icon={<UserOutlined/>}/>
                 </Flex>
             </Header>
            <Content className={breakP ? 'p-2' : 'p-2 ms-[210px] '}>
                <div
                    className='rounded !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-50'
                    style={{padding: 24}}>
                    <Context.Provider value={{
                        breakP,
                        setCollapse,
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