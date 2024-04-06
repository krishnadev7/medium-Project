export const Quote = ({type}:{type:"signup" | "login"}) => {
    return <div className="bg-slate-50 h-screen flex justify-center flex-col">
        <div className="justify-center flex">
                { type === "signup" ? 
                <img className="bg-cover rounded-xl drop-shadow-2xl w-10/12" src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?size=626&ext=jpg&ga=GA1.1.1745016484.1711949307&semt=ais" alt="signup image"  />
            :
            <img className="bg-cover rounded-xl drop-shadow-2xl  w-10/12" src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?w=740&t=st=1712383663~exp=1712384263~hmac=77e4653f510fe7547d19cac2052ffd851c04611186326f7a5ee19a2db28d875e" alt="login image"  />
            }
        </div>
    </div>
}