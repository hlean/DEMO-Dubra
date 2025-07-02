import React from 'react'
import NavBarButton from './NavBarButton'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import DubraLogo from '../DubraLogo'

const ResponsiveNavBar = ({menuRef, fields, className, Logo}) => {
  return (
    <div className={`fixed top-0 w-full md:sr-only z-50 h-dvh transition-all duration-300 flex justify-end ${className}`}>
                <div ref={menuRef}
                 className='w-2/3 max-w-xs bg-dubraPrimary' >
                    <NavigationMenu>
                        <ul className="py-5 px-5 flex flex-col gap-5">
                          {Logo && <DubraLogo/>}
                          {fields.map(({icon, link, text}, index) => (
                            <NavBarButton key={link+index} icon={icon && icon} link={link} text={text}/>
                          ))}
                        </ul>
                    </NavigationMenu>
                </div>
            </div>
  )
}

export default ResponsiveNavBar