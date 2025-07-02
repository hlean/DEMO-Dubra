import React from 'react';
import { NavigationMenu,
        NavigationMenuList,
        NavigationMenuItem,
 } from '../ui/navigation-menu'
import NavBarButton from './NavBarButton'
import { Link } from 'react-router-dom';
import ResponsiveNavBar from './ResponsiveNavBar';
import DubraLogo from '../DubraLogo';
import NavBarExtraButton from './NavBarExtraButton';


const NavBar = ({fields, extraFields, extraButton, menuRef, isOpen, Logo, className, width}) => {


  return (
<div>
        <NavigationMenu className='justify-between min-w-full bg-dubraPrimary py-2'>

            {Logo && 
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to='/'>
                        <DubraLogo className={'w-70 h-22 pe-10 object-contain'}/>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>}

            {/*NavBar for medium display and bigger.*/}
            <div className={`'flex items-center w-${width? width: 'fit'} h-fit'`}> 

                {extraButton && extraButton}

                <ul className='w-full'>
                    <div className={`max-md:sr-only md:flex md:flex-row gap-5 items-center ${className}`}>
                        {fields.map(({link, text, icon}, index) => (
                            <NavBarButton key={link+index} text={text} link={link} icon={icon && icon}/>
                        ))}
                        {extraFields && extraFields.map(({link, text, icon, onClick}, index) => (
                            <NavBarExtraButton 
                            link={link}
                            text={text.toUpperCase()}
                            key={link+index}
                            onClick={onClick}
                            />
                        ))}
                    </div>
                </ul>
            </div>

        </NavigationMenu>
            {/*NavBar for smaller than medium display.*/}
        <ResponsiveNavBar
            fields={
                fields.concat(extraFields)
            }
            className={` right-0 ${isOpen ? 'opacity-100 visible bg-black/50' : 'opacity-0 invisible'} `}
            menuRef={menuRef}
            Logo={true}
        />
    </div>
  )
}

export default NavBar