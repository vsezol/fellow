import Chat from '../widgets/chat';
import MessageInput from '../widgets/message-input';
import './globals.css';
import './icons';

export function App() {
  return (
    <div className="container h-screen mx-auto ">
      <div className="flex flex-col h-full max-w-2xl mx-auto py-4">
        <div className="flex-grow">
          <Chat />
        </div>
        <div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default App;
