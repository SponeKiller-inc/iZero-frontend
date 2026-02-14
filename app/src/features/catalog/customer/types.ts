export interface CustomerData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface CustomerRecord extends CustomerData {
    id: number;
    data: CustomerData;
}