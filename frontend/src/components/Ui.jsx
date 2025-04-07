import React, { useEffect, useRef, useState } from 'react';
import './Ui.css';
import { useSelector } from 'react-redux';
import SS from './SS';
import html2canvas from 'html2canvas-pro';

function Ui({MetaData,isheader,isfooter}) {
  const selector = useSelector((state) => state.chatsInfo);

  const [dummydata,setdummydata]=useState([ {
    person: "Jack",
    messages: [{ contentmsg: "hii", contentimg: "", typemsg: 'text' },
      { contentmsg: "How are You", contentimg: "", typemsg: 'text' }
    ],
    id: "etf",
    color: '#FF0000',
  },
  {
    person: "Scoot",
    messages: [{ contentmsg: "Hello", contentimg: "", typemsg: 'text' },
      { contentmsg: "I am Fine", contentimg: "", typemsg: 'text' }
    ],
    id: "etfe",
    color: '#FA2A55',
  }])

  useEffect(()=>{
    console.log(MetaData)
  },[MetaData])
const divRef=useRef();
  const groupMessages = (messages) => {
    const grouped = [];
    let currentGroup = null;

    messages.forEach((msg) => {
      if (!currentGroup || currentGroup.person !== msg.person) {
        if (currentGroup) grouped?.push(currentGroup);
        currentGroup = {
          person: msg?.person,
          color: msg?.color,
          messages: [msg],
        };
      } else {
        currentGroup.messages.push(msg);
      }
    });

    if (currentGroup) grouped.push(currentGroup);
    return grouped;
  };

  
  const handleScreenshot = async () => {
    if (!divRef.current) return;

    const canvas = await html2canvas(divRef.current,{
      useCORS: true, // If you're loading external images
      backgroundColor: null, // To keep transparency
      logging: false
    })
    
    const image = canvas.toDataURL('image/png');

    // Create a link and download
    const link = document.createElement('a');
    link.href = image;
    link.download = 'screenshot.png';
    link.click();
  };
  const [Pdetails, setPdetails] = useState([
   {}
  ]);

  useEffect(() => {
    if (selector.id === undefined) return;

    setPdetails((prev) => {
      const existing = prev.find((item) => item.id === selector.id && item.person === selector.person);

      const newMessage = {
        typemsg: selector.image ? 'image' : 'text',
        contentmsg: selector.message || '',
        contentimg: selector.image || '',
      };

      if (existing) {
        return prev?.map((item) =>
          item.id === selector.id
            ? { ...item, messages: [...item.messages, newMessage] }
            : item
        );
      } else {
        const newEntry = {
          id: selector.id,
          person: selector?.person,
          color: selector.color,
          messages: [newMessage],
        };
        return [...prev, newEntry];
      }
    });
  }, [selector]);

  return (
    <div className="ssclass w-full flex justify-center items-center flex-col  ">

      <div className=" bg-white mb-4 mt-9" style={{ minHeight: `${MetaData.height}vh`, minWidth: `${MetaData.width}%` }} ref={divRef} >
        <div className="w-full h-full flex flex-col">
          {/* Navbar */}
       {isheader&&<nav className="w-full flex-col flex border-b max-h-[12vh] border-black/30">
            <div className="w-full flex flex-row   p-2 items-center">
              <span className="font-bold text-sm ml-3 w-full">{MetaData.time??'10:04'}</span>
             <div>
        <div className='flex-1 flex flex-row items-center w-full '>
        <div className="flex flex-row gap-[2px] items-end rounded-xl p-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`w-[3px] h-[4px]  rounded-xl transition-all duration-300
              ${MetaData.towersignal >= level ? 'bg-black' : 'bg-black/30'}
            `}
            style={{minHeight:`${level*2+2}px`}}
          />
        ))}
      </div>
      <span className='text-xs'>5G</span>
             {MetaData.device=='Android'?<span className='battery  w-[25px] lg:w-[2vw] lg:h-[2.5vh] h-[20px] md:w-[30px] flex justify-end'></span>:''}
             {MetaData.device=='Iphone'?<span className='iphonebattery w-[25px] lg:w-[1.6vw] ml-1 lg:h-[2.5vh]  h-[20px] md:w-[30px] flex justify-end'></span>:''}
        </div>
             
             </div>
             
            </div>
            <div className="flex items-center justify-between p-1">
              <div className="flex flex-row items-center justify-between p-1 w-1/3">
                <div className="leftarrow min-w-[20px] w-[1vw] h-[1.8vh]"></div>
                <div className="userimage lg:w-[5vw] lg:h-[5vh] w-[43px] h-[40px] min-w-[25px] sm:w-[40px] sm:h-[40px] ml-2"></div>
                <div className="name ml-2 font-bold">{MetaData.name}</div>
              </div>
              <div className="dailer lg:w-[4vw] lg:h-[2vh] w-[60px] h-[20px] md:w-[7vw] md:h-[7vh] mr-3"></div>
            </div>
          </nav>}

          <div className='w-full text-center text-sm text-black/50'>{MetaData.chatday}</div>

          {/* Chat Messages */}
          <div className="chats w-full flex-grow lg:min-h-[56vh] lg:max-h-[56vh] min-h-[58vh] space-y-4 px-2 py-2 overflow-y-auto" style={{ minHeight: `${MetaData.height}vh`, minWidth: `${MetaData.width}%` }}>
            {groupMessages(
              (Pdetails.length>1?Pdetails:dummydata)?.flatMap((p) =>
                p.messages?.map((msg) => ({
                  ...msg,
                  person: p?.person,
                  id: p?.id,
                  color: p?.color,
                }))
              )
            )?.map((group, i) => (
              <div key={i} className={`mb-2 border-l-[${group.color}]`}>
                <div className="text-xs font-bold uppercase -space-y-2 tracking-widest mb-1" style={{ color: group.color }}>
                  {group?.person}
                </div>
                {group.messages?.map((msg, j) => (
                  <div
                    key={j}
                     className={`pl-2 `}
                     style={{ borderLeft: `2px solid ${group.color}`,}}
                  >
                      {msg?.contentimg && msg?.contentimg.trim() !== '' && (
                      <img
                        src={msg.contentimg}
                        alt="media"
                        className=" pics rounded-md max-w-30 mt-2 mb-2 h-30 object-cover bg-gray-200"
                      />
                    )}
                    {msg?.contentmsg && msg?.contentmsg.trim() !== '' && (
                      <span className="block text-sm">{msg.contentmsg}</span>
                    )}
                  
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
         { isfooter&&<div className="footer w-full h-[8vh] sticky bottom-0 flex justify-center items-center flex-col ">
            <div className="w-full h-full flex flex-row items-center justify-evenly p-1">
              <div className="cameraicon md:w-[100px] md:h-[29px] h-[27px]  w-[35px] lg:w-[3vw]"></div>
              <div className="lg:w-[10vw] w-[160px] h-[4vh] md:w-[400px] p-2 border-1 border-black/20 ml-1 mr-1  rounded-2xl flex items-center justify-between">
                <div className='text-black/40  '>Chat</div>
                <div className='micro  h-[2.3vh] lg:w-[2vw] md:w-[40px] md:h-17px] w-[20px] ml-1'></div>
              </div>
              <div className="locicon md:w-[100px] md:h-[90px]  h-[2.7vh] lg:w-[6vw] w-[90px]"></div>
            </div>
         
         <div className='w-full justify-center items-center flex  h-2'>
          <div className='w-1/3 bg-black h-[.5vh] mb-2 rounded-2xl'></div>
         </div>
          </div>}
        </div>
      </div>
      <button onClick={handleScreenshot} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Take Screenshot
      </button>
    </div>
  );
}

export default Ui;
