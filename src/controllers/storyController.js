import Story from "../models/Story";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
  const stories = await Story.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", stories });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id).populate("owner").populate("comments");
  if (!story) {
    return res.render("404", { pageTitle: "Story not found." });
  }
  return res.render("watch", { pageTitle: story.title, story });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const story = await Story.findById(id);
  if (!story) {
    return res.status(404).render("404", { pageTitle: "Story not found." });
  }
  if (String(story.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${story.title}`, story });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const story = await Story.exists({ _id: id });
  if (!story) {
    return res.status(404).render("404", { pageTitle: "Story not found." });
  }
  if (String(story.owner) !== String(_id)) {
    req.flash("error", "You are not the the owner of the story.");
    return res.status(403).redirect("/");
  }
  await Story.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Story.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/stories/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Story" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { story, thumb } = req.files;
  const { title, description, hashtags,lat, lng,address } = req.body;
  const isHeroku = process.env.NODE_ENV === "production";
  try {
    const newStory = await Story.create({
      title,
      description,
      fileUrl: isHeroku ? story[0].location : story[0].path,
      thumbUrl: isHeroku ? thumb[0].location : story[0].path,
      owner: _id,
      lat,
      lng,
      address,
      hashtags: Story.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.stories.push(newStory._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Story",
      errorMessage: error._message,
    });
  }
};

export const deleteStory = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const story = await Story.findById(id);
  if (!story) {
    return res.status(404).render("404", { pageTitle: "Story not found." });
  }
  if (String(story.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Story.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let stories = [];
  if (keyword) {
    stories = await Story.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", stories });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id);
  if (!story) {
    return res.sendStatus(404);
  }
  story.meta.views = story.meta.views + 1;
  await story.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const story = await Story.findById(id);
  if (!story) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    story: id,
  });
  story.comments.push(comment._id);
  story.save();
  return res.status(201).json({ newCommentId: comment._id });
};