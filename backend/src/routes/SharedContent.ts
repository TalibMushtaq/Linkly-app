import express, { Request, Response } from "express";
import { userAuth } from "@/middleware/auth";
import { SharedContentModel, ContentModel } from "@/model/userModel";
import { nanoid } from "nanoid";

const router = express.Router();

/**
 * @route POST /share
 * @desc Create a single public share link for all user content
 * @access Private
 */
router.post("/share", userAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.userid!;

    // Check if user already has a share link
    const existing = await SharedContentModel.findOne({ userId });
    if (existing) {
      return res.status(200).json({
        message: "Share link already exists",
        shareUrl: `/share/${existing.shareId}`,
        shareId: existing.shareId,
      });
    }

    // Create new share link
    const shareId = nanoid(10);
    const share = new SharedContentModel({ userId, shareId });
    await share.save();

    return res.status(201).json({
      message: "Public share link created successfully",
      shareUrl: `/share/${shareId}`,
      shareId,
    });
  } catch (error) {
    console.error("Error creating share link:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @route GET /share/:shareId
 * @desc Public route to access all user’s shared content
 * @access Public
 */
router.get(
  "/share/:shareId",
  async (req: Request<{ shareId: string }>, res: Response) => {
    try {
      const { shareId } = req.params;

      const shared = await SharedContentModel.findOne({ shareId }).populate(
        "userId",
        "username"
      );
      if (!shared) {
        return res.status(404).json({ message: "Share link not found" });
      }

      // Fetch all content belonging to this user
      const userContent = await ContentModel.find({ userId: shared.userId });

      return res.status(200).json({
        message: "Public shared content fetched",
        sharedBy: shared.userId,
        content: userContent,
      });
    } catch (error) {
      console.error("Error fetching shared content:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @route DELETE /share
 * @desc Delete user’s public share link (unshare everything)
 * @access Private
 */
router.delete("/share", userAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.userid!;

    const deleted = await SharedContentModel.findOneAndDelete({ userId });
    if (!deleted) {
      return res.status(404).json({ message: "No share link found" });
    }

    return res.status(200).json({ message: "Share link removed successfully" });
  } catch (error) {
    console.error("Error deleting share link:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @route GET /shares
 * @desc Get the user's current share link (if any)
 * @access Private
 */
router.get("/shares", userAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.userid!;
    const share = await SharedContentModel.findOne({ userId });

    return res.status(200).json({
      message: "Share link fetched",
      shared: !!share,
      shareId: share?.shareId || null,
      shareUrl: share ? `/share/${share.shareId}` : null,
    });
  } catch (error) {
    console.error("Error fetching shares:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
