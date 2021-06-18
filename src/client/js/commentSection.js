const storyContainer = document.getElementById("storyContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const storyComments = document.querySelector(".story__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "story__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  storyComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const storyId = storyContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/stories/${storyId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}