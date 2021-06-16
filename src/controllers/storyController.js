import Story from "../models/Story";

export const home = async (req, res) => {
    const stories = await Story.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", stories });
  };

export const watch = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id);
  if(!story){
    return res.render("404", {pageTitle: "Story not found."})
  }
  return res.render("watch", { pageTitle: story.title , story});
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id);
  if(!story){
    return res.render("404", {pageTitle: "Story not found."})
  }
  return res.render("edit", {pageTitle: `Edit: ${story.title}`, story});
}
export const postEdit = async (req, res) => {
  const {id} = req.params;
  const {title, description, hashtags} = req.body;
  const story = await Story.exists({_id: id});
  if(!story){
    return res.render("404", {pageTitle: "Story not found."})
  }
  await Story.findByIdAndUpdate(id, {
    title, description,
    hashtags: Story.formatHashtags(hashtags),
  });
  return res.redirect(`/stories/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: `Upload Story`});
};
export const postUpload = async (req, res) => {
  const { path: fileUrl } = req.file;
  const { title, description, hashtags, adress } = req.body;
  console.log(adress);
  try {
    await Story.create({
      title,
      description,
      fileUrl,
      hashtags: Story.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
  return res.render("upload", {pageTitle: `Upload Story`, errorMessage: error._message});
}
};

export const deleteStory = async (req, res) => {
  const {id} = req.params;
  await Story.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const {keyword} = req.query;
  let stories = [];
  if(keyword){
    stories = await Story.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", {pageTitle: `Search`, stories});
};