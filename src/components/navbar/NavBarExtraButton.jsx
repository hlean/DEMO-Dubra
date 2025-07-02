import { NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const NavBarExtraButton = ({icon, text, onClick, link}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className="flex-row flex gap-1 items-center">
            <Link
            to={link}
            className={`text-xl`}
            >
                <Button className='text-base bg-dubraSecondary hover:bg-dubraSecondary/80 p-3 font-bold' onClick={onClick}>
                    {icon}
                    {text}
                </Button>
            </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export default NavBarExtraButton