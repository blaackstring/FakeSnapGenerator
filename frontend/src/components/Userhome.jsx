    import Input from './Input'
    import { v4 as uuidv4 } from 'uuid';
    import React, { useEffect, useId, useRef, useState } from 'react'
    import { SketchPicker } from "react-color";
    import { useLocation, useNavigate } from 'react-router-dom';
    import { logout } from '../Controllers/AuthControllers';
    import { toast } from 'react-toastify';
    import { useDispatch, useSelector } from 'react-redux';
    import { UserInfo, UserLogOut } from '../store/userdetails';
    import Ui from './Ui';
    import { chatsInfo } from '../store/chats';
    import SS from './SS';

    function Userhome() {
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const id=useId();
    const [device,setdevice]=useState()
    const selector=useSelector((state)=>state.UserDetails)
    const divRef=useRef()
    const [iscoloractivated, setiscoloractivated] = useState(false);
    const [i, set_i] = useState(3);
    const [isfooter,setisfooter]=useState(true);
    const [isheader,setisheader]=useState(true);


    useEffect(()=>{
        if(location.state!=true){
    navigate('/login')
        }
    })

    
    const verifyUser = () => async (dispatch) => {
    try {
        console.log("⚡ Fetching user data...");
        
        const res = await fetch(`/api/verify/verifyuser`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to verify");
        }
        const { message, user } = res
    console.log(res);
        dispatch(UserInfo({ ...user }))


    } catch (error) {
        console.log("❌ Verification failed", error);
        dispatch(UserLogOut()); 
        navigate('/login');
    }
    };




    useEffect(() => {
        dispatch(verifyUser());
    }, [dispatch]);

    
    const lgout=async()=>{
    const res=await logout();
    if(!res.success) return toast.warning("unable to logout ")
        dispatch(UserLogOut());
    navigate('/login');
        toast.success(res.message,{autoClose:2000})
        
    }
        const [ChatData, setChatData] = useState({
            message: "",
            id:'',
            person: null,
            image: null,
            color: ''
        })

        const [isFeature,setisFeature]=useState(false);
        const [MetaData,setMetaData]=useState({
            name:"Morey",
            chatday:"Today",
            time:'10:04',
            height:55,
            width:0,
            isbatterycharging:false,
            device:'Android',
            towersignal:1
        })
        const [Person_counter, setPerson_counter] = useState([{
            Person_Name: "ME",
            id:id,
            color: "#ab0b88",
            nameField: "me"
        }, {
            Person_Name: "Person" + " " + 2,
            id:id,
            color: "#f90bcf",
            nameField: ""
        }]
        )
        

        useEffect(()=>{
            console.log(isheader,device);
            console.log((MetaData));
            
            
        },[isheader,device])
        const [userClicked, setUserClicked] = useState(Person_counter[0])
        const [color, setColor] = useState(userClicked.color); // Initialize color state


        const submithandler = (e) => {
            e.preventDefault();
        
                
            setChatData((prev) => ({ ...prev, color: color, id:id,person: userClicked.Person_Name, }))
        dispatch(chatsInfo({...ChatData, person: userClicked.Person_Name, color: color, id:id+userClicked.Person_Name}));
        setChatData({
            message: "",
            id:'',
            person: null,
            image: null,
            color: ''
        })
        }



        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setChatData((prevData) => ({ ...prevData, [name]: value }));
        };
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setChatData((prevData) => ({ ...prevData, image:URL.createObjectURL(file)}));
        };

        const person_handler = (e) => {
            const getRandomColor = () => {
                return "#" + Math.floor(Math.random() * 16777215).toString(16);
            };

            setPerson_counter((prev) => [
                ...prev,
                {
                    Person_Name: `Person ${i}`,
                    color: getRandomColor(),  // Generate a random hex color
                    nameField: ""
                }
            ]);

            set_i((prev) => prev + 1);
        };


        const userClicked_handler = (p) => {  //this is current clicked user whom user send message
            setUserClicked(p);
            setColor(p.color)
            console.log(p);

        }
        return (
            <div className='w-[100vw] h- flex justify-center items-center flex-col'>
            
    <nav className='w-full flex justify-end items-center pr-2 pt-1 border-b-1 p-1 bg-white'>
    <div className='w-full font-bold text-center bg-white/40 text-black'>FAKESNAP-GENERATOR</div>
        <span className='bg-black text-white justify-center flex items-center mr-2 p-2 min-w-fit'>Welcome-{selector.username}</span>
        <button onClick={lgout} className=' h-[5vh] bg-blue-950 text-white p-3 cursor-pointer'>Logout</button>

    </nav>
                <div className='lg:w-[90vw] min-h-[90vh] w-full  flex justify-center items-center lg:flex-row  flex-col '>


                    <div className="left lg:w-[33%] w-full flex items-center justify-center max-h-[98vh] p-4 flex-col bg-white border-1 ">
                                            
    <div className="uifeatures w-full flex justify-center items-center flex-col mb-2">
    <button onClick={(e)=>setisFeature(!isFeature)} className='min-w-fit rounded-xl p-2 hover:bg-black/60 cursor-pointer bg-black text-white'>{isFeature?'Less Options':'More Option'}</button>

    <div>
    {isFeature?(<div className='w-full flex mt-4 flex-col '> 
    <div className='flex flex-row'>
    <div className="parts flex flex-col ">

    <span>Parts:</span>
    <div>
    <input type='checkbox' id='hed' onClick={()=>setisheader(!isheader)} />
    <label htmlFor="hed">:Hide Header</label>

    </div>
    <div>
    <input type='checkbox' id='fot' onClick={()=>setisfooter(!isfooter)}/>

    <label htmlFor="fot">:Hide Footer</label>


    </div>
    </div>

    <div className="interface flex flex-col justify-between ml-5 ">

    <span>Interface:</span>
    <div>
    <input type='radio' id='hed' onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:'Android'}))}  name='device' defaultChecked={true}/>
    <label htmlFor="hed">:Android</label>

    </div>
    <div>
    <input type='radio' id='fot' onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:'Iphone'}))}  name='device'/>

    <label htmlFor="fot">:Iphone</label>
    </div>

    </div>

    </div>
        <div className="clc flex flex-col">

        <div className="clock flex flex-col">
            <label htmlFor="clck">Clock:</label>
            <input type="text" value={MetaData.time} onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:e.target.value}))}  name="time" className='w-full h-[5vh] bg-black/10 border-1 border-black/40 rounded p-1' placeholder='enter time' id='clck' />
        </div>

        <div>
        <div className="flex flex-col items-center">
            <label className="mb-2 font-semibold text-sm">Select Tower Level (1 to 5)</label>
            <input
            type="range"
            min="1"
            name='towersignal'
            max="5"
            value={MetaData.towersignal}
            onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:e.target.value}))}
            className="w-64 accent-black"
            />
        </div>
        </div>
        </div>
        <div className="HW">
        <div className=" flex flex-col">
            <label htmlFor="clck">Height:</label>
            <input type='range' minLength={'0'} maxLength={'80'} value={MetaData.height} name='height' onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:e.target.value}))}   className='w-full h-[5vh] bg-black/10 border-1 border-black/40 rounded p-1' placeholder='enter time' id='clck' />
            <label htmlFor="clck">Width:</label>
            <input type='range' minLength={40}  maxLength={'100'} name='width' value={MetaData.width} onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:e.target.value}))}   className='w-full h-[5vh] bg-black/10 border-1 border-black/40 rounded p-1' placeholder='enter time' id='clck' />
            <label htmlFor="Battery Charging">Battery Charging:</label>
            <input type="checkbox" name='isbatterycharging' defaultChecked={false} value={MetaData.isbatterycharging}  onChange={(e)=>setMetaData((prev)=>({...prev,[e.target.name]:!MetaData.isbatterycharging}))} />
        </div>
            <div>
                
            </div>
        </div>

    </div>):''}
    </div>
    </div>
                    <div className='w-full overflow-y-auto'>
                    <form action="" onSubmit={submithandler} className='w-full p-3 flex justify-center flex-1 items-center flex-col   overflow-x-hidden '>
                            <Input classname=' h-[6vh] ' name={"name"} label={"Direct message with"} value={typeof MetaData.name === "string" ? MetaData.name : ""}
                        onChange={(e)=>setMetaData((prev)=>({...prev,name:e.target.value}))}  />
                            <Input classname=' h-[6vh]' label={"Chat day"} name={"chatday"} value={MetaData.chatday}  onChange={(e)=>setMetaData((prev)=>({...prev,chatday:e.target.value}))} />

                            <div className='w-full mt-1 ml-4 grid grid-cols-5  text-sm  max-h-[14vh] overflow-y-auto p-4'>
                                {Person_counter.map((p) => (<div key={p.Person_Name} className={`w-[80%] text-center rounded justify-center ${userClicked.Person_Name === p.Person_Name ? 'bg-black hover:bg-black text-white' : " hover:bg-black/50"} focus:bg-amber-800 items-center p-1 h-[6vh] flex-row flex  hover:text-white`}
                                    onClick={() => userClicked_handler(p)}>
                                    {p.Person_Name == 'ME' ? 'Person 1' : p.Person_Name}
                                </div>))}
                                <span className='block p-2  h-[6vh]  text-center bg-white hover:bg-black/60 hover:text-white text-l' onClick={person_handler}>+</span>
                            </div>


                            <div className='w-[90%] h-full flex-1 flex flex-col justify-between items-center border-1 rounded border-black/40 p-2'>
                                <span className='font-bold' >Choose Color</span>
                                <div className='bg-white flex  w-[98%] justify-center items-center border-2 p-2 border-black/40 mt-2 font-bold rounded '>

                                    <div style={{ backgroundColor: color }} className="w-[86%] h-[1.7vh] mt-1 border-1   " onClick={() => setiscoloractivated(!iscoloractivated)}></div>

                                    {iscoloractivated && <div className='absolute top-70'>
                                        <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} className='' />
                                        <button onClick={() => setiscoloractivated(false)} className='z-40 sticky bg-white hover:bg-black text-black hover:text-white border-1 p-2'>OK</button>
                                    </div>}
                                </div>

                                <Input label={"Person Name"} classname='mt-2' name={"Person Name"} value={userClicked?.Person_Name ?? ChatData.person} onChange={(e) => setUserClicked((prev) => ({ ...prev, Person_Name: e.target.value }))} />
                                <label htmlFor="" className='font-bold'>Message</label>
                                <input type="text" className='w-full h-24 border-2 p-1 flex  items-start border-black/50 rounded-xl' name='message' value={ChatData.message} onChange={handleInputChange} />
                                <label htmlFor="" className='font-bold'>Import an image or video</label>
                                <div className='w-full h-[5vh] p-1 border-2 bg-sky-100 rounded border-black/50'>
                                
                                    <input label={"Import an image or video"} type='file' name='image' onChange={handleFileChange} />
                                </div>
                                <button className='w-full h-[5vh] bg-black text-white'>Add Message</button>
                            </div>

                        </form>
                    </div>

                    </div>
                    <div className="right flex flex-col lg:max-w-[50vw] w-full h-screen ml-1 ">
                        <Ui MetaData={MetaData} isheader={isheader} isfooter={isfooter}/>
                    
                    </div>
                    

                </div>

            </div>
        )
    }

    export default Userhome
