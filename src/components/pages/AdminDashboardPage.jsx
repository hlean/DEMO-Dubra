import { ArrowBigRight, Database, MapPinHouseIcon, PackageSearch, Phone, User } from 'lucide-react'
import ResponsiveNavBar from "../navbar/ResponsiveNavBar";
import { useEffect, useRef, useState } from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";

const AdminDashboardPage = () => {

    const fields=[
      {text: 'DashBoard', link:'/admin/dashboard', icon:<Database/> },
      {text: 'Gestioná tus Pedidos', link:'/admin/orderManager', icon:<PackageSearch/> },
      {text: 'Personalizá tu Perfil', link:'/admin/profile', icon:<User/> },
      {text: 'Ver Recorrido de Entregas', link:'/admin/map', icon:<MapPinHouseIcon/> },
    ];
  
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
  //POR EL MOMENTO PAGINA DE PRUEBA PARA QUE REDIGIRA A ALGUN LADO CON LOGIN Y REGISTER
  return (
    <div>
      <section className="bg-dubraText min-h-screen flex pt-25">
        
      <div className='grid grid-cols-6 w-full '>
        
        <ResponsiveNavBar
        fields={fields}
          menuRef={menuRef}
          className={`justify-start ${isOpen ? 'opacity-100 visible bg-black/50' : 'opacity-0 invisible'} `}
          Logo={true}/>

        <div className='sm:col-span-1 bg-dubraPrimary max-md:hidden'>

          <NavBar
          fields={fields}
          extraFields={[]}
          extraButton={[]}
          width={'full'}
          className={'flex-col py-5 w-full'}/>
          
        </div>

        <div className='md:col-span-5 max-md:col-span-6 w-full p-5'>
          <Outlet/>
        </div>
      </div>

      <div className="fixed h-full flex items-center pb-25">
        <div className="bg-dubraSecondary py-5 rounded-r hover:bg-dubraSecondary/80 md:hidden " onClick={() => setIsOpen(!isOpen)}>
          <ArrowBigRight/>
        </div>
      </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;