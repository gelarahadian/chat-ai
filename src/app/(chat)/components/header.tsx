'use client'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/src/components/ui/menubar';
import { useSidebar } from '@/src/components/ui/sidebar';
import { Ellipsis } from 'lucide-react';


const Header = () => {
      const { open } = useSidebar();
  return (
    <div
      className={` ${
        open ? "left-64" : "left-12"
      } transition-all duration-200 ease-linear bg-white z-10 border-b fixed top-0 right-0 `}
    >
      <Menubar className='border-none justify-end'>
        <MenubarMenu>
          <MenubarTrigger>
            <Ellipsis />
          </MenubarTrigger>
          <MenubarContent>
           
            <MenubarItem>Share</MenubarItem>
            <MenubarItem className='text-red-500'>Delete</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Header