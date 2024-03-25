import {Button, Card, Flex} from "antd";
import {
    DownloadOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import Image from "next/image";
const { Meta } = Card;
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface TypeCurrencyName {
    music : string,
    pic : string,
    video : string,
    name : string,
    description : string,
}

export default function Music({ data } : any) {


    return (
        <Flex  justify={'center'} align={'center'} gap={35} wrap="wrap">
            {data.map((value: TypeCurrencyName , i: number) => (
                <Card
                    key={i}
                    className='bg-gray-200'
                    cover={
                        <Image
                            width={500}
                            height={250}
                            src={value.pic}
                            alt={value.pic}
                        />
                    }
                    actions={[
                        <Button htmlType={"button"} type='link' target='_parent' block key={`download${i}`} href={value.music}><DownloadOutlined/></Button>,
                        <Button htmlType={"button"} type='link' disabled={!value.video} target='_parent' block key={`download${i}`} href={value.video}><VideoCameraOutlined /></Button>,
                    ]}
                >
                    <Meta title={<h3 className='text-center'>{value.name}</h3>} key={`meta${i}`}/>
                    <div key={`player${i}`} style={{direction: 'ltr'}}>
                        <AudioPlayer
                            className='!border-none'
                            customVolumeControls={[]}
                            customAdditionalControls={[]}
                            preload={"auto"}
                            showJumpControls={false}
                            footer={<h4 className='text-center'>{value.description}</h4>}
                            src={value.music}
                        />
                    </div>


                </Card>
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