# DevOps Task Manager - CI/CD Project

## Project Description
A collaborative Node.js task management application with automated CI/CD pipeline, Docker containerization, and cloud deployment to Vercel.

## Team Members and Roles
- **Product Owner / Project Leader:** [Team Lead Name]
- **Team Members:** [Member 1], [Member 2], [Member 3]

## Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Client (Frontend)                     │
│              (HTML, CSS, JavaScript, Socket.io)         │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│              Express.js API Server                       │
│  (Routes: /users, /tasks, WebSocket Support)           │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│          MySQL Database                                  │
│  (Users, Tasks, Authentication)                        │
└─────────────────────────────────────────────────────────┘

CI/CD Pipeline (GitLab):
  Build → Test → Deploy (Vercel)
```

See `ARCHITECTURE.md` for detailed technical architecture.

## Installation and Launch

### Local Development
1. **Clone repository:**
   ```bash
   git clone https://github.com/wael-khadraoui/devops.git
   cd devops
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

4. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```
   - App runs on `http://localhost:3000`
   - MySQL on `localhost:3306`

5. **Run locally (without Docker):**
   ```bash
   npm start
   ```

### Docker
```bash
# Build image
docker build -t devops-task-manager .

# Run with docker-compose
docker-compose up -d
```

## Required Environment Variables
```env
# Database
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=task_manager

# Server
PORT=3000
NODE_ENV=production
```

See `.env.example` for all variables.

## Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

Current test coverage: >60% (Unit tests for core functions)

## Deployed Application
- **URL:** https://devops-task-manager.vercel.app
- **Status:** [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://devops-task-manager.vercel.app)

## CI/CD Pipeline
[![GitLab Pipeline](https://gitlab.com/rawaaaa/projet-devops-2025/badges/main/pipeline.svg)](https://gitlab.com/rawaaaa/projet-devops-2025/pipelines)

**Stages:**
1. **Build:** Docker image compilation
2. **Test:** Automated unit tests
3. **Deploy:** Automatic deployment to Vercel

**Status:** All stages passing ✅

## Features
- ✅ User authentication (login/register)
- ✅ Task CRUD operations
- ✅ Real-time updates with Socket.io
- ✅ Responsive design
- ✅ Docker containerization
- ✅ Automated CI/CD pipeline
- ✅ Cloud deployment

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** MySQL
- **Real-time:** Socket.io
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitLab CI/CD
- **Deployment:** Vercel
- **Version Control:** Git, GitHub

## Documentation
- `ARCHITECTURE.md` - Technical architecture and design
- `DEPLOYMENT.md` - Detailed deployment guide
- `USER_STORIES.md` - User stories and acceptance criteria

## Contributing
1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit with conventional commits: `git commit -m "feat(scope): description"`
3. Create Merge Request to `develop`
4. Code review required before merge
5. All CI tests must pass

## License
MIT

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
