import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Button} from "antd";
const useSound = require('use-sound');

const Player = ({url , keytag} : any) => {
  const [play, { pause , duration, sound}] = useSound.useSound(url);
  const [isPlay , setIsPlay] = useState<boolean>(false)
    function Play() {
         setIsPlay(true)
         play()
    }

     function Stop() {
         setIsPlay(false)
         pause()
    }

  return <Button  type={"link"} danger={isPlay} block key={keytag} onClick={isPlay ? Stop : Play}>{isPlay ? <PauseCircleOutlined /> : <PlayCircleOutlined/> }</Button>;
};

export default Player