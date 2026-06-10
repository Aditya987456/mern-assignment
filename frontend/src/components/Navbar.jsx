import { CheckSquare } from "lucide-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  //---logout--- before that ask as well...
  const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.clear();
  navigate("/login");
};

  const name = localStorage.getItem("name");

  return (
    <nav className="border-b px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CheckSquare
          className="text-green-600"
          size={32}
        />

        <h1 className="text-3xl font-bold">
          Task
          <span className="text-green-600">
            Hub
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <p className="font-medium">
          Welcome,{" "}
          <span className="text-green-600">
            {name}
          </span>
        </p>

        <button
          onClick={handleLogout}
          className="border px-4 py-2 rounded-lg flex gap-2 items-center"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}