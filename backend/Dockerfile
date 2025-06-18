# Use a specific Python base image (Ubuntu-based for better apt package support)
FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /app

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    wget \
    bzip2 \
    ca-certificates \
    libglib2.0-0 \
    libxext6 \
    libsm6 \
    libxrender1 \
    libgl1-mesa-glx \
    libglu1-mesa \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Download and install Miniconda
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh \
    && bash miniconda.sh -b -p /opt/miniconda \
    && rm miniconda.sh

# Add Miniconda to PATH
ENV PATH=/opt/miniconda/bin:$PATH

# Initialize conda
RUN conda init bash && echo "conda activate base" >> ~/.bashrc

# Create conda environment with pythonocc-core and install additional dependencies with specific versions

RUN conda create -n occ-env -c conda-forge python=3.9 pythonocc-core=7.7.0 curl -y

# Copy application code
COPY app/ .

# Install Python requirements in the conda environment
RUN /opt/miniconda/envs/occ-env/bin/pip install -r requirements.txt

# Create a file to verify OCC installation
RUN echo 'import OCC; print("OCC version:", OCC.VERSION)' > /app/check_occ.py

# Expose the port for FastAPI
EXPOSE 8000

# Start the FastAPI server with the conda environment
CMD ["/opt/miniconda/bin/conda", "run", "-n", "occ-env", "python", "server.py"]
