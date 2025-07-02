import React from 'react';
import ServiceCard from '../ServiceCard';
import { ArrowBigRight, PackageSearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentOrders = ({ linkTo /*, Orders*/ }) => {
  const Orders = [
    { icon: <PackageSearchIcon className='text-dubraSecondary'/>, title: 'Orden 8472389', description: new Date() },
    { icon: <PackageSearchIcon className='text-dubraSecondary'/>, title: 'Orden 8472390', description: new Date() },
    { icon: <PackageSearchIcon className='text-dubraSecondary'/>, title: 'Orden 8472391', description: new Date() },
  ];

  const showMakeOrderCard = Orders.length < 3;

  return (
    <div className='h-fit flex flex-col gap-3 text-center border p-5 rounded-xl bg-dubraPrimary items-center'>
      <h2 className='text-2xl'>Órdenes Recientes</h2>

      {Orders.length > 0 ? (
        Orders.map(({ title, icon, description }, index) => (
          <ServiceCard
            key={index}
            icon={icon}
            title={title}
            description={description.toLocaleDateString() /*Opcional, agregar */}
            background='outline bg-dubraWhite'
          />
        ))
      ) : (
        <ServiceCard
          icon={<PackageSearchIcon className='text-dubraSecondary' />}
          title='Hacé Tu Pedido.'
          description='¿No tenés pedidos? ¡Hacé uno!'
          background='outline bg-dubraWhite'
        />
      )}

      {showMakeOrderCard && (
        <ServiceCard
          icon={<PackageSearchIcon className='text-dubraSecondary' />}
          title='Hacé Tu Pedido.'
          description='¡Completá tu próxima orden!'
          background='outline bg-dubraWhite'
        />
      )}

      <div className='text-lg underline underline-offset-2 text-blue-500 flex items-center gap-2'>
        <ArrowBigRight />
        <Link to={linkTo}>Ir a Pedidos</Link>
      </div>
    </div>
  );
};

export default RecentOrders;
