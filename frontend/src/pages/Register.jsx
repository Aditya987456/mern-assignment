import { Link } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../config";





export default function Register() {

    const navigate = useNavigate();

    const [loading, setLoading]=useState(false);
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]:
            e.target.value,
        }));
    };



//-when clicked on register button.
    const handleRegister = async (e) =>{
        e.preventDefault();
        setLoading(true);

        try {
            
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password.trim(),
            };
            if (!payload.name || !payload.email || !payload.password) {
                return toast.error("All fields are required");
            }

            toast.loading("Creating your account...",{ id: "signup" });

            const response = await axios.post(`${backendUrl}/api/user/register`,
                payload
            )

            toast.success(response.data.message || 'Registration successfull', { id: "signup" });
            navigate('/login');


            
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;

                if (status === 400) {
                    toast.error("Invalid input formate", { id: "signup" });
                } 
                else if (status === 409) {
                    toast.error("User already exist", { id: "signup" });
                } 
                else{
                    toast.error("Internal server error", { id: "signup" });
                } 
                
                } else {
                //for the network error - like fallback.
                toast.error("Server not reachable or unexpected error!", { id: "signup" });
                }
                }finally{
                    setLoading(false)
                }
        }
    









  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left */}
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
            Enter your details to sign in
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded-md p-3"
            />

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
                className="w-full  cursor-pointer bg-green-600 text-white py-3 rounded-md"
                >
                {loading
                    ? "Creating Account..."
                    : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <Link
                to="/login"
                className="text-green-600 font-medium"
                >
                Login
            </Link>

          </p>
        </div>
      </div>
    </div>
  );
}