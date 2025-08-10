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
          <div class="blog-image">
            <img src="${post.image}" alt="${post.title}" width="300" height="200" loading="lazy">
            <div class="category-tag">
              <i class="fas fa-tag"></i> ${getCategoryFromTitle(post.title)}
            </div>
          </div>
          <div class="blog-content">
            <h3><a href="/blog/post-template.html?id=${post.id}">${post.title}</a></h3>
            <div class="post-meta">
              <span class="date"><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
              <span class="author"><i class="fas fa-user"></i> Molana Noor Shah</span>
            </div>
            <p class="excerpt">${post.excerpt}</p>
            <a href="/blog/post-template.html?id=${post.id}" class="read-more">
              <i class="fas fa-arrow-right"></i> Read More
            </a>
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

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to extract category from title
function getCategoryFromTitle(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('love') || titleLower.includes('relationship') || titleLower.includes('marriage')) {
    return 'Love & Relationships';
  } else if (titleLower.includes('black magic') || titleLower.includes('protection')) {
    return 'Black Magic Protection';
  } else if (titleLower.includes('astrology') || titleLower.includes('kundli') || titleLower.includes('horoscope')) {
    return 'Islamic Astrology';
  } else if (titleLower.includes('business') || titleLower.includes('career')) {
    return 'Business & Career';
  } else if (titleLower.includes('health') || titleLower.includes('wellness')) {
    return 'Health & Wellness';
  } else if (titleLower.includes('family') || titleLower.includes('harmony')) {
    return 'Family & Marriage';
  } else {
    return 'Spiritual Guidance';
  }
}
