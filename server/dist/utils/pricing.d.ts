export declare const calculatePrice: (departureCity: string, destinationCity: string, passengers: number) => number;
export declare const getPriceBreakdown: (departureCity: string, destinationCity: string, passengers: number) => {
    distance: number;
    baseFare: number;
    distanceCost: number;
    subtotal: number;
    passengerCost: number;
    fee: number;
    total: number;
};
//# sourceMappingURL=pricing.d.ts.map