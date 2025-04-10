// imports
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from './Input';
import { SketchPicker } from 'react-color';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../Controllers/AuthControllers';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogOut, UserInfo } from '../store/userdetails';
import { chatsInfo } from '../store/chats';

// Async verify function (outside component)
export const verifyUser = () => async (dispatch) => {
  try {
    const res = await fetch('/api/auth/check-session', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();

    if (data.isAuthenticated) {
      dispatch(UserInfo({ ...data.User }));
    } else {
      dispatch(UserLogOut());
    }
  } catch (error) {
    console.error('❌ Verification failed', error);
    dispatch(UserLogOut());
  }
};

function Userhome() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.UserDetails);

  const [device, setDevice] = useState('');
  const divRef = useRef();
  const [isColorActivated, setIsColorActivated] = useState(false);
  const [i, set_i] = useState(3);
  const [isFooter, setIsFooter] = useState(true);
  const [isHeader, setIsHeader] = useState(true);
  const [isFeature, setIsFeature] = useState(false);

  useEffect(() => {
    if (location.state !== true) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  const [metaData, setMetaData] = useState({
    name: 'Morey',
    chatday: 'Today',
    time: '10:04',
    height: 55,
    width: 80,
    isbatterycharging: false,
    device: 'Android',
    towersignal: 1,
  });

  const [personCounter, setPersonCounter] = useState([
    {
      Person_Name: 'ME',
      id: uuidv4(),
      color: '#ab0b88',
      nameField: 'me',
    },
    {
      Person_Name: 'Person 2',
      id: uuidv4(),
      color: '#f90bcf',
      nameField: '',
    },
  ]);

  const [userClicked, setUserClicked] = useState(personCounter[0]);
  const [color, setColor] = useState(userClicked.color);

  const [chatData, setChatData] = useState({
    message: '',
    id: '',
    person: null,
    image: null,
    color: '',
  });

  const logoutHandler = async () => {
    const res = await logout();
    if (!res.success) {
      toast.warning('Unable to logout');
      return;
    }
    dispatch(UserLogOut());
    navigate('/login');
    toast.success(res.message, { autoClose: 2000 });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newId = uuidv4();

    const newChat = {
      ...chatData,
      color: color,
      id: newId,
      person: userClicked.Person_Name,
    };

    dispatch(chatsInfo(newChat));

    setChatData({
      message: '',
      id: '',
      person: null,
      image: null,
      color: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChatData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChatData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const personHandler = () => {
    const getRandomColor = () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16);

    const newPerson = {
      Person_Name: `Person ${i}`,
      id: uuidv4(),
      color: getRandomColor(),
      nameField: '',
    };

    setPersonCounter((prev) => [...prev, newPerson]);
    set_i((prev) => prev + 1);
  };

  const userClickedHandler = (person) => {
    setUserClicked(person);
    setColor(person.color);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      <nav className="w-full flex justify-between items-center p-2 bg-white border-b">
        <div className="text-lg font-bold text-center w-full">
          FAKESNAP-GENERATOR
        </div>
        <div className="flex gap-2">
          <span className="bg-black text-white px-3 py-1 rounded">
            Welcome - {selector.username}
          </span>
          <button
            onClick={logoutHandler}
            className="bg-blue-950 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="lg:w-[90vw] w-full flex flex-col lg:flex-row justify-center items-start p-4">
        {/* LEFT SIDEBAR */}
        <div className="lg:w-1/3 w-full bg-white p-4 border rounded flex flex-col gap-4">
          <button
            onClick={() => setIsFeature(!isFeature)}
            className="bg-black text-white p-2 rounded"
          >
            {isFeature ? 'Less Options' : 'More Option'}
          </button>

          {isFeature && (
            <div className="flex flex-col gap-3">
              {/* Options */}
              <div className="flex justify-between">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => setIsHeader((prev) => !prev)}
                    />{' '}
                    Hide Header
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => setIsFooter((prev) => !prev)}
                    />{' '}
                    Hide Footer
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="radio"
                      name="device"
                      value="Android"
                      checked={metaData.device === 'Android'}
                      onChange={(e) =>
                        setMetaData((prev) => ({
                          ...prev,
                          device: e.target.value,
                        }))
                      }
                    />{' '}
                    Android
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="device"
                      value="iPhone"
                      checked={metaData.device === 'iPhone'}
                      onChange={(e) =>
                        setMetaData((prev) => ({
                          ...prev,
                          device: e.target.value,
                        }))
                      }
                    />{' '}
                    iPhone
                  </label>
                </div>
              </div>

              {/* Time, Tower, Height/Width */}
              <Input
                name="time"
                label="Clock"
                value={metaData.time}
                onChange={(e) =>
                  setMetaData((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
              />

              <label>
                Tower Signal:
                <input
                  type="range"
                  min="1"
                  max="5"
                  name="towersignal"
                  value={metaData.towersignal}
                  onChange={(e) =>
                    setMetaData((prev) => ({
                      ...prev,
                      towersignal: e.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Battery Charging:
                <input
                  type="checkbox"
                  name="isbatterycharging"
                  checked={metaData.isbatterycharging}
                  onChange={() =>
                    setMetaData((prev) => ({
                      ...prev,
                      isbatterycharging: !prev.isbatterycharging,
                    }))
                  }
                />
              </label>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3 items-center"
          >
            <Input
              name="name"
              label="Direct Message With"
              value={metaData.name}
              onChange={(e) =>
                setMetaData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              name="chatday"
              label="Chat Day"
              value={metaData.chatday}
              onChange={(e) =>
                setMetaData((prev) => ({ ...prev, chatday: e.target.value }))
              }
            />

            <div className="grid grid-cols-2 gap-2 w-full">
              {personCounter.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => userClickedHandler(p)}
                  className={`rounded px-2 py-1 ${
                    userClicked.id === p.id ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                >
                  {p.Person_Name}
                </button>
              ))}
            </div>

            <textarea
              name="message"
              placeholder="Type your message"
              className="border p-2 w-full h-20"
              value={chatData.message}
              onChange={handleInputChange}
            />

            <input type="file" onChange={handleFileChange} />
            <SketchPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />

            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - You can include <Ui />, <SS />, or chat display */}
      </div>
    </div>
  );
}

export default Userhome;
