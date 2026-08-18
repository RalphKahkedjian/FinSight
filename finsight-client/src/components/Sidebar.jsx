import { Link, useLocation } from "react-router-dom";

function Sidebar() {

const location = useLocation();

const links = [
{
name: "Dashboard",
path: "/"
},
{
name: "Transactions",
path: "/transaction"
},
{
  name: "Forecast",
  path: "/forecast"
},
{
name: "Profile",
path: "/profile"
}
];

return ( <aside className="w-64 bg-white min-h-[calc(100vh-73px)] border-r border-gray-200 px-5 py-6">

  <div className="flex flex-col gap-2">

    {links.map((link) => {

      const isActive = location.pathname === link.path;

      return (
        <Link
          key={link.path}
          to={link.path}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          {link.name}
        </Link>
      );

    })}

  </div>

</aside>


);
}

export default Sidebar;
