# Privacy Guardian

Privacy Guardian is a modular platform for privacy-preserving data processing and sharing. It features:

- A modern web frontend built with the Lynx framework by TikTok (using Rspeedy and TypeScript)
- A Node.js backend API for business logic and orchestration
- A Python-based local model service for tasks such as Named Entity Recognition (NER) or LLM inference
- All components are containerised for easy deployment with Docker

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js 18+](https://nodejs.org/) (for local development)
- [Python 3.10+](https://www.python.org/) (for model development)

## Getting Started

1. Clone repo
2. Ensure you have the suitable system prerequisites as above.
3. Run `./start.sh`.
4. Use Lynx Explorer to scan the QR code or enter the card link to access the app.

## Tech Stack

- **Frontend:**  
  Built with [Lynx](https://github.com/lynx-family/lynx), a high-performance web framework by TikTok, leveraging Rspeedy for fast builds and TypeScript for type safety. The frontend is bundled as `main.lynx.bundle` and can be served using a Lynx runtime.
- **Backend:**  
  A Node.js (Express) API server that handles business logic, routes, and acts as a bridge between the frontend and the model service. The backend is configured for development and exposes its API on port 4000.
- **Model Service:**  
  Python service for local LLM or NER model inference, easily extensible for other ML/NLP tasks.
- **Infrastructure:**  
  Docker for containerisation. Each component has its own Dockerfile for reproducible builds.

## Development Tools and Libraries

- **Frontend:**
  - Lynx (by TikTok) for the web framework
  - Rspeedy for fast development and builds
  - TypeScript for static typing
  - Vitest for testing
  - Biome for code formatting and linting
  - Frontend Assets are located in [frontend/src/assets](./frontend/src/assets/)
- **Backend:**
  - Node.js and Express for the API server
- **Model:**
  - Python 3.10+ (see [requirements.txt](./model/requirements.txt) for specific libraries, e.g., FastAPI, spaCy, or other ML/NLP libraries)
  - Model assets and configuration are in [NER-model](./model/NER-model/)
- **Infrastructure:**
  - Docker and Docker Compose for containerisation and orchestration

## API Endpoints

The backend exposes the following API endpoints:

| Method | Endpoint         | Description                                 |
|--------|------------------|---------------------------------------------|
| POST   | /ner             | Named Entity Recognition (NER) inference    |
| POST   | /vlm             | Vision-Language Model (VLM) inference       |
| POST   | /vlm/redact      | Redact sensitive info using VLM             |
| POST   | /vlm/unredact    | Unredact info using VLM                     |

## Repo Structure

```txt
.
├── backend/           # Node.js API server
│   ├── controller.js
|   ├── routes.js
│   └── server.js
├── frontend/          # Lynx web app
│   ├── src/
│   └── README.md
├── infra/             # Docker and deployment
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   ├── model.Dockerfile
│   └── docker-compose.yml
├── model/             # Local LLM / NER model
│   ├── app.py
│   ├── requirements.txt
│   └── NER-model/
├── start.sh           # To start up entire project
└── README.md
```
