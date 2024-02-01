import React, { useContext } from "react";
import Cam from "../../../../../assets/images/img/cam.png";
import Add from "../../../../../assets/images/img/add.png";
import More from "../../../../../assets/images/img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../../ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
