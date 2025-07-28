# Muslim Astrologer Website

A responsive, SEO-optimized website for a professional Muslim astrologer, built using **HTML, CSS, JavaScript (frontend)** and **Node.js with Express (backend)**.

The site includes:
- Home, About, Contact pages
- Services (e.g., Love Problem, Horoscope)
- Blog (with dynamic loading from JSON)
- SEO features (robots.txt, sitemap.xml, manifest.json, meta tags)
- Mobile-friendly design

---

## **Project Structure**
astrologer-website/
│
├── public/ # Frontend files (served by Express)
│ ├── index.html # Homepage
│ ├── about.html
│ ├── contact.html
│ ├── services/ # Individual service pages
│ │ ├── love-problem.html
│ │ ├── horoscope.html
│ ├── blog/
│ │ ├── index.html # Blog listing
│ │ ├── post-template.html # Single blog post
│ ├── assets/
│ │ ├── css/ # Styles
│ │ │ ├── style.css
│ │ │ └── responsive.css
│ │ ├── js/ # Scripts
│ │ │ ├── main.js
│ │ │ └── blog.js
│ │ ├── images/ # Site images & icons
│ │ └── fonts/ # (Optional)
│ ├── favicon.ico
│ ├── sitemap.xml
│ ├── robots.txt
│ └── manifest.json
│
├── data/
│ ├── blog-posts.json # Blog content storage
│ └── form-submissions.json (optional for contact form)
│
├── server.js # Express backend
├── package.json
├── .env # Environment variables
├── .gitignore
└── README.md


---

## **Setup Instructions**

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/astrologer-website.git
cd astrologer-website
