import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
// Routes
import bookingRoutes from './routes/bookings.js';
import paymentRoutes from './routes/payments.js';
import contactRoutes from './routes/contact.js';
import citiesRoutes from './routes/cities.js';
import reviewRoutes from './routes/reviews.js';
// Middleware
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/reviews', reviewRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use(errorHandler);
const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✓ Database connected');
        // Seed cities if they don't exist
        const citiesCount = await prisma.city.count();
        if (citiesCount === 0) {
            await prisma.city.createMany({
                data: [
                    { name: 'Casablanca', region: 'Casablanca-Settat', latitude: 33.5731, longitude: -7.5898 },
                    { name: 'Rabat', region: 'Rabat-Salé-Zemmour-Zaèr', latitude: 34.0209, longitude: -6.8416 },
                    { name: 'Marrakech', region: 'Marrakech-Tensift-El Haouz', latitude: 31.6295, longitude: -8.0088 },
                    { name: 'Fes', region: 'Fès-Boulemane', latitude: 34.0331, longitude: -5.0033 },
                    { name: 'Tangier', region: 'Tanger-Tétouan', latitude: 35.7595, longitude: -5.8340 },
                    { name: 'Agadir', region: 'Souss-Massa-Drâa', latitude: 30.4278, longitude: -9.5981 },
                    { name: 'Meknes', region: 'Fès-Boulemane', latitude: 33.8869, longitude: -5.5472 },
                    { name: 'Oujda', region: 'Oriental', latitude: 34.6837, longitude: -1.9113 },
                    { name: 'Kenitra', region: 'Rabat-Salé-Zemmour-Zaèr', latitude: 34.2636, longitude: -6.5898 },
                    { name: 'Tetouan', region: 'Tanger-Tétouan', latitude: 35.3009, longitude: -5.3658 },
                ],
            });
            console.log('✓ Cities seeded');
        }
        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
            console.log(`✓ API available at http://localhost:${PORT}/api`);
        });
    }
    catch (error) {
        console.error('✗ Failed to start server:', error);
        process.exit(1);
    }
};
// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=index.js.map