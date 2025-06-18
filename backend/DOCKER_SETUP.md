# Torkline MVP Docker Setup

This guide will help you run the Torkline MVP application using Docker. Docker makes setup easy by eliminating the need to install OpenCASCADE (OCC) or Miniconda locally - everything runs in containers.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

## Setup Instructions

1. **Clone the repository**

   ```
   git clone https://github.com/GOWTHAM-1mb/torkline-mvp-x.git
   cd torkline-mvp-x
   ```

2. **Create .env file**

   Copy the example environment file and fill in your Supabase credentials:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file to add your actual Supabase keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_key
   ```

3. **Build and start the Docker containers**

   ```
   docker-compose up -d --build
   ```

   This will:
   - Build both the frontend and backend containers
   - Download and install Miniconda automatically
   - Set up the OpenCASCADE environment in the container
   - Start everything in detached mode
   
   The first build will take several minutes as it needs to download and set up the conda environment with OpenCASCADE.

4. **Verify the OpenCASCADE environment**

   Check the backend logs to ensure OpenCASCADE is properly installed:
   ```
   docker-compose logs backend | grep "OCC processing"
   ```
   You should see "OCC processing successful" messages if the environment is working correctly.

5. **Access the application**

   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8000

4. **View logs**

   ```
   # View all logs
   docker-compose logs -f

   # View only frontend logs
   docker-compose logs -f frontend

   # View only backend logs
   docker-compose logs -f backend
   ```

5. **Stop the containers**

   ```
   docker-compose down
   ```

## Important Notes for Development

- The application is set up with volume mounting, so changes to source files will be reflected in the running containers.
- For the frontend, most changes will be hot-reloaded.
- For the backend, you'll need to restart the container if you make changes:
  ```
  docker-compose restart backend
  ```

## Handling Large Files

One of the key benefits of using Docker is avoiding GitHub's file size limitations:

1. Add large files to `.dockerignore` and `.gitignore` to exclude them from Git
2. Use Docker volumes to mount large files at runtime
3. Consider using Git LFS for large files if needed

## Database Interactions

The application will connect to your Supabase instance as configured in the `.env` file. All RFQs, quotes, and orders will use the formatted IDs starting from 001 as configured in the database.
