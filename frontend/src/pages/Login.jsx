import { Link, useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../config";


export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };


    const handleLogin = async (e)=>{
        e.preventDefault();

        const payload = {
            email: formData.email.trim().toLowerCase(),
            password: formData.password.trim(),
        };

        if(!payload.email  || !payload.password){
            return toast.error("All fields are required");
        }

        try {
            setLoading(true);

            toast.loading("Signing you in...", {id: "login",});

            const response = await axios.post(`${backendUrl}/api/user/login`,
                payload
            )

            const token = response.data.token;
            const name = response.data.name;
            localStorage.setItem("token", token);
            localStorage.setItem("name", name);

            toast.success(
              response.data.message ||
                "Login successful",
            {
            id: "login",
            }
         );

         navigate("/dashboard");
            
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;

                if (status === 400) {
                    toast.error("Invalid input formate", { id: "login" });
                }
                else if (status === 401) {
                    toast.error("Invalid credentials", { id: "login" });
                }  
                else if (status === 409) {
                    toast.error("User already exist", { id: "login" });
                } 
                else{
                    toast.error("Internal server error", { id: "login" });
                } 
                
            } else {
            //for the network error - like fallback.
            toast.error("Server not reachable or unexpected error!", { id: "login" });
            }
        }finally{
            setLoading(false)
        }

    }





  return (

    <div className="min-h-screen grid md:grid-cols-2">
      {/*------------------------ Left part---------------------*/}
      <div className="flex flex-col items-center justify-center px-10 border-r">
        <CheckSquare
          size={70}
          className="text-green-600 mb-4"
        />

        <h1 className="text-6xl font-bold">
          Task<span className="text-green-600">Hub</span>
        </h1>

        <p className="mt-6 text-center text-gray-500 max-w-md text-lg">
          Organize your tasks, track progress,
          and stay productive every day.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md border rounded-xl p-8">
          <h2 className="text-4xl font-bold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Sign in to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-md p-3"
            />

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-md p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-70"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}





