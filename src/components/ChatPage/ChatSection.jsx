import ChatNav from './ChatNav';
import './ChatSidebar.css';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';
const ChatSection = () => {
  return (
    <div>
      <div className='chatNav'>
        <ChatNav/>
      </div>
      <div className='chatInput'>
        <ChatInput/>
      </div>
      <div className='chatBody'>
       <ChatBody/> 
      </div>
    </div>
  )
}

export default ChatSection;
