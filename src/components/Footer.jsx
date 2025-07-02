import React from 'react'
import { Phone, MapPin, Mail, Hop } from 'lucide-react'
import { NavigationMenuList, NavigationMenu } from './ui/navigation-menu'
import NavBarButton from './navbar/NavBarButton'
import SocialButton from './SocialButton'

NavBarButton

const Footer = () => {
  return (
    <footer className='grid bg-dubraPrimary p-5 grid-cols-6 gap-5 text-lg '>
        <div className='max-md:col-span-6 md:col-span-3 px-3'>
            <p className='font-black text-xl pb-5'>DUBRA <br/> Transporte y Logística</p>
            <p>Soluciones de transporte y logística para empresas en Ciudad de la Costa - Montevideo.</p>
                <div className='py-2 gap-3 flex'>
                    <SocialButton alt={'whatsapp'} backgroundColor={'bg-dubraSecondary hover:bg-dubraSecondary/80'} url={'https://wa.link/j4qyez'}/>
                    <SocialButton alt={'instagram'} backgroundColor={'bg-dubraSecondary hover:bg-dubraSecondary/80'} url={'https://www.instagram.com/dubra_transporte_y_logistica?igsh=MTNnaWMwdjhubHJxcA=='}/>
                </div>
            </div>
        <div className='max-md:col-span-5 md:col-span-1 px-3'>
            <p className='text-lg pb-6 font-bold'>Enlaces Rápidos</p>
            <NavigationMenu>
                <NavigationMenuList className='flex-col items-start'>
                    <NavBarButton text={'Inicio'} link={'/'}/>
                    <NavBarButton text={'Sobre Nosotros'} link={'#'}/>
                    <NavBarButton text={'Programar un envio'} link={'#'}/>
                </NavigationMenuList>
            </NavigationMenu>
            
        </div>
        <div className='max-md:col-span-6 md:col-span-2 px-3'>
            <p className='text-xl font-bold pb-5'>Contacto</p>
                <div className='flex gap-3'>
                    <MapPin/>
                    <p className='pb-2'>Ciudad de la Costa - Canelones - Uruguay</p>
                </div>

                <div className='flex gap-3'>
                    <Phone/>
                    <p className='pb-2'>095 689 001</p>
                </div>

                <div className='flex gap-3'>
                    <Mail/>
                    <a href='mailto:dubratransporte@gmail.com' className='pb-2 underline-offset-2 underline'>dubratransporte@gmail.com</a>
                </div>
                 
        </div>
    </footer>
  )
}

export default Footer