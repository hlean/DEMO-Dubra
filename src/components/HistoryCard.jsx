import { History, Package } from 'lucide-react'
import React from 'react'
import OrderCard from './OrderCard'

const HistoryCard = () => {

  /*model Order {
  id                    Int                     @id @default(autoincrement())
  description           String
  userId                Int
  user                  User                    @relation(fields: [userId], references: [id], map: "Order_usuarioId_fkey")
  createdAt             DateTime                @default(now())
  updatedAt             DateTime
  shippings             Shipping[]
  ShippingStatusHistory ShippingStatusHistory[]

  @@index([userId], map: "Order_userId_fkey")
} */

    const OrdersArray = [
        {user: user, createdAt:Date.now(), shippingsAmount: 5, orderStatus: 'Pendiente', orderId:1},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Pendiente', orderId:2},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
        {user: user, createdAt:Date.now(), shippingsAmount: 2, orderStatus: 'Entregado', orderId:3},
    ]

  return (
    <div className='w-10/12 bg-dubraPrimary rounded-xl p-6'>
        <h1 className='flex text-5xl items-center border-b mb-5 border-dubraText/25'> <History className='h-10 w-10'/> Historial</h1>
        <div className='grid min-xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1  w-full gap-3'>
            {OrdersArray.map(order => (
            <OrderCard
            userName={user && order.user.email}
            createdAt={order.createdAt}
            shippingsAmount={order.shippingsAmount}
            orderStatus={order.orderStatus}
            orderId={order.orderId}
            icon={<Package/>}/>)
            
            )}
        </div>
        
    </div>
  )
}

export default HistoryCard