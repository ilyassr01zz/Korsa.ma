import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createPaymentSchema } from '../utils/validation';
import { sendPaymentReceipt } from '../utils/email';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const createPayment = async (req: Request, res: Response) => {
  try {
    const validatedData = createPaymentSchema.parse(req.body);

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: { id: validatedData.bookingId },
      include: { user: true },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ error: 'Booking already paid' });
    }

    // Generate transaction ID
    const transactionId = `TXN-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId: validatedData.bookingId,
        userId: booking.userId,
        amount: validatedData.amount,
        method: validatedData.method,
        transactionId,
        status: 'completed', // In production, this depends on payment gateway
      },
    });

    // Update booking payment status
    await prisma.booking.update({
      where: { id: validatedData.bookingId },
      data: {
        paymentStatus: 'paid',
        status: 'confirmed',
      },
    });

    // Send receipt
    await sendPaymentReceipt(
      booking.user.email,
      booking.bookingNumber,
      validatedData.amount,
      transactionId
    );

    res.status(201).json({
      message: 'Payment processed successfully',
      payment: {
        ...payment,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
      },
      booking: {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        status: 'confirmed',
        paymentStatus: 'paid',
      },
    });
  } catch (error: any) {
    console.error('Payment error:', error);
    if (error.errors) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to process payment' });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { booking: true, user: true },
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
};

export const getPaymentByBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { bookingId },
      include: { booking: true },
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
};

export const refundPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status === 'refunded') {
      return res.status(400).json({ error: 'Payment already refunded' });
    }

    // Update payment status
    const updated = await prisma.payment.update({
      where: { id },
      data: { status: 'refunded' },
    });

    // Update booking
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { paymentStatus: 'refunded', status: 'cancelled' },
    });

    res.json({
      message: 'Payment refunded successfully',
      payment: updated,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refund payment' });
  }
};
