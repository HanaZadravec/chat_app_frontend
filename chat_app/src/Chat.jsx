import { useEffect, useState, useContext } from "react"
import Avatar from "./Avatar";
import Logo from "./Logo";
import { UserContext } from "./UserContext";
import { uniqBy } from "lodash";

export default function Chat() {
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const {username, userId} = useContext(UserContext);
    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:5000');
        setWs(ws);
        ws.addEventListener('message',handleMessage)
    }, [])
    function showOnlinePeople(peopleArray) {
        const people = {};
        peopleArray.forEach(({userId, username}) => {
            people[userId] = username;
        });
        setOnlinePeople(people);
    }
    
    function handleMessage(ev){
        const messageData = JSON.parse(ev.data);
        console.log({ev, messageData});
        if('online' in messageData){
            showOnlinePeople(messageData.online);
        }else if('text' in messageData) {
            setMessages(prev => [...prev, {...messageData}]);
        }
    }

    function sendMessage(ev){
        ev.preventDefault();
        ws.send(JSON.stringify({
                recipient: selectedPersonId,
                text: newMessageText
        }));
        setNewMessageText('');
        setMessages(prev => [...prev, {text: newMessageText, sender: userId,recipient: selectedPersonId, id: Date.now()}]);
    }
    const OnlinePeopleWithoutUser = {...onlinePeople};
    delete OnlinePeopleWithoutUser[userId];
    const messagesWithoutDupes = uniqBy(messages,'id');
    return (
      <div className="flex h-screen">
        <div className="bg-white w-1/3">
            <Logo />
            {Object.keys(OnlinePeopleWithoutUser).map(userId => (
            <div key={userId} onClick={() =>setSelectedPersonId(userId)} 
                 className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer " + (userId === selectedPersonId ? 'bg-blue-50' : '')}>
                    {userId === selectedPersonId && <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>}
                <div className="flex gap-2 py-2 pl-4 items-center">
                    <Avatar username={onlinePeople[userId]} userId={userId}/>
                    <span className="text-gray-800">{onlinePeople[userId]}</span>
                </div>
            </div>
         ))}
        </div>
        <div className=" flex flex-col bg-blue-50 w-2/3 p-2">
            <div className="flex-grow">
               {!selectedPersonId && <div className="text-center text-gray-500 mt-20">
                   Select a person to chat with </div>}
                {!!selectedPersonId && (
                    <div className="relative h-full">
                    <div className="overflow-y-scroll absolute inset-0">
                    {messagesWithoutDupes.map(message =>(
                    <div className={(message.sender === userId ? 'text-right' : 'text-left')}>
                    <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " + (message.sender === userId ? 'bg-blue-500 text-white' : 'bg-white text-gray-500')}>
                       sender : {message.sender} <br/>
                       my id: {userId} <br/>
                       {message.text}
                       </div>
                    </div>
                    ))}
                    </div>
                    </div>
                )}
            </div>
            {!!selectedPersonId &&(
                <form className="flex gap-2" onSubmit={sendMessage}>
                <input type="text" 
                       value={newMessageText}
                       onChange = {ev => setNewMessageText(ev.target.value)}
                       placeholder="Type your message here" 
                       className="bg-white border p-2 flex-grow rounded-md"/>
                <button type="submit" className="bg-blue-500 p-2 text-white rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </form>
            )}
        </div>
      </div>
    )
}