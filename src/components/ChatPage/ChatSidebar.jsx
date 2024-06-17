import Searchbar from './Searchbar';
import './ChatSidebar.css'

const ChatSidebar = () => {
  return (
    <>
    <div className='header'>
      Messages
    </div>
    <div className='searchbar'>
    <Searchbar/>
    </div>
    </>
  )
}

export default ChatSidebar;
