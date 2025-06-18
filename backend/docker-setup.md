# Docker Setup Guide for Torkline MVP-X

This guide will help you quickly set up and run the Torkline application using Docker, with proper OCC (OpenCASCADE) support for 3D model processing.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Quick Start

1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd torkline-mvp-x
   ```

2. Set up environment variables by creating a `.env` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8000

## Troubleshooting

### OCC Installation Issues

If you encounter issues with the OpenCASCADE (OCC) installation:

1. Check if the container is running:
   ```bash
   docker ps
   ```

2. Check the backend logs:
   ```bash
   docker-compose logs backend
   ```

3. Verify OCC availability via the health endpoint:
   ```bash
   curl http://localhost:8000/health
   ```
   The response should show `"occ_status": "available"` if OCC is properly installed.

### Container Build Issues

If the container fails to build:

1. Make sure Docker has sufficient resources allocated (at least 4GB of memory)
2. Try rebuilding with no cache:
   ```bash
   docker-compose build --no-cache
   ```

## Advanced Configuration

### Customizing Ports

If you need to use different ports, edit the `docker-compose.yml` file and change the port mappings:

```yaml
ports:
  - "your_desired_port:8080" # For frontend
  - "your_desired_port:8000" # For backend
```

### Developing Inside Docker

You can make changes to the code while the containers are running:

1. Frontend changes will automatically be reflected due to the volume mount
2. For backend changes, you may need to restart the container:
   ```bash
   docker-compose restart backend
   ```

## System Architecture

- **Frontend**: Next.js application served on port 8080
- **Backend**: FastAPI application with OCC integration on port 8000
- **3D Processing**: Uses OpenCASCADE (OCC) for STEP to STL conversion
- **Database**: Supabase (external service)
