# Linkly

A modern link management application that helps you organize, share, and discover content from YouTube and X (Twitter). Linkly allows users to save their favorite links, create shareable collections, and view content shared by friends.

## Features

- 🔐 **User Authentication**: Secure sign up and sign in functionality
- 📝 **Link Management**: Save and organize links from YouTube and X (Twitter)
- 🎥 **Rich Media Preview**: Embedded previews for YouTube videos and X tweets
- 🔗 **Share Links**: Create public share links to share your content collection with others
- 👥 **Friend Sharing**: Add and view shared content from friends
- 💾 **Persistent Storage**: Friend shares are saved locally and persist across sessions
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **React Tweet** - Twitter/X embed support

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Nanoid** - Unique ID generation

## Project Structure

```
linkly/
├── backend/
│   ├── src/
│   │   ├── config.ts           # Configuration
│   │   ├── index.ts            # Server entry point
│   │   ├── middleware/         # Auth & validation middleware
│   │   ├── model/              # Database models
│   │   ├── routes/             # API routes
│   │   └── utils/              # Utility functions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/             # Icons and images
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd linkly
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Configuration

1. Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

2. Update the API URL in `frontend/src/App.tsx` if needed:
```typescript
export const API_URL = "http://localhost:5000/api";
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating an Account
1. Click "Sign Up" on the homepage
2. Fill in your details (full name, username, email, password)
3. You'll be redirected to the dashboard upon successful registration

### Adding Content
1. Click "Add content" button on the dashboard
2. Enter a title and link (YouTube or X/Twitter)
3. The content will be saved and displayed with an embedded preview

### Sharing Your Content
1. Click "Share links" button on the dashboard
2. Click "Create Share Link" to generate a public share link
3. Copy and share the link with others
4. Anyone with the link can view your shared content

### Viewing Friends' Content
1. Click "Add friend's share link" on the dashboard
2. Enter the share link (e.g., `/share/abc123` or full URL)
3. The friend's shared content will appear in the "Friends' Shared Content" section
4. You can remove a friend's share by clicking the "Remove" button

## API Endpoints

### Authentication
- `POST /api/user/signup` - Create a new account
- `POST /api/user/signin` - Sign in to existing account

### Content Management
- `GET /api/v1/content` - Get all user's content
- `POST /api/v1/content` - Create new content
- `DELETE /api/v1/content/:id` - Delete content

### Sharing
- `POST /api/v2/share` - Create a share link
- `GET /api/v2/shares` - Get user's share link
- `GET /api/v2/share/:shareId` - Get shared content (public)
- `DELETE /api/v2/share` - Delete share link

## Development

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

TALIB MUSHTAQ DAR

---

Made with ❤️ using React, TypeScript, and Express

