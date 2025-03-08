import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async() => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="search" width={14} height={14} />
        <input type="text" placeholder="Search" className="w-[200px] p-2 bg-transparent outline-none"/>
      </div>
      {/* Icon & User */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="message" width={20} height={20} />
        </div>
        <div className="relative bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/announcement.png" alt="announcement" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">1</div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">Jhon Doe</span>
            <span className="text-[10px] text-gray-500 text-right">{role}</span>
        </div>
        {/* <Image src="/avatar.png" alt="avatar" width={36} height={36} /> */}
        <UserButton/>
      </div>
    </div>
  );
};

export default Navbar;
