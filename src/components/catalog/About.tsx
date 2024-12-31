import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-4xl font-light mb-8">About Us</h1>
        <div className="space-y-6">
          <p>
            Welcome to Oudview, your ultimate destination for fragrance aficionados. Our platform offers expert-curated reviews and insights into the world of perfumes and colognes, providing in-depth analysis and exclusive perspectives on a wide range of scents.
          </p>
          <p>
            At Oudview, we believe in the power of informed choices. Our mission is to empower fragrance enthusiasts with trusted and comprehensive reviews, helping you select the perfect scent with confidence.
          </p>
          <p>
            Whether you're searching for your signature scent, exploring new fragrance trends, or seeking the best seasonal picks, our expert curators are here to guide you. We meticulously select our experts based on their unmatched knowledge and passion for the world of fragrances, ensuring you receive only the highest quality reviews.
          </p>
          <p>
            Join us on this olfactory journey and discover the finest fragrances the world has to offer. Let's explore the art of perfumery together with insights from those who truly understand the magic of scents.
          </p>
          <h2 className="text-2xl font-light mt-8">Our Values</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Integrity: We uphold the highest standards of honesty and fairness in our reviews.</li>
            <li>Expertise: Our curators are seasoned experts with deep knowledge and passion for fragrances.</li>
            <li>Transparency: We are committed to providing clear and unbiased information.</li>
            <li>Community: We foster a supportive and inclusive community of fragrance enthusiasts.</li>
          </ul>
          <p>Love, Oudview Team.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
