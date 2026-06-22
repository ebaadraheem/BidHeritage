# BidHeritage 🏺

A full-stack online auction platform for antiques and heritage items. Users can discover, list, and bid on rare and unique items — connecting buyers and sellers in a community built around valuable collectibles.

---

## ✨ Features

- **Browse Auctions** — Explore listings of antique and heritage items with images, descriptions, and categories
- **Place Bids** — Authenticated users can place bids; highest and lowest bidders are tracked in real time
- **Post Listings** — Sellers can create auction cards with multiple images uploaded to AWS S3
- **User Authentication** — Google Sign-In via Firebase Auth
- **User Profiles** — View and manage your own auction posts
- **Category Filtering** — Browse items by category
- **Admin Panel** — Admin-only access to manage messages, categories, bidders, and listings
- **Contact Form** — Users can reach out; admin can view and manage all messages
- **Responsive UI** — Mobile-friendly layout with a hamburger menu

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Database | [MongoDB](https://www.mongodb.com/) via Mongoose |
| Authentication | [Firebase Auth](https://firebase.google.com/) (Google Sign-In) |
| File Storage | [AWS S3](https://aws.amazon.com/s3/) |
| Forms | React Hook Form |
| Notifications | React Hot Toast |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
BidHeritage/
├── app/
│   ├── api/                   # Next.js API routes
│   │   ├── Bidders/           # Bidder CRUD operations
│   │   ├── BioInfo/           # User bio/profile info
│   │   ├── cards/             # Auction listing CRUD
│   │   ├── category/          # Category management
│   │   ├── Contact/           # Contact form messages
│   │   ├── highestlowestbidder/
│   │   ├── appendtobidders/
│   │   ├── BiddersDataManagement.js
│   │   ├── CardsManagement.js
│   │   └── photomanagement.js
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Card.js
│   │   ├── PlaceBid.js
│   │   ├── Category.js
│   │   ├── Contact.js
│   │   ├── AdminMessages.js
│   │   ├── Logn_In.js
│   │   └── Main.js
│   ├── lib/                   # Config & DB connections
│   │   ├── firebase.js
│   │   ├── mongodb.js
│   │   └── awsConfig.js
│   ├── models/                # Mongoose schemas
│   │   ├── Card.js
│   │   ├── Bidders.js
│   │   ├── Category.js
│   │   ├── ContactForm.js
│   │   └── UserInfo.js
│   ├── auctions/              # Auctions listing page
│   ├── description/[id]/      # Individual item page
│   ├── post-auction/          # Create a new listing
│   ├── my_posts/              # User's own listings
│   ├── profile/               # User profile page
│   ├── sign_up/               # Sign up page
│   ├── login_please/          # Auth-required redirect
│   ├── about/                 # About page
│   └── UserContext/           # Global user context
├── public/                    # Static SVG assets
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A Firebase project with Google Sign-In enabled
- An AWS S3 bucket for image uploads

### 1. Clone the repository

```bash
git clone https://github.com/your-username/BidHeritage.git
cd BidHeritage
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add the following:

```env
# MongoDB
NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string

# Firebase
NEXT_PUBLIC_FIREBASE_KEY=your_firebase_api_key

# AWS S3
NEXT_PUBLIC_AWS_REGION=your_aws_region
NEXT_PUBLIC_S3_BUCKET=your_s3_bucket_name
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your_aws_access_key_id
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables Reference

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MONGODB_URI` | MongoDB connection string |
| `NEXT_PUBLIC_FIREBASE_KEY` | Firebase project API key |
| `NEXT_PUBLIC_AWS_REGION` | AWS region (e.g. `us-east-1`) |
| `NEXT_PUBLIC_S3_BUCKET` | S3 bucket name for image storage |
| `NEXT_PUBLIC_AWS_ACCESS_KEY_ID` | AWS IAM access key ID |
| `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY` | AWS IAM secret access key |

> ⚠️ Never commit your `.env.local` file. It is already included in `.gitignore` by default in Next.js projects.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change, then submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
