import React, { useEffect, useRef, useState } from 'react'
import NavBar from './navbar/NavBar'
import { AlignJustify, Database, DoorOpen, Home, Truck, User2 } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '@/context/AuthContext'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const {user, logout} = useAuth(); 

  const HandleLogOut = async () =>{
   await logout();}
  

  const extraFields = [
    user ? {text: 'Programá tu envío', link: '/user/placeOrder', icon:<Truck/>} : {text: 'Programá tu envío', link: '/login', icon:<Truck/>},
    !user && {text: 'Iniciá Sesión', link: '/login', icon:<User2/>},
    user && {text: 'Cerrar Sesión', link: '/', icon:<DoorOpen/>, onClick: () => HandleLogOut()},
  ].filter(Boolean);

  const fields = [
    { text: 'Inicio', link: '/', icon:<Home/> },
    user && { text: 'Dashboard', link: '/user/dashboard', icon:<Database/> },
  ].filter(Boolean);

  return (
    <header className='w-full fixed bg-dubraPrimary px-5 lg:px-[15vh] outline-1 py-1 z-20'>
      <NavBar
      fields={fields}
      extraFields= {extraFields}
      extraButton={
        <Button className='bg-dubraSecondaryHover p-0 md:sr-only'  onClick={() => setIsOpen(!isOpen)}>
          <AlignJustify className='w-fit h-fit' size={28}/>
        </Button>
      }
      menuRef={menuRef}
      isOpen={isOpen}
      Logo={true}/>
    </header>
        
  )
}

export default Header