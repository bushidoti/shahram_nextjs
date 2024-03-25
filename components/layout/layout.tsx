import React, {useState} from 'react';
import {Avatar, Layout} from 'antd';
import {MenuLayout} from "@/components/layout/menu_items";
import {UserOutlined} from "@ant-design/icons";
const { Content, Footer, Sider } = Layout;



export default function Main({ children }: any) {
  const [breakP , setBreakP] = useState<boolean>()
  const [siderW , setSiderW] = useState<number>()


  return (
    <Layout className='!bg-white !bg-clip-padding !bg-opacity-0'>
        <Sider
            width={siderW}
            breakpoint="lg"
            className={breakP ? 'rounded !fixed  !z-[99] !h-[100vh] top-0 right-0 bottom-0 !bg-green-900 !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-90' : '!fixed !h-[98.2vh] !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-30 rounded mt-2'} collapsedWidth={0}
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
                <Avatar className='bg-sky-500' size={100} icon={<UserOutlined/>}/>
            </div>
            <MenuLayout/>
        </Sider>
        <Layout className="!bg-white !bg-clip-padding !backdrop-filter !bg-opacity-0">
            <Content className={breakP ? 'p-2' : 'p-2 ms-[200px] '}>
                <div
                    className='rounded overflow-auto h-[100vh] !bg-white !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-50'
                    style={{padding: 24}}>
                    <main>{children}</main>
                </div>
            </Content>
            <Footer className={breakP ? 'text-center m-2 rounded !bg-white' +
                '            !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-30' : 'text-center ms-[208px] !bg-white' +
                '            !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-30 rounded me-2 mb-2'}>
                <p className='mobile:text-xs italic'>Shahram Abdoli Official ©{new Date().getFullYear()} Created by
                    Bushidoti</p>
            </Footer>
        </Layout>
    </Layout>
  );
};
