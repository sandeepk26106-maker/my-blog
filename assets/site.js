/* MyBlog — shared site info (brand, contact, authors, topics).
   Used by the homepage, post reader, about page and auth pages. */
window.SITE = {
  name: "MyBlog",
  tagline: "Simple ideas on React, CSS and the web.",
  owner: "HIGH BLOGGING",
  phone: "6306260243",
  phoneHref: "tel:+916306260243",
  address: "Ghurwara Raebareli (UP)",
  pincode: "229125",
  city: "Raebareli, Uttar Pradesh",
  email: "hello@myblog.test",

  topics: [
    "React",
    "CSS",
    "JavaScript",
    "UX",
    "SEO",
    "DevOps",
    "Writing",
  ],

  authors: [
    { name: "Aarav Sharma", role: "React & SEO", initials: "AS", bio: "Frontend dev jo React internals aur search visibility dono samajhta hai." },
    { name: "Diya Sharma", role: "CSS & Layouts", initials: "DS", bio: "Layout nerd — Grid, Flexbox aur design systems par likhti hai." },
    { name: "Kabir Nair", role: "JavaScript & React", initials: "KN", bio: "Modern JS features aur React hooks ke peeche ka logic wala." },
    { name: "Meera Iyer", role: "UX & Writing", initials: "MI", bio: "Dark mode, accessibility aur tech writing ke peeche wali." },
    { name: "Rohan Verma", role: "DevOps & Git", initials: "RV", bio: "Deploy pipelines, git workflow aur CI/CD ke sawaal solve karta hai." },
  ],

  stats: [
    { value: "10", label: "Articles" },
    { value: "7", label: "Topics" },
    { value: "5", label: "Authors" },
    { value: "100%", label: "Free & ad-free" },
  ],
};
