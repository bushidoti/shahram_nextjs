import React from 'react';
import {Carousel, Flex} from 'antd';
import Image from "next/image";



const Home: React.FC = () => (
    <Flex vertical>
       <Carousel className='w-full' autoplay effect="fade">
            <Image
                className='object-fill rounded h-[50vh]'
                width={1080}
                priority={true}
                height={1080}
                src={'/1.png'}
                alt='rewrw'
            />
            <Image
                className='object-fill rounded h-[50vh]'
                width={3000}
                height={3000}
                src={'/2.png'}
                alt='ewrwer'
            />
      </Carousel>
        <div>
            <h2>موزیک های اخیر</h2>
        </div>
    </Flex>

);

export default Home;