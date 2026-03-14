import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { contactMessageSchema } from '../utils/validation';

const prisma = new PrismaClient();

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const validatedData = contactMessageSchema.parse(req.body);

    // Check if user exists (optional)
    let userId: string | null = null;
    if (validatedData.email) {
      const user = await prisma.user.findFirst({
        where: { email: validatedData.email },
      });
      userId = user?.id || null;
    }

    // Create contact message
    const message = await prisma.contactMessage.create({
      data: {
        userId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject,
        message: validatedData.message,
        status: 'new',
      },
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: {
        ...message,
        createdAt: message.createdAt.toISOString(),
        updatedAt: message.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Contact error:', error);
    if (error.errors) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const { status = 'all' } = req.query;

    const where = status && status !== 'all' ? { status } : {};

    const messages = await prisma.contactMessage.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const getContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};

export const replyToMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim().length === 0) {
      return res.status(400).json({ error: 'Reply message is required' });
    }

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        reply,
        status: 'replied',
      },
    });

    // In production, send email notification here
    console.log(`Reply sent to ${message.email}`);

    res.json({
      message: 'Reply sent successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reply' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.contactMessage.delete({
      where: { id },
    });

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
