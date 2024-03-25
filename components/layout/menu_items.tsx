import {Menu, MenuProps} from "antd";
import {
    HomeOutlined, PictureOutlined, UserOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import MusicNoteIcon from '@mui/icons-material/MusicNote';



type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[] ,
    disabled?: boolean,
    danger?: boolean ,


): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        disabled,
        danger,


    } as MenuItem;
}

const rootSubmenuKeys = ['sub1', 'sub4', 'sub5'];


export const MenuLayout = () => {
  const [openKeys, setOpenKeys] = useState(['']);
  const router = useRouter();
  const path = router.pathname;




  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };

  const items: MenuItem[] = [
    getItem(<Link href='/'>خانه</Link>, '/', <HomeOutlined/>),
    getItem(<Link href='/music'>موزیک</Link>, '/music', <MusicNoteIcon/>),
    getItem(<Link href='/video'>موزیک ویدئو</Link>, '/video', <VideoCameraOutlined />),
    getItem(<Link href='/photo'>عکس</Link>, '/photo', <PictureOutlined />),
    getItem(<Link href='/bio'>بیو گرافی</Link>, '/bio', <UserOutlined />),
];
    return (
         <Menu
            theme="dark"
            className='!overflow-auto sm:max-h-[50vh] lg:max-h-[60vh] md:max-h-[55vh] xl:max-h-[100vh] 2xl:max-h-[100vh] !bg-white
             !bg-opacity-[1px]'
            defaultSelectedKeys={[path]}
            mode="inline"
            items={items}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
         />
    )
}