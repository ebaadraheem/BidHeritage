import React from 'react';
export const metadata = {
  title: "About Us",
  description: "Learn about BidHeritage, our mission, and how we connect collectors with unique and valuable antiques.",
};

const About = () => {
  return (
    <div className="min-h-[100vh]  bg-[#D2B48C] flexer flex-col">
      <div className="container mx-auto w-[85vw] my-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About BidHeritage</h1>

        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            Welcome to BidHeritage, your premier destination for discovering and bidding on unique items! Whether you're a seasoned collector or looking for your next one-of-a-kind find, BidHeritage connects you directly with sellers offering a wide range of items up for auction.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          At BidHeritage, our mission is simple: to provide a seamless platform where enthusiasts can easily find and bid on rare collectibles, antiques, and other unique items. We strive to make the bidding process straightforward and secure, ensuring peace of mind for both buyers and sellers.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          BidHeritage empowers sellers to showcase their items, allowing them to reach a broader audience of eager bidders. Users can browse through detailed listings, place bids, and win unique items through our secure platform. With BidHeritage, finding and bidding on rare treasures is easier than ever.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Choose BidHeritage?</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
          <li>Wide Selection: Explore a diverse selection of items across various categories and locations.</li>
          <li>Trusted Sellers: Partnered with reputable sellers to ensure authenticity and reliability in every transaction.</li>
          <li>User-Friendly Experience: Intuitive interface designed for effortless navigation and seamless bidding.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Have questions or need assistance? Our dedicated support team is here to help! Contact us via email at <a href="mailto:ebaadraheem20@gmail.com" className="text-blue-600">ebaadraheem20@gmail.com</a> or reach out through our social media channels for prompt assistance.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Join the BidHeritage Community</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Join thousands of satisfied users who rely on BidHeritage for their auction needs. Whether you're planning to sell a rare item or looking for the perfect addition to your collection, BidHeritage has you covered.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Start Exploring Today</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Discover the excitement waiting for you. Visit BidHeritage today and start exploring your next unique find!
        </p>
      </div>
    </div>
  );
}

export default About;
