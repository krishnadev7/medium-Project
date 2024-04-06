import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@krishnadev7/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "login" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInput] = useState<SignupInput>({
    username: "",
    password: "",
    name: "",
  });

  const sendReq = async() => {
    try {
       const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup'?'signup':'login'}`,postInputs)       
       const jwt = res.data.jwt;
       localStorage.setItem('token',jwt);
       navigate("/blogs")
    } catch (error) {
      alert("signup failed");
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold text-center">
            {type === "login" ? "Login to your account" : "Create an Account"}
          </div>
          <div className="flex justify-center text-gray-500">
            {type === "login"
              ? "Don't have an Account?"
              : "Already have an account?"}
            <Link
              className="pl-2 underline"
              to={type === "login" ? "/signup" : "/login"}
            >
              {type === "login" ? "Signup" : "Login"}
            </Link>
          </div>
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <LabelInput
                label="Username"
                placeholder="Enter your username"
                type="email"
                onChange={(e) => {
                  setPostInput((prevstate) => ({
                    ...prevstate,
                    username: e.target.value,
                  }));
                }}
              />
              {type === 'signup' ? <LabelInput
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setPostInput((prevstate) => ({
                    ...prevstate,
                    name: e.target.value,
                  }));
                }}
              />:null}
              <LabelInput
                label="Password"
                placeholder="Enter your Password"
                type="password"
                onChange={(e) => {
                  setPostInput((prevstate) => ({
                    ...prevstate,
                    password: e.target.value,
                  }));
                }}
              />
              <div className="flex justify-center ">
                <button
                  onClick={sendReq}
                  type="button"
                  className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  {type === "login" ? "Login" : "Signup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelInterface {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInterface) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

{
  /* <div className="mb-4">
<label
  className="block text-gray-700 text-sm font-bold mb-2"
>
  Username
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="username"
  type="text"
  placeholder="Username"
/>
</div> */
}
