# SIH 2025 Backend API

A simple Express.js backend application for the SIH 2025 project.

## Features

- Express.js server with CORS enabled
- Environment variables support with dotenv
- Basic API routes
- Health check endpoint
- Error handling middleware
- Development and production scripts

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if needed)
   - Update the environment variables as needed

### Running the Application

#### Development Mode
```bash
npm run dev
```
This will start the server using nodemon for automatic restarts on file changes.

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Base Routes

- `GET /` - Welcome message and server status
- `GET /health` - Health check endpoint

### API Routes

- `GET /api/test` - Test endpoint to verify API is working

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Project dependencies and scripts
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC
