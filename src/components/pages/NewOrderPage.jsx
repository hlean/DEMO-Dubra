import React from 'react'
import HeroSection from '../HeroSection'
import PlaceOrderForm from '../PlaceOrderForm'

const NewOrderPage = () => {
  return (
    <div className='h-full'>
          <HeroSection
          extraComponent={<PlaceOrderForm/>}
          background={'bg-gradient-to-br from-dubraText to-dubraPrimary'}
          customHeight=' h-full '
          centerContent={true}
          textColor={'text-dubraPrimary'}
          />
    </div>
  )
}

export default NewOrderPage