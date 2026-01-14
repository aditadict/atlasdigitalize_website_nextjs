# API Contracts - Atlas Digitalize Corporate Website

## Overview
This document captures the API contracts for the Atlas Digitalize corporate website backend.

## Base URL
- Development: `http://localhost:8001/api`
- Production: `${REACT_APP_BACKEND_URL}/api`

---

## 1. Contact Form API

### Submit Contact Form
- **Endpoint**: `POST /api/contacts`
- **Description**: Submit a contact/consultation request
- **Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "company": "string (optional)",
  "phone": "string (optional)",
  "service": "string (optional)",
  "message": "string (required)",
  "language": "string (en/id)"
}
```
- **Response**: `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "company": "string",
  "phone": "string",
  "service": "string",
  "message": "string",
  "language": "string",
  "created_at": "datetime",
  "status": "new"
}
```

### List Contacts (Admin)
- **Endpoint**: `GET /api/contacts`
- **Query Params**: `status`, `limit`, `skip`
- **Response**: `200 OK` - Array of contacts

### Get Single Contact
- **Endpoint**: `GET /api/contacts/{id}`
- **Response**: `200 OK` - Contact object

### Update Contact Status
- **Endpoint**: `PATCH /api/contacts/{id}`
- **Request Body**: `{ "status": "new|read|responded|archived" }`
- **Response**: `200 OK` - Updated contact

### Delete Contact
- **Endpoint**: `DELETE /api/contacts/{id}`
- **Response**: `204 No Content`

---

## 2. Insights/Blog API

### Create Insight
- **Endpoint**: `POST /api/insights`
- **Request Body**:
```json
{
  "slug": "string (unique)",
  "title": { "en": "string", "id": "string" },
  "excerpt": { "en": "string", "id": "string" },
  "content": { "en": "string (markdown)", "id": "string (markdown)" },
  "category": { "en": "string", "id": "string" },
  "read_time": "string",
  "published": "boolean",
  "featured_image": "string (optional URL)"
}
```
- **Response**: `201 Created`

### List Insights
- **Endpoint**: `GET /api/insights`
- **Query Params**: `category`, `published`, `limit`, `skip`
- **Response**: `200 OK` - Array of insights

### Get Single Insight
- **Endpoint**: `GET /api/insights/{slug}`
- **Response**: `200 OK` - Insight object

### Update Insight
- **Endpoint**: `PUT /api/insights/{slug}`
- **Request Body**: Same as create (partial update supported)
- **Response**: `200 OK` - Updated insight

### Delete Insight
- **Endpoint**: `DELETE /api/insights/{slug}`
- **Response**: `204 No Content`

---

## 3. Projects/Case Studies API

### Create Project
- **Endpoint**: `POST /api/projects`
- **Request Body**:
```json
{
  "industry": { "en": "string", "id": "string" },
  "system_type": { "en": "string", "id": "string" },
  "title": { "en": "string", "id": "string" },
  "scope": { "en": "string", "id": "string" },
  "outcome": { "en": "string", "id": "string" },
  "featured": "boolean",
  "order": "integer"
}
```
- **Response**: `201 Created`

### List Projects
- **Endpoint**: `GET /api/projects`
- **Query Params**: `industry`, `system_type`, `featured`, `limit`, `skip`
- **Response**: `200 OK` - Array of projects

### Get Single Project
- **Endpoint**: `GET /api/projects/{id}`
- **Response**: `200 OK` - Project object

### Update Project
- **Endpoint**: `PUT /api/projects/{id}`
- **Request Body**: Same as create (partial update supported)
- **Response**: `200 OK` - Updated project

### Delete Project
- **Endpoint**: `DELETE /api/projects/{id}`
- **Response**: `204 No Content`

---

## Mock Data Migration

### Currently Mocked in Frontend:
1. `mockProjects` - 4 case studies (Manufacturing DMS, Manufacturing WMS, Retail POS, Retail HRIS)
2. `mockInsights` - 6 blog articles
3. `mockClients` - 6 client placeholders
4. Contact form submissions (not persisted)

### Migration Plan:
1. Create backend endpoints
2. Seed database with mock data
3. Update frontend to fetch from API
4. Remove mock.js dependencies for dynamic data

---

## Frontend Integration Points

### Files to Update:
- `src/components/pages/ContactPage.jsx` - Submit to API
- `src/components/pages/InsightsPage.jsx` - Fetch from API
- `src/components/pages/CaseStudiesPage.jsx` - Fetch from API
- `src/components/sections/ProjectsSection.jsx` - Fetch from API
- `src/components/sections/InsightsSection.jsx` - Fetch from API

### API Service Pattern:
```javascript
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Example fetch
const fetchInsights = async (category) => {
  const params = category ? `?category=${category}` : '';
  const response = await axios.get(`${API}/insights${params}`);
  return response.data;
};
```
