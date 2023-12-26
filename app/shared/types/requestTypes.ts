export type CartUpdate = {
    id?: string,
    customerId?: string,
    products: string[],
    total: number,
}