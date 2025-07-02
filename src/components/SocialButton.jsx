import React from 'react'
import { Button } from './ui/button'
import { SocialIcon } from 'react-social-icons'

const SocialButton = ({alt, backgroundColor, url}) => {
  return (
    <Button alt={alt} className='rounded-full w-fit h-fit p-0'>
        <SocialIcon className={`${backgroundColor} rounded-full`} bgColor='none' url={url} network={alt} target="_blank"/>
    </Button>
  )
}

export default SocialButton