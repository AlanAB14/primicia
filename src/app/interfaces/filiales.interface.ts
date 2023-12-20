import { Categoria } from "./categorias.interface";
import { Comercio } from "./comercios.interface";

export interface Filial {
    id: number;
    localidad: string;
    direccion: string;
    email: string;
    telefono: string;
}

export interface FilialesData {
    localidad: string;
    datos: Comercio[];
}

interface Datos {
    categoria: Categoria;
    comercios: Comercio[];
}
