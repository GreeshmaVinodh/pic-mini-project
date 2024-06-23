import Searchbar from './Searchbar';
import './ChatSidebar.css';
import Users from './Users';

const ChatSidebar = () => {
  return (
    <>
    <div className='header'>
      Messages
    </div>
    <div className='searchbar'>
    <Searchbar/>
    </div>
    <div>
      <Users/>
    </div>
    </>
  )
}

export default ChatSidebar;
