# Weather Dashboard - Multi-Container Application

## 1. Objective

The objective of this project is to apply knowledge about infrastructure and, in particular, containers by building a multi-container application. This project demonstrates the use of Docker Compose to orchestrate several services, including a frontend, backend APIs, a database, and a reverse proxy with SSL termination.


## 2. Features

- **Current Weather Data**: Users can search for a city to get its current weather conditions.
- **Search History**: All successful weather searches are logged and displayed.
- **Path-Based Routing**:
  - `/`: Serves the React frontend application.
  - `/api`: Routes to the Weather API service for fetching current weather.
  - `/history/`: Routes to the Historical Data service for retrieving search history. Add `/data` to see the json of the history
- **Secure Access**: The application is exposed over HTTPS via an Nginx reverse proxy.

## 3. Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Weather API Service**: Node.js with Express.js
- **Historical Data Service**: Python with Flask
- **Database**: PostgreSQL
- **Reverse Proxy**: Nginx
- **Containerization & Orchestration**: Docker & Docker Compose


## 4. Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop**: (or Docker Engine + Docker Compose for Linux) - Latest version recommended.
- **OpenSSL**: For generating self-signed SSL certificates (usually pre-installed on Linux/macOS, available for Windows).
- **Git**: For version control
- **A Text Editor/IDE**: Such as VS Code.
- **An OpenWeatherMap API Key**: You need to sign up at OpenWeatherMap to get a free API key.

## 6. Setup and Installation (if using git)

Follow these steps to set up the project locally:

### Step 1: Clone the Repository (If Applicable)
If the project is in a Git repository, clone it:

```bash
git clone <your-repository-url>
cd weather-dashboard
```

Otherwise, ensure you have all the project files in the structure described above.

### Step 2: Create the .env File
In the root directory of the project (`weather-dashboard/`), create a file named `.env` and add your OpenWeatherMap API key:

```env
OPENWEATHER_API_KEY=your_actual_openweather_api_key_here
```

Replace `your_actual_openweather_api_key_here` with your key.

### Step 3: Generate Self-Signed SSL Certificates
For local development, you need to generate SSL certificates for Nginx.

1. Navigate to the `nginx/certs/` directory:

```bash
cd nginx/certs/
```

2. Run the OpenSSL command (for example):

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout nginx-selfsigned.key \
    -out nginx-selfsigned.crt \
    -subj "/C=BE/ST=Antwerp/L=Antwerp/O=MyProjectAB/OU=Dev/CN=localhost"
```

*(Adjust the `-subj` details as needed. `CN=localhost` is important for local testing.)*

3. Navigate back to the project root directory:

```bash
cd ../..
```

### Step 5: Build and Run the Application
From the project root directory (`INFR3_FINAL_PROJECT/`), run:

```bash
docker-compose up --build -d
```

- `--build`: Builds the Docker images from the Dockerfiles.
- `-d`: Runs the containers in detached mode.


## 6. Accessing the Application

Once all steps are completed:

1. Open your web browser.
2. Navigate to `https://localhost`.
3. You will likely see a browser warning about the self-signed certificate. Accept the risk and proceed (e.g., click "Advanced" -> "Proceed to localhost (unsafe)").
4. You should now see the Weather Dashboard application.
   - Frontend: `https://localhost/`
   - Weather API (example): `https://localhost/api/weather/london`
   - Historical Data API (JSON): `https://localhost/history/data`

## 7. Docker Compose Commands

Here are some useful Docker Compose commands to manage the application:

- View logs from all containers:

```bash
docker-compose logs -f
```

- View logs from a specific service (e.g., `weather-api`):

```bash
docker-compose logs -f weather-api
```

- Stop and remove containers, networks:

```bash
docker-compose down
```

- Stop and remove containers, networks, AND volumes (deletes database data):

```bash
docker-compose down -v
```

- Restart a specific service (e.g., Nginx after config change):

```bash
docker-compose restart nginx-proxy
```

## 8. Key Design Choices & Requirements Fulfillment

This project incorporates several key design choices to meet the assignment requirements:

- **Docker Compose Orchestration**: Manages the lifecycle and networking of all services.
- **Multi-Stage Build**: The `frontend` service uses a multi-stage Docker build to create a lean production image, separating build-time dependencies from runtime needs.
- **Separate Database Container**: PostgreSQL runs in its own container, promoting modularity and data persistence via a named volume (`postgres-data`).
- **Dedicated Reverse Proxy Container**: Nginx runs in a separate container, handling incoming traffic and SSL.
- **SSL/TLS Termination**: Nginx is configured to terminate SSL using self-signed certificates for local deployment, exposing the application over HTTPS.
- **Path-Based Routing**: Nginx routes requests to different backend services based on URL paths (`/`, `/api`, `/history`).
- **Environment Variables**: Configuration (like API keys and database URLs) is managed through environment variables, loaded from a `.env` file and set in `docker-compose.yml`.
- **Custom Docker Network**: A dedicated bridge network (`weather-net`) facilitates communication between containers using service names.

