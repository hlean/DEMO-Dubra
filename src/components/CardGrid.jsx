import React from 'react'

const CardGrid = ({children}) => {
  return (
    // Grid for 4 ServiceCards 
    <div className='grid p-5 md:grid-cols-2 2xl:grid-cols-4 gap-10'>
        {children}
    </div>
  )
}

export default CardGrid