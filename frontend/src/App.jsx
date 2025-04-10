import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserInfo } from "./store/userdetails";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.UserDetails);

  // 🔥 Fetch user on app load
  useEffect(() => {
    fetch("/api/auth/check-session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          dispatch(UserInfo({ ...data.User }));
          const publicRoutes = ["/resetPassword"];
          const isPublicRoute = publicRoutes.some((route) =>
            location.pathname.startsWith(route)
          );

          if (!isPublicRoute) {
            navigate("/userhome", { replace: true, state: true });
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full justify-center p-1 bg-amber-400/70 overflow-hidden min-h-[100vh] flex flex-col">
      {/* Navbar */}
      <div className="w-screen flex top-1 justify-center absolute">
        <div
          className={`w-screen flex top-1 justify-center absolute ${
            selector.loggedin !== true ? "block" : "hidden"
          }`}
        >
          <nav className="min-w-[50%] flex justify-around items-center backdrop-blur-md bg-white/10 rounded-xl lg:text-xl font-bold">
            <Link
              to="/login"
              className={`${
                location.pathname === "/login"
                  ? "text-white border-2 border-b-black p-2 rounded-2xl"
                  : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`${
                location.pathname === "/signup"
                  ? "text-white border-2 border-b-black border-t-amber-600 p-2 rounded-2xl"
                  : ""
              }`}
            >
              Signup
            </Link>
          </nav>
        </div>
      </div>

      {/* Fake Snap Generator Info */}
      {selector.loggedin !== true && (
        <div className="mt-20 w-[95vw] flex justify-center items-center">
          <div className="bg-white/30 text-black backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to the Fake Snap Generator 📸</h2>
            <p className="text-md">
              Easily create realistic fake snaps and prank your friends! Login or Signup to get started and have fun with custom-generated screenshots.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
