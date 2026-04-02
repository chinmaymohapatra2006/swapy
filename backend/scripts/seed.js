require("dotenv").config({ path: __dirname + "/../.env" });
// Fallback in case they run from project root directly
require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ALL_PROFILES = [
  { name: 'Alice Chen', role: 'UI/UX Designer', rating: 4.9, match: '98%', skillsOffered: ['Figma', 'CSS', 'UI Design'], skillsWanted: ['React', 'Next.js'], avatar: '/photos/profile female 2.webp' },
  { name: 'Marcus Fox', role: 'Backend Engineer', rating: 5.0, match: '94%', skillsOffered: ['Node.js', 'Python', 'AWS'], skillsWanted: ['UI Design', 'Figma'], avatar: '/photos/profile male 1.avif' },
  { name: 'Sarah Jin', role: 'Data Scientist', rating: 4.7, match: '89%', skillsOffered: ['Python', 'SQL', 'Machine Learning'], skillsWanted: ['Frontend', 'Tailwind'], avatar: '/photos/profile female 3.png' },
  { name: 'David Lee', role: 'Data Analyst', rating: 4.8, match: '85%', skillsOffered: ['React', 'Data Visualization', 'Tableau'], skillsWanted: ['SQL', 'Python'], avatar: '/photos/profile male 2.avif' },
  { name: 'Emma Wilson', role: 'DevOps Engineer', rating: 4.9, match: '82%', skillsOffered: ['Tailwind CSS', 'Docker', 'Kubernetes'], skillsWanted: ['Docker', 'Go'], avatar: '/photos/profile female 1.jpg' },
  { name: 'Lucas Scott', role: 'Frontend Dev', rating: 4.6, match: '78%', skillsOffered: ['Vue.js', 'Machine Learning', 'JavaScript'], skillsWanted: ['Vue.js', 'React Native'], avatar: '/photos/profile male 3.jpg' }
];

const connectDB = async () => {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from environment variables");
      }
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected for seeding ✅");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};

const seed = async () => {
    await connectDB();

    console.log("Clearing existing users...");
    await User.deleteMany({});
    
    console.log("Seeding profiles...");
    const defaultPassword = await bcrypt.hash("password123", 10);
    
    const seededProfiles = ALL_PROFILES.map((profile, idx) => {
        // generate a reliable email for the dummy user based on their name
        const email = profile.name.toLowerCase().replace(/\s+/g, ".") + "@example.com";
        return {
            ...profile,
            email,
            password: defaultPassword
        };
    });

    await User.insertMany(seededProfiles);
    
    console.log("✅ Seeding successful!");
    mongoose.connection.close();
};

seed();
