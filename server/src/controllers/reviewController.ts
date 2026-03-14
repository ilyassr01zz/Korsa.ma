import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { reviewSchema } from '../utils/validation';

const prisma = new PrismaClient();

export const createReview = async (req: Request, res: Response) => {
  try {
    const validatedData = reviewSchema.parse(req.body);

    const review = await prisma.review.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        rating: validatedData.rating,
        message: validatedData.message,
        isApproved: false, // Admin approval required
      },
    });

    res.status(201).json({
      message: 'Review submitted successfully. Thank you!',
      review: {
        ...review,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Review error:', error);
    if (error.errors) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to submit review' });
  }
};

export const getApprovedReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const stats = {
      totalReviews: reviews.length,
      averageRating:
        reviews.length > 0
          ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : 0,
      ratingDistribution: {
        5: reviews.filter((r: any) => r.rating === 5).length,
        4: reviews.filter((r: any) => r.rating === 4).length,
        3: reviews.filter((r: any) => r.rating === 3).length,
        2: reviews.filter((r: any) => r.rating === 2).length,
        1: reviews.filter((r: any) => r.rating === 1).length,
      },
    };

    res.json({
      stats,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const approveReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: true },
    });

    res.json({
      message: 'Review approved successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve review' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id },
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
