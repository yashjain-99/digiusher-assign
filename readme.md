# Steps to Run the Project

1. Clone this repository:
   git clone https://github.com/yashjain-99/digiusher-assign.git

2. Set up the backend:
   cd backend
   pip install -r requirements.txt
   uvicorn app:app --reload

3. Test if the backend is running:
   curl http://127.0.0.1:8000/products/

4. Set up the frontend:
   cd frontend
   npm install
   npm run dev
