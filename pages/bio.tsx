import {Avatar, Flex} from "antd";
import Image from "next/image";
import {UserOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {Context} from "@/components/context";
import Link from "next/link";
import {AppleIcon, InstaIcon, SpotIcon} from "@/components/layout/layout";

export default function Bio() {
    const context = useContext(Context)

    return (
        <Flex vertical gap={100}>
            <h1 hidden>بیوگرافی</h1>
            <Flex wrap={'wrap'} gap={10} align={context.breakP ? "center" : ""} justify={context.breakP ? "center" : ""}>
               <Avatar src={<Image className='object-top w-full' priority width={1254}
                height={1254} src={'/bio.jpeg'} alt={''}/>} shape="square" size={200} icon={<UserOutlined/>}/>
                <Flex vertical justify={'flex-end'} gap={10}>
                    <h2 hidden>شهرام عبدلی</h2>
                    <p>تاریخ تولد : ۵ دی‌ماه ۱۳۵۳ </p>
                    <p>محل تولد : میانه </p>
                    <label className='text-center mb-2'>لینک های شبکه های اجتماعی : </label>
                    <Flex wrap={"wrap"} align='center' justify='center' gap={10} className='w-full'>
                        <Link target='_blank'
                              href={'https://www.instagram.com/shahramabdoliofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='}><InstaIcon/></Link>
                        <Link target='_blank'
                              href={'https://music.apple.com/us/artist/shahram-abdoli/1724411194'}><AppleIcon/></Link>
                        <Link target='_blank'
                              href={'https://open.spotify.com/artist/0J6quVdkvtJUYUHIo9hqZk?si=F7kiDJjITrapVp8SFVkAZQ'}><SpotIcon/></Link>
                    </Flex>
                </Flex>
            </Flex>

            <Flex gap={10} vertical>
                <p>شهرام عبدلی، نامی که در دنیای موسیقی به عنوان یکی از توانمندترین خوانندگان آذربایجان شناخته می‌
                    شود، در ۵ دی‌ماه ۱۳۵۳ در شهر میانه به دنیا آمد. او از کودکی با لحن‌ها و نت‌های موسی
                    قی آشنا شده و به یکی از شخصیت‌های برجسته در صحنه موسیقی آذربایجان تبدیل شده است.</p>
                <p>
                    با آغاز دهه ۲۰۰۰، شهرام عبدلی با تولید اولین
                    کاست آماتور خود در شهر استانبول، وارد دنیای موسیقی شد. ۱۸ سال سپری کردن در ا
                    ین شهر، او را با فرهنگ و تاثیرات موسیقی آذربایجان آشنا
                    کرد و تجربیات گرانبهایی را در کنار خود جلب کرد.
                </p>
                <p>
                   در سن ۴۰ سالگی، شهرام عبدلی با بازگشت به ایران، نخستین اثر حرفه‌ای خود با عنوان “یل توخوندو” را در س
                    ال ۱۴۰۰ منتشر کرد. این آهنگ، نماد انتقال او از دنیای موسیقی آمات
                    ور به حوزه حرفه‌ای بود و با استقبال مثبت مخاطبان همراه شد.
                </p>
                <p>
                  آثار شناخته شده این هنرمند شامل “بوقالا داشلی قالا”، “گلمیسن”، “ای دوست”، “سوگیلیم” و “آغ
                    گورچین” می‌شوند، که با صدای منحصر به فرد و اجرای با احساس او، جاذ
                    به ویژه‌ای بین علاقمندان به موسیقی آذربایجان ایجاد کرده‌اند.
                </p>
            </Flex>
        </Flex>
    )
}