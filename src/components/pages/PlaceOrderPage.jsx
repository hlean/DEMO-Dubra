import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Search, PackagePlus, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { useNavigate } from 'react-router-dom' 
import { API_BASE_URL, STATUS_COLORS } from '../../lib/constants';

const ShipmentRow = ({ shipment }) => {
  const fecha = new Date(shipment.createdAt)
  const fechaStr = fecha.toLocaleDateString("es-AR")
  const horaStr = fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <TableRow>
      <TableCell className="font-extrabold">{shipment.trackingId || `#${shipment.id}`}</TableCell>
      <TableCell>
        <span className="block font-medium">{shipment.contactName || "Sin nombre"}</span>
      </TableCell>
      <TableCell>
        <div className="text-xs flex items-center gap-1">
          {fechaStr} - {horaStr}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm flex items-center gap-1">
          {shipment.fromAddress || "-"}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm flex items-center gap-1">
          {shipment.toAddress || "-"}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          className={`${STATUS_COLORS[shipment.status?.toLowerCase()] || "bg-gray-100 text-gray-800"} font-extrabold`}>
          {shipment.status || "N/A"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="font-medium">$1,000</div>
      </TableCell>
      <TableCell>
        {/* decidir que acciones mostrar en esta tabla
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>*/}
      </TableCell>
    </TableRow>
  )
}

export default function PlaceOrderPage() {
  const [shipments, setShipments] = useState([]) // Estado para guardar los envios
  const [searchTerm, setSearchTerm] = useState("") // Estado para el termino de busqueda que este poniendo en el input
  const [statusFilter, setStatusFilter] = useState("") // Estado para el filtro de estado, quye es el select
  const [offset, setOffset] = useState(0) // Estado para la paginacion, para saber desde que resultado empezar a mostrar y sirve para mostrar cantidad de resultados por pagina
  const [limit, setLimit] = useState(10) // Estado para el limite de resultados por pagina se marca el limte
  const [total, setTotal] = useState(0) // Estado para el total de envios que hay en la base de datos

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const query = new URLSearchParams(); // se contruye  la query para la url para hacer la peticion a la api
        if (searchTerm) query.append("search", searchTerm); // si hay un termino de busqueda en el search se agrega a la query
        if (statusFilter) query.append("status", statusFilter); // si hay un filtro de estado se agrega a la query
        query.append("limit", limit.toString()); // se agrega el limite de resultados por pagina a la query
        query.append("offset", offset.toString()); // se agrega el offset a la query para saber desde que resultado empezar a mostrar

        const res = await fetch(`${API_BASE_URL}/shippings?${query.toString()}`);
        const data = await res.json();

        setShipments(data.data); // se guarda en el estado los envios que vienen de la api
        setTotal(data.total || 0); // se guarda el total de envios que hay en la base de datos
      } catch (err) {
        console.error("Error al obtener envíos:", err);
      }
    };

    fetchShipments();
  }, [searchTerm, statusFilter, offset, limit]);

  return (
    <div className="items-center flex flex-col gap-8">
      <div className="flex flex-col gap-4 p-4 max-w-7xl mx-auto w-full">
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, id de pedido, dirección..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border py-2 rounded-md text-sm"
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_camino">En camino</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <Button variant="outline" onClick={() => navigate("/user/newOrder")}>
              <PackagePlus className="h-4 w-4" />
              Nuevo envío
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Envíos</CardTitle>
            <CardDescription>Todos tus envíos para que puedas buscar y filtrar fácilmente</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">Cliente</TableHead>
                  <TableHead className="font-bold">Creado</TableHead>
                  <TableHead className="font-bold">Recogida</TableHead>
                  <TableHead className="font-bold">Entrega</TableHead>
                  <TableHead className="font-bold">Estado</TableHead>
                  <TableHead className="font-bold">Valor</TableHead>
                  <TableHead className="font-bold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments && shipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No hay resultados para mostrar.
                    </TableCell>
                  </TableRow>
                ) : (
                  shipments && shipments.map((shipment) => (
                    <ShipmentRow key={shipment.id} shipment={shipment} />
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex justify-between items-center mt-4 px-4">
            <span className="text-sm">
              Mostrando {offset + 1} a {Math.min(offset + limit, total)} de {total} envíos 
            </span> 
            <div className="flex gap-2"> 
              <Button
                variant="outline"
                onClick={() => setOffset(Math.max(0, offset - limit))} // al hacer click en el boton anterior se resta el limite al offset
                disabled={offset === 0} // si el offset es 0, deshabilita el boton anterior
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() => setOffset(offset + limit)} // al hacer click en el boton siguiente se suma el limite al offset
                disabled={offset + limit >= total} // si el offset + el limite es mayor o igual al total, deshabilita el boton
              >
                Siguiente
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
