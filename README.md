BidHeritage
BidHeritage is an online marketplace for buying and selling heritage items. This project is built using the Next.js framework, React for frontend development, Express.js for backend API, MongoDB for database management, AWS S3 for storing images, and Firebase for authentication.

Table of Contents
Features
Technologies Used
Setup and Installation
Environment Variables
Usage
Contributing
License
Features
1. User Authentication
Sign Up / Log In: Users can sign up and log in using Firebase authentication.
2. Posting Items
Create Posts: Authenticated users can create posts to list their heritage items for auction.
Image Upload: Images of the items are stored securely in AWS S3.
Post Details: Each post includes title, description, starting price, and auction end time.
3. Bidding on Items
Place Bids: Authenticated users can place bids on listed items.
Bid History: Users can view the history of all bids placed on an item.
4. User Profile Management
Edit Personal Info: Users can update their profile information, which is reflected in all their posts and bids.
Profile Picture: Users can upload or change their profile picture, stored in AWS S3.
5. Post Management
Edit Posts: Users can edit their posts .
Delete Posts: Users can delete their posts.
Manage Active Auctions: Users can manage their active auctions, view bids, and finalize sales.
6. Search and Filtering
Search Items: Users can search for items based on keywords.
Category Filtering: Items can be filtered based on categories like Art, Antiques, Collectibles, etc.
7. Admin Features
Category Management: Admins can create, update, and delete categories for items.
User Management: Admins can manage users, view activity, and take necessary actions.
8. Responsive Design
Mobile Friendly: The site is fully responsive and works seamlessly on mobile devices.
Technologies Used
Frontend: Next.js, React, Tailwind CSS
Backend: Express.js, Node.js
Database: MongoDB (MongoDB Atlas)
Authentication: Firebase Authentication
Image Storage: AWS S3
State Management: React Hooks
Styling: Tailwind CSS
Setup and Installation
Prerequisites
Node.js installed
MongoDB Atlas account
Firebase account for authentication
AWS account for S3 storage
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/ebaadraheem/BidHeritage.git
cd bidheritage
Install dependencies:

bash
Copy code
npm install
Set up environment variables (See the Environment Variables section for details).

Run the development server:

bash
Copy code
npm run dev
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
Environment Variables
Create a .env.local file in the root directory and add the following environment variables:

bash
Copy code
Usage
Create an Account: Sign up using your email and start exploring.
Post an Item: List your heritage items for auction.
Bid on Items: Place bids on items you are interested in.
Manage Your Posts: Edit or delete your posts from your profile.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

# ENV Variables
NEXT_PUBLIC_FIREBASE_KEY=""
NEXT_PUBLIC_S3_BUCKET=""
NEXT_PUBLIC_AWS_REGION""
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=""
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=""
NEXT_PUBLIC_MONGODB_URI=""

License
This project is licensed under the MIT License. See the LICENSE file for details.

