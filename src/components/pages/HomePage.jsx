import React, { useState } from 'react';
import HeroSection from '../HeroSection'
import ServiceCard from '../ServiceCard'
import camioneta from '@/assets/DubraCamioneta1.png'
import { Truck, FileText, PackageOpen, History } from 'lucide-react'
import TrackingInputGroup from '../TrackingInputGroup'
import ShippingCard from '../ShippingCard'
import CardGrid from '../CardGrid'
import { API_BASE_URL } from '../../lib/constants';

const HomePage = () => {

  const [shippingData, setShippingData] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async (trackingId) => {
    setError('');
    setShippingData(null);

    try {
      const res = await fetch(`${API_BASE_URL}/shippings/${trackingId}`);
      if (!res.ok) throw new Error('No encontrado en la API');

      const data = await res.json();
      setShippingData(data);
    } catch (err) {
      setError('No se encontró el envío con ese número de rastreo.');
    }
  };


  const handleCloseCard = () => {
    setShippingData(null);
  };


  return (
    <div className='pt-25'>
      <HeroSection
        imageSrc={camioneta}
        title={'SEGUÍ TU ENVÍO'}
        subtitle={'Ingresá el número de rastreo y conocé el estado de tu pedido.'}
        extraComponent={
          <div className="flex flex-col items-center w-full">
            <TrackingInputGroup onTrack={handleTrack} />
            {error && (
              <p className="mt-4 text-red-600 bg-red-100 px-4 py-2 rounded w-full max-w-md text-center shadow">
                ❗ {error}
              </p>
            )}
            {shippingData && <ShippingCard shipping={shippingData} onClose={handleCloseCard} />}
          </div>
        }
        background={'bg-dubraPrimary/80'}
        textColor={'text-dubraText'}
        centerContent={true} />

      <HeroSection
        title={'GESTIONÁ TU PEDIDO CON NOSOTROS'}
        background={'bg-dubraWhite'}
        textColor={'text-dubraPrimary'}
        customHeight='h-fit'
        extraComponent={
          <div className='flex h-full pb-5 flex-col justify-center items-center'>
            <CardGrid>
              <ServiceCard
                title={"Seguimiento de pedidos"}
                content={"Conocé el estado de tus envíos en todo momento."}
                icon={<Truck className='text-dubraSecondary' />}
                background={'outline-1 outline-dubraSecondary'}>
              </ServiceCard>

              <ServiceCard
                title={"Gestión de pedidos"}
                content={"Ingresá y gestioná tus pedidos de forma sencilla."}
                icon={<PackageOpen className='text-dubraSecondary' />}
                background={'outline-1 outline-dubraSecondary'}>
              </ServiceCard>

              <ServiceCard
                title={"Historial de pedidos"}
                content={"Accedé a tu historial de pedidos en tiempo real."}
                icon={<History className='text-dubraSecondary' />}
                background={'outline-1 outline-dubraSecondary'}>
              </ServiceCard>

              <ServiceCard
                title={"Documentación digital"}
                content={"Gestioná tus comprobantes y documentación online."}
                icon={<FileText className='text-dubraSecondary' />}
                background={'outline-1 outline-dubraSecondary'}>
              </ServiceCard>
            </CardGrid>
          </div>} />

      <HeroSection
        title={'NUESTRA MISIÓN'}
        extraComponent={
          <div className='text-center text-xl md:text-2xl my-5'>
            <p>Ofrecemos un servicio de transporte de mercadería confiable y eficiente para empresas que necesiten enviar o recibir paquetes en el día.
              <br /> Buscamos ser el nexo entre nuestros clientes, uniendo Montevideo y Ciudad de la Costa.</p>
          </div>}
        background={'bg-dubraPrimary'}
        customHeight='h-fit' />

      <HeroSection
        title={'¿POR QUÉ ELEGIRNOS?'}
        background={'bg-dubraWhite'}
        textColor={'text-dubraPrimary'}
        customHeight='h-fit'
        extraComponent={
          <div className='flex h-full pb-5 flex-col justify-center items-center'>
            <CardGrid>
              <ServiceCard
                title={"El tiempo es clave"}
                content={"Ofrecemos una entrega garantizada en el mismo día para que tus envíos lleguen sin retrasos."}
                icon={<Truck className='text-dubraSecondary' />}
                background={'bg-dubraWhite outline-1 outline-dubraPrimary'}>
              </ServiceCard>

              <ServiceCard
                title={" Confianza y seguridad"}
                content={"Cada paquete es tratado con el máximo cuidado, asegurando su integridad durante todo el recorrido."}
                icon={<PackageOpen className='text-dubraSecondary' />}
                background={'bg-dubraWhite outline-1 outline-dubraPrimary'}>
              </ServiceCard>

              <ServiceCard
                title={"Eficiencia"}
                content={"Optimización de rutas y recursos para la mejor relación costo-beneficio"}
                icon={<History className='text-dubraSecondary' />}
                background={'bg-dubraWhite outline-1 outline-dubraPrimary'}>
              </ServiceCard>

              <ServiceCard
                title={" Atención personalizada"}
                content={" Garantizamos una comunicación fluida para coordinar el retiro/entrega de tus paquetes. "}
                icon={<FileText className='text-dubraSecondary' />}
                background={'bg-dubraWhite outline-1 outline-dubraPrimary'}>
              </ServiceCard>

            </CardGrid>
          </div>} />
    </div>
  )
}

export default HomePage
