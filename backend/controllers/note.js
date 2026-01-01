const Note = require("../model/note");

/**
 * Create note
 */
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      user: req.user.id // ✅ correct
    });

    await note.save();

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Get single note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all notes for logged-in user
 */
exports.getNotes = async (req, res) => {
  try {
    console.log("AUTH USER:", req.user); // 👈 ADD THIS
    const notes = await Note.find({ user: req.user.id }) // ✅ FIXED
      .sort({ createdAt: -1 });

    res.status(200).json({
      notes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * Update note
 */
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id }, // ✅ FIXED
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * Delete note
 */
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id // ✅ FIXED
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
