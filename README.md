# KSF Store - Full-Stack E-Commerce Application

A modern e-commerce web application built with Next.js (App Router), Firebase (Authentication + Firestore + Storage), and Tailwind CSS.

## Features

### User Features
- **Landing Page**: Hero section with image slider, featured products display
- **Authentication**: Login/Register with Email/Password and Google OAuth
- **Product Browsing**: Responsive product grid with category filtering
- **Product Details**: Product cards with image, title, price, description
- **Shopping Cart**: Add/remove items, update quantities, total calculation
- **Checkout**: User info form, order summary, Cash on Delivery payment
- **Protected Routes**: User authentication required for cart/checkout

### Admin Features
- **Admin Dashboard**: Statistics overview (products, orders, users, revenue)
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: View all orders, update order status, generate invoices
- **User Management**: View all users, assign/remove admin roles
- **Protected Admin Routes**: Only admin users can access admin panel

### Technical Features
- Modern UI/UX with Tailwind CSS animations
- Responsive mobile-first design
- Loading spinners and toast notifications
- Firebase Authentication with Google provider
- Firestore database for products, orders, users
- Firebase Storage for product images
- Protected routes (user and admin)
- Clean code with TypeScript

## Project Structure

```
ksf/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   └── firestore.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── package.json
└── README.md
```

## Database Structure (Firestore)

### Collections:

1. **users**
   - uid (string)
   - email (string)
   - displayName (string)
   - role ('user' | 'admin')
   - phone (string, optional)
   - createdAt (timestamp)

2. **products**
   - name (string)
   - price (number)
   - description (string)
   - image (string, URL)
   - category (string)
   - stock (number)
   - createdAt (timestamp)

3. **categories**
   - name (string)
   - image (string, optional)

4. **orders**
   - userId (string)
   - items (array of CartItem)
   - total (number)
   - status ('pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
   - shippingInfo (object: name, phone, address)
   - paymentMethod ('cod' | 'card' | 'upi')
   - createdAt (timestamp)

5. **cart** (optional - currently using localStorage)

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Firebase account

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production or test mode
5. Enable Storage:
   - Go to Storage
   - Get started and configure rules
6. Get Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Add a web app if not already added
   - Copy the firebaseConfig object

### Step 2: Project Setup

The Firebase configuration is already set up in `src/lib/firebase.ts` with your credentials:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDhU58qqgTN10UM-tkgNA5MvOcjjHUlibM",
  authDomain: "ksf-app-15912.firebaseapp.com",
  projectId: "ksf-app-15912",
  storageBucket: "ksf-app-15912.firebasestorage.app",
  messagingSenderId: "401365756723",
  appId: "1:401365756723:web:938927b9940d3e8a01ec46",
  measurementId: "G-FPDCWW35KY"
};
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Set Admin User

To make a user an admin:
1. Register a new user through the app
2. Go to Firebase Console > Firestore Database
3. Find the user document in "users" collection
4. Edit the document and change `role` from "user" to "admin"

### Step 5: Add Sample Products

You can add products through the admin panel:
1. Register/login as admin user
2. Go to `/admin/products`
3. Click "Add Product" and fill in the details
4. Upload product image

Or add manually in Firestore:
- Collection: `products`
- Add documents with fields: name, price, description, image, category, stock, createdAt

### Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Firebase Security Rules (Recommended)

### Firestore Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Products are readable by all, writable by admins
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Categories are readable by all, writable by admins
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders: users can create and read their own, admins can read all
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and animations
- **Firebase**
  - Authentication (Email/Password + Google)
  - Firestore (NoSQL database)
  - Storage (Image uploads)
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icons

## Future Enhancements

- Payment gateway integration (Stripe, PayPal, Razorpay)
- Product search functionality
- Product reviews and ratings
- Wishlist feature
- Order tracking for users
- Email notifications
- Admin analytics dashboard
- Multi-language support
- Dark mode toggle

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
