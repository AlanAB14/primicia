export interface Promocion {
    id:            number;
    fechaInicio:   Date;
    fechaFin:      Date;
    diasPromocion: string;
    promocion:     string | null;
    texto:         string;
    image:         string | null;
}
