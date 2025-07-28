// post.js - Load individual blog post dynamically

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    document.querySelector(".blog-post .container").innerHTML =
      "<p class='error'>No blog post found.</p>";
    return;
  }

  fetch("/data/blog-posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load blog post data");
      }
      return response.json();
    })
    .then((posts) => {
      const post = posts.find((p) => p.id.toString() === postId);
      if (!post) {
        document.querySelector(".blog-post .container").innerHTML =
          "<p class='error'>Blog post not found.</p>";
        return;
      }

      // Populate post content
      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-date").textContent = new Date(
        post.date
      ).toLocaleDateString();
      document.getElementById("post-image").src = post.image;
      document.getElementById("post-content").innerHTML = post.content;
    })
    .catch((error) => {
      document.querySelector(".blog-post .container").innerHTML =
        "<p class='error'>Error loading blog post.</p>";
      console.error(error);
    });
});
