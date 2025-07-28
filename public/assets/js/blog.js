// blog.js - Load and display blog posts dynamically

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");

  // Only run if we're on the blog index page
  if (!blogContainer) {
    return;
  }

  fetch("/data/blog-posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load blog posts");
      }
      return response.json();
    })
    .then((posts) => {
      blogContainer.innerHTML = posts
        .map(
          (post) => `
        <article class="blog-card">
          <img src="${post.image}" alt="${post.title}" width="300" height="200">
          <div class="blog-content">
            <h3><a href="/blog/post-template.html?id=${post.id}">${post.title}</a></h3>
            <p class="date">${new Date(post.date).toLocaleDateString()}</p>
            <p>${post.excerpt}</p>
            <a href="/blog/post-template.html?id=${post.id}" class="read-more">Read More</a>
          </div>
        </article>
      `
        )
        .join("");
    })
    .catch((error) => {
      blogContainer.innerHTML = `<p class="error">Unable to load blog posts. Please try again later.</p>`;
      console.error("Error loading blog posts:", error);
    });
});
