import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
    });

    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

export const getCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const city = await prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch city' });
  }
};

export const searchCities = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query required' });
    }

    const cities = await prisma.city.findMany({
      where: {
        name: {
          contains: q,
        },
      },
      orderBy: { name: 'asc' },
      take: 10,
    });

    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search cities' });
  }
};

export const addCity = async (req: Request, res: Response) => {
  try {
    const { name, region, latitude, longitude } = req.body;

    if (!name || !region || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if city already exists
    const existing = await prisma.city.findUnique({
      where: { name },
    });

    if (existing) {
      return res.status(400).json({ error: 'City already exists' });
    }

    const city = await prisma.city.create({
      data: {
        name,
        region,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });

    res.status(201).json(city);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to add city' });
  }
};
