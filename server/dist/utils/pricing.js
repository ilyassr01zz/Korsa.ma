// Grand taxi pricing based on routes and distance
// This is a simplified pricing model - adjust based on actual costs
const PRICING_CONFIG = {
    baseFare: 50, // MAD
    perKm: 1.5, // MAD per km
    passengerMultiplier: 1, // For grand taxi (shared), this would be shared cost
};
// Distance matrix (simplified - in production, use Google Maps API)
const DISTANCE_MATRIX = {
    'Casablanca': { 'Marrakech': 248, 'Fes': 472, 'Tangier': 614, 'Rabat': 91, 'Agadir': 508 },
    'Marrakech': { 'Casablanca': 248, 'Agadir': 264, 'Fes': 472, 'Essaouira': 160 },
    'Fes': { 'Casablanca': 472, 'Marrakech': 472, 'Tangier': 310, 'Meknes': 61, 'Oujda': 470 },
    'Tangier': { 'Casablanca': 614, 'Fes': 310, 'Tetouan': 60, 'Rabat': 512 },
    'Rabat': { 'Casablanca': 91, 'Tangier': 512, 'Fes': 450, 'Kenitra': 40 },
    'Agadir': { 'Marrakech': 264, 'Casablanca': 508, 'Essaouira': 175 },
};
export const calculatePrice = (departureCity, destinationCity, passengers) => {
    const key = `${departureCity}-${destinationCity}`;
    const distance = DISTANCE_MATRIX[departureCity]?.[destinationCity] || 300; // Default 300km if not found
    const basePrice = PRICING_CONFIG.baseFare + distance * PRICING_CONFIG.perKm;
    // For grand taxis, typically 6 passengers share the cost
    const pricePerPassenger = basePrice / 6;
    const totalPrice = pricePerPassenger * passengers;
    // Add 10% margin for system (booking fee)
    return Math.round(totalPrice * 1.1);
};
export const getPriceBreakdown = (departureCity, destinationCity, passengers) => {
    const distance = DISTANCE_MATRIX[departureCity]?.[destinationCity] || 300;
    const baseFare = PRICING_CONFIG.baseFare;
    const distanceCost = distance * PRICING_CONFIG.perKm;
    const subtotal = baseFare + distanceCost;
    const perPassenger = subtotal / 6;
    const passengerCost = perPassenger * passengers;
    const fee = passengerCost * 0.1;
    const total = passengerCost + fee;
    return {
        distance,
        baseFare,
        distanceCost,
        subtotal,
        passengerCost,
        fee,
        total: Math.round(total),
    };
};
//# sourceMappingURL=pricing.js.map