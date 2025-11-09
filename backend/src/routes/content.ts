import { Request, Response } from "express";
import express from "express";
import { userAuth } from "@/middleware/auth";
import { ContentModel } from "@/model/userModel";
import {
  createContentSchema,
  type CreateContentInput,
  updateContentSchema,
  type UpdateContentInput,
} from "@/middleware/content.schema";

export const router = express.Router();

// Fetch all content items for the authenticated user
router.get("/content", userAuth, async (req: Request, res: Response) => {
  try {
    // Get user ID from the auth middleware
    const userId = req.userid;

    // Find all content belonging to this user
    const content = await ContentModel.find({ userId });

    return res.status(200).json({
      message: "Your contents",
      content,
    });
  } catch {
    console.error("Error while fetching contents");
    return res.status(500).json({
      message: "Error while fetching content",
      userId: req.userid || null,
    });
  }
});

// Create a new content item with title, link, and optional tags
router.post(
  "/content",
  userAuth,
  async (req: Request<{}, {}, CreateContentInput>, res: Response) => {
    try {
      // Validate the incoming data

      const parsed = createContentSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid inputs zod",
        });
      }

      const { title, link, tags } = parsed.data;
      const userId = req.userid!;

      // Save the new content to database
      const newContent = new ContentModel({ title, link, tags, userId });
      const savedContent = await newContent.save();

      return res.status(201).json({
        message: "Content created successfully",
        content: savedContent,
      });
    } catch (err) {
      console.error("Error while creating content", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// Update an existing content item (only if owned by the user)
router.put(
  "/content/:contentId",
  userAuth,
  async (
    req: Request<{ contentId: string }, {}, UpdateContentInput>,
    res: Response
  ) => {
    try {
      // Validate the update data
      const parsed = updateContentSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid inputs" });
      }

      const contentId = req.params.contentId;
      const userId = req.userid!;

      // Update content only if it belongs to the current user
      const updatedContent = await ContentModel.findOneAndUpdate(
        { _id: contentId, userId },
        parsed.data,
        { new: true } // Return the updated document
      );

      if (!updatedContent) {
        return res.status(404).json({
          message: "Content not found or not owned by user",
        });
      }

      return res.status(200).json({
        message: "Content updated successfully",
        content: updatedContent,
      });
    } catch (err) {
      console.error("Error while updating content", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Delete a content item (only if owned by the user)
router.delete(
  "/content/:contentId",
  userAuth,
  async (req: Request<{ contentId: string }>, res: Response) => {
    try {
      const contentId = req.params.contentId;
      const userId = req.userid!;

      // Delete content only if it belongs to the current user
      const deletedContent = await ContentModel.findOneAndDelete({
        _id: contentId,
        userId,
      });

      if (!deletedContent) {
        return res.status(404).json({
          message: "Content not found or not owned by user",
        });
      }

      return res.status(200).json({
        message: "Content deleted successfully",
        contentId,
      });
    } catch (err) {
      console.error("Error while deleting content", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
