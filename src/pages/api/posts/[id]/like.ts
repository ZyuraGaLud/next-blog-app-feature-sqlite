import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const post = await prisma.post.update({
        where: { id: String(id) },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'いいねの更新に失敗しました' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}