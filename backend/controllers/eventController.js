const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

/* CREATE */
const createEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      venue: req.body.venue,
      date: req.body.date,
      month: req.body.month,
      youtubeUrl: req.body.youtubeUrl,
      imageUrl: `events/${req.file.filename}`,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* READ */
const getEvents = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  try {
    const [events, total] = await Promise.all([
      Event.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Event.countDocuments(),
    ]);

    res.json({
      data: events,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ SINGLE */
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* UPDATE */
const updateEvent = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      venue: req.body.venue,
      date: req.body.date,
      month: req.body.month,
      youtubeUrl: req.body.youtubeUrl,
    };

    if (req.file) {
      const oldEvent = await Event.findById(req.params.id);
      if (oldEvent && oldEvent.imageUrl) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          oldEvent.imageUrl
        );
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }

      data.imageUrl = `events/${req.file.filename}`;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* DELETE */
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.imageUrl) {
      const imagePath = path.join(__dirname, "..", "uploads", event.imageUrl);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete local file: ${imagePath}`, err);
        } else {
          console.log(`Successfully deleted local file: ${imagePath}`);
        }
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Event and image deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
