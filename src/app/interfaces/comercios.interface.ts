import { Categoria } from "./categorias.interface";
import { Filial } from "./filiales.interface";

export interface Comercio {
    id:          number;
    comercioId:  number;
    nombre:      string;
    direccion:   string;
    filialId:    number;
    promocionId: number;
}


export interface ComercioData {
    filial: Filial,
    categoria: Categoria,
    comercios: Comercio[]
}