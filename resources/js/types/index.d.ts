export interface User {
    id: number;
    nombre: string;
    apellido: string;
    documento: string;
    tipo_documento: string;
    cuit_cuil: string;
    email: string;
    email_verified_at: string;
    isAdmin: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
