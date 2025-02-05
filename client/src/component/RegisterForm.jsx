import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, username })
            })
            if(res.status !== 200) {
                throw new Error("Register failed")
            }
            const result = await res.json()
            alert("Register success")
            navigate("/")
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div>
        <div className="w-md mx-auto mt-10 text-center bg-transparent border-[2px] border-solid border-[rgba(255,255,255,.1)] text-white px-8 py-10 rounded-xl">
                <form onSubmit={handleRegister}>
                    <h1 className="text-4xl text-center">Register</h1>
                    <div className="relative w-full h-12 my-8">
                        <input className="w-full h-full bg-transparent border-none outline-none border-2 border-white rounded-r-4xl text-2xl text-white pt-5 pr-11 pb-5 pl-5 placeholder:text-white" 
                        type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <MdEmail className="absolute right-3 top-[10%] transform translate-[50%] text-2xl"/>
                    </div>
                    <div className="relative w-full h-12 my-8">
                        <input className="w-full h-full bg-transparent border-none outline-none border-2 border-white rounded-r-4xl text-2xl text-white pt-5 pr-11 pb-5 pl-5 placeholder:text-white" 
                        type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                        <IoPerson className="absolute right-3 top-[10%] transform translate-[50%] text-2xl"/>
                    </div>
                    <div className="relative w-full h-12 my-8">
                        <input className="w-full h-full bg-transparent border-none outline-none border-2 border-white rounded-r-4xl text-2xl text-white pt-5 pr-11 pb-5 pl-5 placeholder:text-white" 
                        type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <FaLock className="absolute right-3 top-[10%] transform translate-[50%] text-2xl"/>
                    </div>
                    <button type="submit" className="w-full h-11 bg-white border-none outline-none rounded-4xl cursor-pointer text-gray-600 shadow-xl font-bold">Register</button>
        
                    <div className="text-center mt-5 mb-4">
                        <p>Have an account? <Link to="/" className="text-white no-underline font-semibold hover:underline">Login</Link></p>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default RegisterForm