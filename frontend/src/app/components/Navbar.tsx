const Navbar = () => {
    return (
        <nav className="flex items-center justify-between h-[64px] w-[60%]">
            <a href="/">
                <div className="text-sm font-bold py-2 px-3 rounded-[5px] text-center flex items-center gap-1">
                    <h2>TimeIt</h2>
                    <div className="w-[20px] h-[20px] rounded-full bg-[#22D172]">
                        <div className="w-[10px] h-[13px] rounded-full bg-white"></div>
                    </div>
                </div>
            </a>
            <ul className="flex space-x-4">
                <li>
                    <a href="/login" className="text-sm font-bold py-2 px-3 border rounded-[5px] text-gray-[#596878] w-[90px] text-center">
                        Log In
                    </a>
                </li>
                <li>
                    <a href="/register" className="text-sm font-bold py-2 px-3 bg-[#22D172] rounded-[5px] text-white w-[90px] text-center">
                        Sign Up
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;