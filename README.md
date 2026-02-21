# Meeting Scheduler Application

This is a meeting scheduler application that allows users to create meetings, add participants, and export meeting information as an ICS file. The application is built with frontend and backend both.

---

## Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: Django, Python
- **Database**: SQLite (for development)
- **Calendar Export**: ics (ICS file generation)
- **Email**: SMTP

---

## Project Setup

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (for the frontend)
- [Python 3.x](https://www.python.org/downloads/) (for the backend)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)
- [Django](https://www.djangoproject.com/) (Python web framework)

---

## Backend Setup (Django)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Set up a virtual environment:

```bash
python3 -m venv venv
```

3. Activate the virtual environment:

- On Linux/macOS:

```bash
source venv/bin/activate
```

- On Windows:

```bash
.\venv\Scripts\activate
```

4. Install the required dependencies:

```bash
pip install -r requirements.txt
```

5. Run database migrations:

```bash
python3 manage.py migrate
python3 manage.py makemigration
```

6. Start the Django development server:

```bash
python3 manage.py runserver
```

- The backend will be available at `http://localhost:8000`

## API Endpoints

Here are the available API endpoints:

1. Create Meeting
   - URL: /api/create_meeting/

   - Method: POST

   - Request Body:

   ```json
   {
     "title": "Meeting Title",
     "description": "Description of the meeting",
     "start_time": "2026-02-20T10:00:00",
     "end_time": "2026-02-20T11:00:00"
   }
   ```

   - Response:

   ```json
   {
     "message": "Meeting created successfully",
     "meeting_id": 1
   }
   ```

2. Add Participant to Meeting
   - URL: /api/add_participant/

   - Method: POST

   - Request Body:

   ```json
   {
     "meeting_id": 1,
     "email": "participant@example.com"
   }
   ```

   - Response:

   ```json
   {
     "message": "Participant added successfully and email sent!"
   }
   ```

3. Export Meeting to ICS File
   - URL: /api/export_ics/<meeting_id>/

   - Method: GET

   - Response: Downloaded ICS file for the meeting.

## Frontend Setup

1. Navigate to the **frontend** folder:

```bash
cd frontend
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

- The frontend will be available at `http://localhost:3000`

## Architecture, Design Decisions, and Assumptions

#### **Architecture**:

The application follows a **Client-Server architecture** with a **React.js** frontend and **Django** backend. The frontend communicates with the backend via **RESTful API** calls.

1. **Frontend**:
   - Built with React.js, which dynamically renders the UI.
   - **Axios** is used for making API requests to the backend.
   - The frontend handles user input for **creating meetings** and **adding participants**.
   - After submitting the meeting details or participant information, the frontend updates the UI based on the response from the backend.

2. **Backend**:
   - Built with **Django** which provides the **API endpoints** to handle requests for creating meetings, adding participants, and exporting to ICS files.
   - Uses **SQLite** as the database for storing meetings and participants' information.
   - The backend handles **email notifications** via SMTP (using Gmail or other services).

#### **Design Decisions**:

- **Simple RESTful API**: Using simple HTTP methods (`POST`, `GET`) for CRUD operations.
- **React frontend** for dynamic UI rendering and API calls.
- **Django backend** to handle business logic and database interactions.
- **SMTP** for email notifications, avoiding third-party email services.

#### **Assumptions**:

- Meetings can only be scheduled with unique emails for participants (no duplicate participants).
- All API requests are handled securely with **CSRF** tokens (disabled in development for simplicity).

---

## Database Schema Explanation

The database consists of two main models:

1. **Meeting Model**:
   - **title** (CharField): Title of the meeting.
   - **description** (TextField): Description of the meeting.
   - **start_time** (DateTimeField): Start time of the meeting.
   - **end_time** (DateTimeField): End time of the meeting.

2. **Participant Model**:
   - **meeting** (ForeignKey): Foreign key to the Meeting model.
   - **email** (EmailField): Email of the participant.
   - **status** (CharField): Status of the participant
