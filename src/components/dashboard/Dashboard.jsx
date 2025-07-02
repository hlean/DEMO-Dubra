import React from 'react'
import DashboardMetrics from './DashboardMetrics'
import RecentOrders from './RecentOrders'


const Dashboard = () => {
  return (
    <div className='items-center flex flex-col gap-5'>
        <DashboardMetrics/>
        <div className='grid grid-cols-3 w-full max-md:gap-5'>
          <div className='max-md:col-span-3 max-2xl:col-span-2 2xl:col-span-1 flex justify-center items-center'>
            
          </div>
          
          <div className='max-md:col-span-3 max-2xl:col-span-2 2xl:col-span-1 flex justify-center items-center'>
            <RecentOrders link={'/orderManager'}/>
          </div>
        </div>

    </div>
  )
}

export default Dashboard