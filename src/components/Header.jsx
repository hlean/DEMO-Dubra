import React, { useEffect, useRef, useState } from 'react'
import NavBar from './navbar/NavBar'
import { AlignJustify, Home } from 'lucide-react'
import { Button } from './ui/button'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Cierra el menú
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className='w-full fixed bg-dubraPrimary px-5 lg:px-[15vh] outline-1 py-1 z-20'>
      <NavBar
      fields={[
        { text: 'Inicio', link: '/', icon:<Home/> }

      ]}
      extraFields={[
        {text: 'PROGRAMÁ TU ENVÍO', link: '/login'},
        {text: 'INICIÁ SESIÓN', link: '/login'}]}
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