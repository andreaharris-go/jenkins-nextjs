# Jenkins + Next.js Project

This project integrates Jenkins CI/CD with a Next.js application, providing automated build and deployment capabilities using Docker.

## Project Structure

- **Next.js Application**: Modern React framework with TypeScript and Tailwind CSS
- **Jenkins**: CI/CD automation server running in Docker
- **Docker**: Containerization for both Jenkins and Next.js application

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### 1. Start Jenkins Server

Start Jenkins using Docker Compose:

```bash
docker-compose up -d
```

Jenkins will be available at:
- **URL**: http://localhost:8080/jenkins
- **Port**: 8080 (HTTP)
- **Port**: 50000 (Agent communication)

#### Initial Jenkins Setup

1. Get the initial admin password:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

2. Open http://localhost:8080/jenkins in your browser
3. Enter the initial admin password
4. Install suggested plugins
5. Create your first admin user

#### Configure Jenkins for the Project

1. Install required plugins:
   - Docker Pipeline
   - NodeJS Plugin
   - Git Plugin

2. Create a new Pipeline job:
   - Click "New Item"
   - Enter a name (e.g., "nextjs-build")
   - Select "Pipeline"
   - In the Pipeline section, select "Pipeline script from SCM"
   - Choose "Git" and enter your repository URL
   - Specify "Jenkinsfile" as the script path

### 2. Run Next.js Development Server

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### 3. Build Next.js Application

Build the production version:

```bash
npm run build
npm start
```

### 4. Build Docker Image for Next.js

Build the Next.js Docker image:

```bash
docker build -t jenkins-nextjs:latest .
```

Run the Docker container:

```bash
docker run -p 3000:3000 jenkins-nextjs:latest
```

## Jenkins Pipeline

The `Jenkinsfile` defines a CI/CD pipeline with the following stages:

1. **Checkout**: Clone the repository
2. **Install Dependencies**: Run `npm ci` to install dependencies
3. **Lint**: Run ESLint to check code quality
4. **Build**: Build the Next.js application
5. **Build Docker Image**: Create a Docker image of the application
6. **Test Docker Image**: Test the Docker image by running it and checking if it responds

## Docker Configuration

### docker-compose.yml

The `docker-compose.yml` file sets up Jenkins with:
- Persistent data volume for Jenkins home
- Docker socket mounting for building images
- Network configuration
- Port mappings

### Dockerfile

The `Dockerfile` for Next.js uses:
- Multi-stage build for optimization
- Node.js 20 Alpine Linux
- Standalone output mode
- Production optimizations

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

### Jenkins Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)

## Stopping Services

Stop Jenkins:

```bash
docker-compose down
```

To remove volumes as well:

```bash
docker-compose down -v
```

