
export interface DashboardSummaryResponse {
    numberOfOrders:          number;
    paidOrders:              number;
    numbersOfClients:        number;
    numberOfProducts:        number;
    productsWithOutOffStock: number;
    productsWithLowStock:    number;
    notPaidOrders:           number;
}
