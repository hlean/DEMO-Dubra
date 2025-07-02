import React from 'react'
import ServiceCard from '../ServiceCard'
import { Ban, Calendar, ChartLine, Clock, DollarSign, ScrollText, Truck, UserRoundCheckIcon } from 'lucide-react'

const DashboardMetrics = () => {
  return (
    <div className=' w-full items-center flex flex-col'>
{/* 
      <div className='grid p-5 lg:grid-cols-2 2xl:grid-cols-4 gap-10 w-full max-md:justify-center'>

        <ServiceCard
          title='Cantidad Pedidos'
          description='5'
          icon={<Truck/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

        <ServiceCard
          title='Pedidos Activos'
          description='1'
          icon={<Clock/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

        <ServiceCard
          title='Pedidos Entregados'
          description='4'
          icon={<UserRoundCheckIcon/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

        <ServiceCard
          title='Pedidos a Pagar'
          description='2'
          icon={<DollarSign/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

      </div> */}

      <div className='grid p-5 lg:grid-cols-2 2xl:grid-cols-4 gap-10 w-full max-md:justify-center'>

        <ServiceCard
          title='Pedidos Cancelados'
          description='0'
          icon={<Ban/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

        <ServiceCard
          title='Ultimo Pedido'
          description='25 / 5 / 2025'
          icon={<ScrollText/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

        <ServiceCard
          title='Pedidos Este Mes'
          description='3'
          icon={<Calendar/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

        <ServiceCard
          title='Total Gastado'
          description='3000 UYU'
          icon={<ChartLine/>}
          iconDiv={'rounded bg-dubraSecondary p-2'}
          background={'outline bg-dubraPrimary'}/>

      </div>

    </div>
  )  
}

export default DashboardMetrics