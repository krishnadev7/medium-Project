import { Link } from "react-router-dom";

export const Auth = ({type} : {type: "signup"|"login"}) => {
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold text-center">
            Create an Account
          </div>
          <div className="">Already have an account? 
          <Link className="pl-2 underline" to={"/Login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
