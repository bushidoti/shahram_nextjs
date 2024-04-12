import Icon from "@ant-design/icons";
import Image from "next/image";
import React from "react";
import {GetProps} from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

export const InstaIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image width={35} height={35} sizes={'35px'}
                                 alt={'Instagram'} src="/insta.png" />)} {...props} />
);


export const AppleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image className='w-[35px] h-[35px]'
                                 width={35} height={35} alt={'Apple'} sizes={'35px'} src="/apple.png" />)} {...props} />
);

export const SpotIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image className='w-[35px] h-[35px]'
                                 width={35} height={35} alt={'Spotify'} sizes={'35px'}src="/spotify.png" />)} {...props} />
);

export const YoutubeIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image className='w-[35px] h-[35px]'
                                 width={35} height={35} alt={'Spotify'} sizes={'35px'} src="/youtube.png" />)} {...props} />
);

export const ShazamIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={() => (<Image className='w-[30px] h-[30px]'
                                 width={30} height={30} alt={'Spotify'} sizes={'35px'} src="/shazam.png" />)} {...props} />
);
