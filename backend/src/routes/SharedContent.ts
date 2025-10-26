import express, { Request, Response } from "express";
import { userAuth } from "@/middleware/auth";
import { ContentModel, SharedContentModel } from "@/model/userModel";
import { nanoid } from "nanoid";

export const router = express.Router();

/**
 * @route POST /share/:contentId
 * @desc Make a content public (create a shared link)
 * @access Private
 */
router.post('/share/:contentId', userAuth, async (req: Request<{ contentId: string }>, res: Response) => {
  try {
    const { contentId } = req.params;
    const userId = req.userid!;

    // Verify user owns the content
    const content = await ContentModel.findOne({ _id: contentId, userId });
    if (!content) {
      return res.status(404).json({ message: 'Content not found or not owned by user' });
    }

    // Check if already shared
    const existingShare = await SharedContentModel.findOne({ contentId, userId });
    if (existingShare) {
      return res.status(200).json({
        message: 'Already shared',
        shareUrl: `/share/${existingShare.shareId}`,
        shareId: existingShare.shareId,
      });
    }

    // Create shared entry
    const shareId = nanoid(8);
    const shared = new SharedContentModel({ contentId, userId, shareId });
    await shared.save();

    return res.status(201).json({
      message: 'Content shared publicly',
      shareUrl: `/share/${shareId}`,
      shareId,
    });
  } catch (error) {
    console.error('Error while sharing content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @route GET /shares
 * @desc Get all shared content by the authenticated user
 * @access Private
 */
router.get('/shares', userAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.userid!;

    const sharedContents = await SharedContentModel.find({ userId })
      .populate('contentId')
      .sort({ createdAt: -1 });

    // Empty array is valid, not an error
    return res.status(200).json({
      message: 'Shared contents fetched successfully',
      count: sharedContents.length,
      shares: sharedContents,
    });
  } catch (error) {
    console.error('Error fetching shared contents:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @route GET /share/:shareId
 * @desc View shared content publicly
 * @access Public
 */
router.get('/share/:shareId', async (req: Request<{ shareId: string }>, res: Response) => {
  try {
    const { shareId } = req.params;

    const shared = await SharedContentModel.findOne({ shareId })
      .populate('contentId')
      .populate('userId', 'username');

    if (!shared) {
      return res.status(404).json({ message: 'Shared link not found' });
    }

    return res.status(200).json({
      message: 'Shared content fetched',
      content: shared.contentId,
      sharedBy: shared.userId,
    });
  } catch (error) {
    console.error('Error fetching shared content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @route DELETE /share/:shareId
 * @desc Unshare a link (make it private again)
 * @access Private
 */
router.delete('/share/:shareId', userAuth, async (req: Request<{ shareId: string }>, res: Response) => {
  try {
    const { shareId } = req.params;
    const userId = req.userid!;

    const deleted = await SharedContentModel.findOneAndDelete({ shareId, userId });
    if (!deleted) {
      return res.status(404).json({ message: 'Shared link not found or not owned by user' });
    }

    return res.status(200).json({ message: 'Shared link removed successfully' });
  } catch (error) {
    console.error('Error while deleting shared link:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;