// Fetch and display blog posts
async function loadBlogPosts() {
  try {
    const res = await fetch('/api/blog');
    const posts = await res.json();

    const blogContainer = document.querySelector('#blog-posts');
    const postPage = window.location.pathname.includes('post-template.html');

    if (!postPage && blogContainer) {
      // We're on blog/index.html -> show list
      blogContainer.innerHTML = posts.map(post => `
        <div class="blog-card">
          <img src="${post.image}" alt="${post.title}" class="blog-image">
          <h3>${post.title}</h3>
          <p class="meta">By ${post.author} | ${new Date(post.date).toLocaleDateString()}</p>
          <p>${post.excerpt}</p>
          <a href="${post.url}" class="read-more">Read More</a>
        </div>
      `).join('');
    }

    if (postPage) {
      // We're on post-template.html -> load single post
      const urlParams = new URLSearchParams(window.location.search);
      const postId = parseInt(urlParams.get('id'), 10);

      const post = posts.find(p => p.id === postId);
      if (post) {
        document.querySelector('#post-title').textContent = post.title;
        document.querySelector('#post-meta').textContent = `By ${post.author} | ${new Date(post.date).toLocaleDateString()}`;
        document.querySelector('#post-image').src = post.image;
        document.querySelector('#post-content').textContent = post.excerpt + 
          "\n\n(This is where full blog content can go. You can expand it later.)";
      } else {
        document.querySelector('#post-title').textContent = 'Post Not Found';
        document.querySelector('#post-content').textContent = 'The blog post you are looking for does not exist.';
      }
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    const container = document.querySelector('#blog-posts') || document.querySelector('#post-content');
    if (container) container.innerHTML = '<p>Failed to load blog content. Please try again later.</p>';
  }
}

// Run when page loads
// blog.js

// Load and display blog posts dynamically
document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");

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
        <div class="blog-card">
          <img src="${post.image}" alt="${post.title}">
          <div class="blog-content">
            <h3>${post.title}</h3>
            <p class="date">${new Date(post.date).toLocaleDateString()}</p>
            <p>${post.excerpt}</p>
            <a href="post-template.html?id=${post.id}" class="read-more">Read More</a>
          </div>
        </div>
      `
        )
        .join("");
    })
    .catch((error) => {
      blogContainer.innerHTML = `<p class="error">Unable to load blog posts. Please try again later.</p>`;
      console.error(error);
    });
});
