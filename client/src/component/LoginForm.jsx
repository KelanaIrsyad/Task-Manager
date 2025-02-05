import { useState, useContext } from "react";
import AuthContext from "../contex/AuthContex";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

function LoginForm() {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            if(res.status !== 200) {
                throw new Error("Login failed")
            }
            const result = await res.json()
            login(result)
            console.log(res.data)
            alert("Login success")
            navigate("/home")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        }
    }

  return (
    
    <div className="w-md mx-auto mt-16 text-center bg-transparent border-[2px] border-solid border-[rgba(255,255,255,.1)] text-white px-8 py-10 rounded-xl">
        <form onSubmit={handleLogin}>
            <h1 className="text-4xl text-center">Login</h1>
            {error && <p className="text-red-600">{error}</p>}
            <div className="relative w-full h-12 my-8">
                <input className="w-full h-full bg-transparent border-none outline-none border-2 border-white rounded-r-4xl text-2xl text-white pt-5 pr-11 pb-5 pl-5 placeholder:text-white" 
                type="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                <MdEmail className="absolute right-3 top-[10%] transform translate-[50%] text-2xl"/>
            </div>
            <div className="relative w-full h-12 my-8">
                <input className="w-full h-full bg-transparent border-none outline-none border-2 border-white rounded-r-4xl text-2xl text-white pt-5 pr-11 pb-5 pl-5 placeholder:text-white" 
                type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                <FaLock className="absolute right-3 top-[10%] transform translate-[50%] text-2xl"/>
            </div>
            <div className="flex justify-between -mt-3.5 mb-4">
                <label><input type="checkbox"  className="mr-1 accent-white" />Remember me</label>
                <a className="text-white hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full h-11 bg-white border-none outline-none rounded-4xl cursor-pointer text-gray-600 shadow-xl font-bold">Login</button>

            <div className="text-center mt-5 mb-4">
                <p>Dont have an account? <Link to="/register" className="text-white no-underline font-semibold hover:underline">Register</Link></p>
            </div>
        </form>
    </div>
  )
}

export default LoginForm