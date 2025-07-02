import React, { useState } from 'react'
import FormBuilder from './FormBuilder'
import { Button } from './ui/button'
import ModalPopUp from './ModalPopUp';
import GeocoderLeafletMap from './map/GeocoderLeafletMap';
import { Map, Minus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PlaceOrderForm = () => {

    const [fields, setFields] = useState([
        { name: 'RUT', label: 'RUT', type: 'text', placeholder: 'RUT' },
        { name: 'RUT2', label: 'RUT', type: 'text', placeholder: 'RUT' },
    ]); // Setting default values for fields
    const fieldsName = [
        {name: 'pickUpAddress', label: 'Dirección de Recogida', placeholder:'EJ: CALLE DE EJEMPLO 123', remove: false},
        {name: 'dropOffAddress', label: 'Dirección de Entrega', placeholder:'EJ: CALLE DE EJEMPLO 123', remove: true}
    ]

    const [isOpen, setIsOpen] = useState(false); // isOpen for ModalPopUp
    const [number, setNumber] = useState(0); // Personalized Id for Fields
    const [fieldId, setFieldId] = useState(''); // Control Modal value for field X

    const schemaFields = fields.reduce((acc, field) => {
        acc[field.name] = z.string().min(1, 'Este campo es obligatorio');
        return acc;
    }, {});

    const schema = z.object({
    RUT: z.string().min(1, 'El RUT es obligatorio'),
    ...schemaFields,
    });

    const { setValue, formState: { errors }, control, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { campos: [""] },
        mode: "onSubmit",
    });

    function setAdressValues(latlng, address){
        if (fieldId) {
            setValue(fieldId, address); // sets input value to address
            setIsOpen(!isOpen); // modal OFF
        }
    }

    function openModal(name){
        setFieldId(name); // store the id so the modal knows which input aim to when changing its value
        setIsOpen(!isOpen); // modal ON
    }

    function removeAddressField(fieldNumber){
            setFields(prevFields => {
            // prevFields is ALWAYS the latest version
            return prevFields.filter(field =>
                field.name !== `pickUpAddress${fieldNumber}` &&
                field.name !== `dropOffAddress${fieldNumber}`
            );
            });
    }

    function addFields() { // adds new fields to the form
        const currentNumber = number + 1;
            setFields([
                ...fields,
                ...fieldsName.map(field => ({
                    name: `${field.name}${currentNumber}`,
                    label: `${field.label} ${currentNumber}`,
                    type: 'text',
                    placeholder: `${field.placeholder}${currentNumber}`,
                    children: (
                    <div className='flex gap-2'>
                        <button
                        type='button'
                        className='bg-dubraSecondary p-1 rounded-sm'
                        onClick={() => openModal(`${field.name}${currentNumber}`)}
                        >
                        <Map />
                        </button>

                        {field.remove && (
                        <button
                            type='button'
                            id={`${field.name}${currentNumber}`}
                            onClick={() => removeAddressField(currentNumber)}
                        >
                            <Minus className='bg-red-500 rounded-full' />
                        </button>
                        )}
                    </div>
                    )
                }))
                ]);
            
        setValue(`pickUpAddress${currentNumber}`, '', { shouldValidate: false });
        setValue(`dropOffAddress${currentNumber}`, '', { shouldValidate: false });
        setNumber(number + 1);
        }
        

  return (
    <FormBuilder
    title='Realiza tu pedido'
    description=''
    background='bg-dubraPrimary'
    fields={fields}
    control={control}
    handleSubmit={handleSubmit}
    setValue={setValue}
    errors= {errors}
    children={
        <div className='col-span-2'>
            <div>
                <ModalPopUp
                children={<GeocoderLeafletMap
                    returnValues= {setAdressValues}/>}
                isOpen={isOpen}
                onClose={() => setIsOpen(!isOpen)}/>

            </div>
            <div className=' pt-3 '>
                
                    <div className='w-full flex justify-center'>
                        <Button id={'addAddressFields'} onClick={() => addFields()} className='bg-dubraSecondary' type='button'>
                            Agregar punto de Entrega.
                        </Button>
                        
                    </div>
                    <div className="w-full h-px mt-3 bg-dubraText/30"></div>
                    
            </div>
        </div>
        }
    />
  )
}

export default PlaceOrderForm
