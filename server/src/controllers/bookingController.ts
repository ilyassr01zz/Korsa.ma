import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createBookingSchema, CreateBookingInput } from '../utils/validation';
import { calculatePrice } from '../utils/pricing';
import { sendBookingConfirmation } from '../utils/email';

const prisma = new PrismaClient();

// Generate unique booking number
const generateBookingNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KRS-${timestamp}-${random}`;
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const validatedData = createBookingSchema.parse(req.body);

    // Check if cities exist
    const [departureCity, destinationCity] = await Promise.all([
      prisma.city.findFirst({ where: { name: validatedData.departureCity } }),
      prisma.city.findFirst({ where: { name: validatedData.destinationCity } }),
    ]);

    if (!departureCity || !destinationCity) {
      return res.status(400).json({ error: 'Invalid departure or destination city' });
    }

    // Calculate price
    const totalPrice = calculatePrice(
      validatedData.departureCity,
      validatedData.destinationCity,
      validatedData.passengers
    );

    // Create or get user
    let user = await prisma.user.findFirst({
      where: { email: validatedData.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: validatedData.email,
          phone: validatedData.phone,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
        },
      });
    }

    // Create booking
    const bookingNumber = generateBookingNumber();
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        userId: user.id,
        departureCity: validatedData.departureCity,
        destinationCity: validatedData.destinationCity,
        departureDate: new Date(validatedData.departureDate),
        departureTime: validatedData.departureTime,
        passengers: validatedData.passengers,
        totalPrice,
        status: 'pending',
        paymentStatus: 'unpaid',
      },
    });

    // Send confirmation email
    await sendBookingConfirmation(
      user.email,
      bookingNumber,
      validatedData.departureCity,
      validatedData.destinationCity,
      validatedData.departureDate,
      totalPrice
    );

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        ...booking,
        departureDate: booking.departureDate.toISOString(),
        createdAt: booking.createdAt.toISOString(),
        updatedAt: booking.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Booking error:', error);
    if (error.errors) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true, payment: true },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

export const getBookingByNumber = async (req: Request, res: Response) => {
  try {
    const { bookingNumber } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { bookingNumber },
      include: { user: true, payment: true },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { payment: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Cannot cancel this booking' });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    res.json({
      message: 'Booking cancelled successfully',
      booking: updated,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};
