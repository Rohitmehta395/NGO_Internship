const Blog = require("../models/Blog");
const Subscriber = require("../models/Subscriber");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// --- Helper: Generate Slug ---
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// --- Helper: Send Email Notification ---
const sendNewPostEmail = async (blog) => {
  try {
    const subscribers = await Subscriber.find({});
    const emails = subscribers.map((sub) => sub.email);

    if (emails.length === 0) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emails,
      subject: `New Post: ${blog.title}`,
      html: `
        <h1>New Blog Post Alert!</h1>
        <p>We just published a new article: <strong>${blog.title}</strong></p>
        <p>Click here to read more on our website.</p>
        <br/>
        <p>Best,<br/>Sharada Educational Trust</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification emails sent!");
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ date: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create blog & Notify
// @route   POST /api/blogs
const createBlog = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, "/");
    }

    let slug = generateSlug(req.body.title);

    const existingSlug = await Blog.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      ...req.body,
      image: imagePath,
      slug: slug,
      date: req.body.date || Date.now(),
    });

    // Send Email Notification
    sendNewPostEmail(blog);

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      if (blog.image) {
        const oldImagePath = path.join(__dirname, "..", blog.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    if (updateData.title && updateData.title !== blog.title) {
      updateData.slug = generateSlug(updateData.title) + "-" + Date.now();
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: blog });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Not found" });

    if (blog.image) {
      const filePath = path.join(__dirname, "..", blog.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await blog.deleteOne();
    res.json({ success: true, message: "Blog removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Subscribe to newsletter
// @route   POST /api/blogs/subscribe
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await Subscriber.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });

    await Subscriber.create({ email });
    res
      .status(201)
      .json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog, subscribe };
