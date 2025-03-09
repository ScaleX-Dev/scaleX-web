const Navbar = () => {
    return (
      <nav className="  fixed top-0 left-0 right-0 pt-5 flex justify-center items-center z-100">
        <div className="flex shadow-2xl bg-[#FAFAFA] rounded-full py-3 px-6 justify-between items-center w-7/10 max-w-screen-lg">
          <a href="/"><h1 className="text-primary-green text-2xl font-bold bg-black rounded-full px-4">ScaleX</h1></a>
          <div className="hidden 900:flex space-x-6">
            <a href="/" className="hover:text-gray-300 text-sm font-regular text-black">Home</a>
            <a href="/about" className="hover:text-gray-300 text-sm font-regular text-black">Who We Are?</a>
            <a href="/projects" className="hover:text-gray-300 text-sm font-regular text-black">Projects</a>
            <a href="/blogs" className="hover:text-gray-300 text-sm font-regular text-black">Blogs</a>
          </div>
          <a href="/contact" className="bg-primary-green text-black px-4 py-2 rounded-full hover:bg-green-300 transition text-sm md:px-6">
            Contact Us
          </a>
          <button className="md:hidden text-black p-2">☰</button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;