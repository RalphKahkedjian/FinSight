import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Navbar() {

const navigate = useNavigate();

const [modal, setModal] = useState(null);

const handleLogout = () => {

```
localStorage.removeItem("token");

setModal({
  type: "success",
  message: "Logged out successfully"
});

setTimeout(() => {
  navigate("/login");
}, 1200);
```

};

return (

<>

  <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">

    <div>

      <h1 className="text-2xl font-bold text-gray-900">
        FinSight
      </h1>

      <p className="text-xs text-gray-500 mt-0.5">
        Personal Finance
      </p>

    </div>

    <button
      onClick={handleLogout}
      className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
    >
      Logout
    </button>

  </nav>

  {modal && (

    <Modal
      type={modal.type}
      message={modal.message}
      onClose={() => setModal(null)}
    />

  )}

</>


);

}

export default Navbar;
