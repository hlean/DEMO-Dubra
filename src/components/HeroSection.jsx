import React from 'react'

const HeroSection = ({title, subtitle, extraComponent, imageSrc, background, textColor, centerContent, customHeight}) => {
  return (
    //Every section on the web have this structure:
    //'extraComponent', 'imageSrc', 'subtitle', 'centerContent', 'fit', 'textColor' tags are optional.
    <section className={`flex ${customHeight? customHeight : 'h-150'} w-full bg-cover bg-center justify-center items-center`} style={{ backgroundImage: `url(${imageSrc})` }}>

    <div className={`w-full h-full p-5 ${background} flex `}>
        <div className={`w-full flex items-center ${centerContent? 'justify-center':'pt-5'} ${textColor} flex-col`}>
          <div>
            <p className='md:text-6xl text-5xl text-center mb-3'>{title}</p>
            {subtitle && <p className='text-xl text-center'>{subtitle}</p>}
          </div>
            {extraComponent}
        </div>
    </div>

    </section>
  )
}

export default HeroSection