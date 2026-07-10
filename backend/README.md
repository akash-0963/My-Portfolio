# Portfolio Backend API

Python Flask backend with MongoDB to manage contact form submissions.

## 📦 Prerequisites

- Python 3.8+
- MongoDB (local or MongoDB Atlas)

## 🚀 Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure MongoDB

**Local MongoDB:**
- Ensure MongoDB is running on `localhost:27017`

**MongoDB Atlas (Cloud):**
- Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

### 4. Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `MONGO_URI` in `.env`:

```env
MONGO_URI=mongodb://localhost:27017/portfolio
# or for Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 5. Run Server

```bash
python app.py
```

Server runs on: `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Get All Contacts
```
GET /api/contacts
Returns: All contacts sorted by newest first
```

### Add Contact
```
POST /api/contacts
{
  "name": "John Doe",
  "email": "john@example.com",
  "countryCode": "+91",
  "phone": "1234567890",
  "service": "Web Development",
  "budget": "50000",
  "idea": "Build a website..."
}
```

### Get Specific Contact
```
GET /api/contacts/{id}
```

### Delete Contact
```
DELETE /api/contacts/{id}
```

### Search Contacts
```
POST /api/contacts/search
{
  "query": "john@example.com"
}
```

## 💾 Database

- **Database:** portfolio
- **Collection:** contacts

Each contact document stores:
- name, email, countryCode, phone
- service, budget, idea
- timestamp (auto-generated)

## 🔄 Frontend Integration

Update Contact form in frontend to send to backend:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Contact saved:', result.contact);
      setStatus('success');
    }
  } catch (error) {
    console.error('Error:', error);
    setStatus('error');
  }
};
```

## 📝 License

Open source - feel free to use and modify
