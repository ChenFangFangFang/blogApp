const axios = require("axios");

// Configuration
const API_URL = "http://localhost:3001/api/blog";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY3NTFiNTBhMWQ3ODcyNmFiYTNiMWMwYiIsImlhdCI6MTczMzQwODE1NX0.CaT9F2A4RaiyK0ekyTE-cQnN0O-SI0uZkGf-rGPGNSM";

// Generate more realistic mock data
const generateMockData = (count) => {
  const blogs = [];
  const blogTitles = [
    "Understanding the Future of AI",
    "How to Stay Productive While Working from Home",
    "Exploring the Depths of the Ocean",
    "Mastering Front-End Development: A Beginner's Guide",
    "The Rise of Sustainable Fashion",
    "Is Cryptocurrency the Future of Finance?",
    "How to Build a Personal Brand Online",
    "Top 10 JavaScript Libraries You Should Know",
    "Exploring the Benefits of Minimalism",
    "How to Balance Work and Personal Life",
    "Tips for Traveling on a Budget",
    "The Impact of Social Media on Mental Health",
    "How to Improve Your Writing Skills",
    "The Power of Meditation for Mental Clarity",
    "The Best Remote Job Opportunities in 2024"
  ];

  const authors = [
    "Emily Dawson",
    "James Bennett",
    "Sophia Clark",
    "Michael Lee",
    "Olivia Taylor",
    "Liam Harris",
    "Ava Martinez",
    "Ethan Wilson",
    "Amelia Johnson",
    "Benjamin King",
    "Harper Scott",
    "Lucas Garcia",
    "Charlotte White",
    "Mason Evans",
    "Ella Roberts"
  ];

  for (let i = 0; i < count; i++) {
    blogs.push({
      title: blogTitles[i % blogTitles.length],
      author: authors[i % authors.length],
      url: `https://example.com/${blogTitles[i % blogTitles.length].toLowerCase().replace(/ /g, "-")}`,
      likes: Math.floor(Math.random() * 500) + 10 // Random likes between 10 and 500
    });
  }
  return blogs;
};

// Create blogs
const createBlogs = async (blogs) => {
  for (const blog of blogs) {
    try {
      const response = await axios.post(API_URL, blog, {
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json"
        }
      });
      console.log(`Created: ${response.data.title}`);
    } catch (error) {
      console.error(
        `Failed to create blog: ${blog.title}`,
        error.response?.data || error.message
      );
    }
  }
};

// Main Function
(async () => {
  const blogs = generateMockData(15); // Generate 15 realistic blog entries
  await createBlogs(blogs);
})();
