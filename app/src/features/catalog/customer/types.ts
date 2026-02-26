export interface CustomerData {
    name: string;
    surname: string;
    birthday: string
    email: string;
    phone: string;
    address: string;
}

export interface CustomerRecord extends CustomerData {
    id: number;
}