IMY220-Project PhotoShare

How to run the project:
Make sure Docker is running, then create a .env file inside the backend folder
containing your MongoDB Atlas connection string and any other variables server.js uses.

Build and run the frontend and backend together (from the folder containing docker-compose.yml):
docker compose up --build

The frontend runs on http://localhost:5173
The backend runs on http://localhost:3000

Stop the project:
docker compose down

How to run frontend only:
Build the frontend Docker image:
docker build -t my-frontend ./frontend
Run the frontend container:
docker run -p 5173:5173 my-frontend

How to run backend only:
Build the backend Docker image:
docker build -t my-backend ./backend
Run the backend container:
docker run -p 3000:3000 --env-file ./backend/.env my-backend

GitHub Repository:

https://github.com/CyberRaptor98/IMY220-Project.git