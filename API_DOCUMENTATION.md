# Atlas Digitalize API Documentation

**Version**: 1.0.0  
**Base URL**: `/api`

---

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
   - [Root & Health](#root--health)
   - [Contacts](#contacts)
   - [Insights](#insights)
   - [Projects](#projects)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)

---

## Overview

The Atlas Digitalize API provides endpoints for managing:
- **Contact form submissions** - Customer consultation requests
- **Insights/Blog articles** - Bilingual content management
- **Projects/Case studies** - Portfolio management

### Tech Stack
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Server**: Uvicorn

---

## Authentication

Currently, the API is open for public access. Admin endpoints (listing contacts, CRUD operations) should be protected in production with authentication middleware.

---

## Endpoints

### Root & Health

#### GET `/api/`
Returns API information.

**Response** `200 OK`
```json
{
  "message": "Atlas Digitalize API",
  "version": "1.0.0"
}
```

#### GET `/api/health`
Health check endpoint.

**Response** `200 OK`
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

### Contacts

#### POST `/api/contacts`
Submit a contact/consultation request.

**Request Body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Full name (1-100 chars) |
| email | string | Yes | Valid email address |
| company | string | No | Company name |
| phone | string | No | Phone number |
| service | string | No | Service of interest |
| message | string | Yes | Message content |
| language | string | No | "en" or "id" (default: "en") |

**Example Request**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "phone": "+62812345678",
  "service": "Custom ERP Development",
  "message": "I would like to discuss ERP implementation for our company.",
  "language": "en"
}
```

**Response** `201 Created`
```json
{
  "id": "uuid-string",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "phone": "+62812345678",
  "service": "Custom ERP Development",
  "message": "I would like to discuss ERP implementation for our company.",
  "language": "en",
  "status": "new",
  "created_at": "2025-01-13T10:30:00.000Z"
}
```

---

#### GET `/api/contacts`
List all contact submissions (admin).

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status: "new", "read", "responded", "archived" |
| limit | integer | Max results (1-100, default: 50) |
| skip | integer | Offset for pagination (default: 0) |

**Example**: `GET /api/contacts?status=new&limit=10`

**Response** `200 OK`
```json
[
  {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "phone": "+62812345678",
    "service": "Custom ERP Development",
    "message": "...",
    "language": "en",
    "status": "new",
    "created_at": "2025-01-13T10:30:00.000Z"
  }
]
```

---

#### GET `/api/contacts/{contact_id}`
Get a single contact by ID.

**Response** `200 OK` - Contact object  
**Response** `404 Not Found` - Contact not found

---

#### PATCH `/api/contacts/{contact_id}`
Update contact status.

**Request Body**
```json
{
  "status": "read"
}
```

**Valid status values**: `new`, `read`, `responded`, `archived`

**Response** `200 OK` - Updated contact object

---

#### DELETE `/api/contacts/{contact_id}`
Delete a contact submission.

**Response** `204 No Content`  
**Response** `404 Not Found` - Contact not found

---

### Insights

#### POST `/api/insights`
Create a new blog/insight article.

**Request Body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | string | Yes | Unique URL slug |
| title | BilingualText | Yes | Article title |
| excerpt | BilingualText | Yes | Short description |
| content | BilingualText | Yes | Full content (markdown) |
| category | BilingualText | Yes | Category name |
| read_time | string | No | Estimated read time (default: "5 min") |
| published | boolean | No | Publication status (default: false) |
| featured_image | string | No | Image URL |

**BilingualText Format**
```json
{
  "en": "English text",
  "id": "Indonesian text"
}
```

**Example Request**
```json
{
  "slug": "digital-transformation-guide",
  "title": {
    "en": "Digital Transformation Guide",
    "id": "Panduan Transformasi Digital"
  },
  "excerpt": {
    "en": "Learn how to transform your business digitally.",
    "id": "Pelajari cara mentransformasi bisnis Anda secara digital."
  },
  "content": {
    "en": "# Digital Transformation Guide\n\nContent here...",
    "id": "# Panduan Transformasi Digital\n\nKonten di sini..."
  },
  "category": {
    "en": "Strategy",
    "id": "Strategi"
  },
  "read_time": "7 min",
  "published": true
}
```

**Response** `201 Created` - Insight object  
**Response** `400 Bad Request` - Slug already exists

---

#### GET `/api/insights`
List all insights with optional filters.

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category (case-insensitive) |
| published | boolean | Filter by publication status |
| limit | integer | Max results (1-100, default: 20) |
| skip | integer | Offset for pagination (default: 0) |

**Example**: `GET /api/insights?category=ERP&published=true`

**Response** `200 OK` - Array of insight objects

---

#### GET `/api/insights/{slug}`
Get a single insight by slug.

**Response** `200 OK` - Insight object  
**Response** `404 Not Found` - Insight not found

---

#### PUT `/api/insights/{slug}`
Update an insight article.

**Request Body** - Same as POST (all fields optional for partial update)

**Response** `200 OK` - Updated insight object

---

#### DELETE `/api/insights/{slug}`
Delete an insight article.

**Response** `204 No Content`  
**Response** `404 Not Found` - Insight not found

---

### Projects

#### POST `/api/projects`
Create a new project/case study.

**Request Body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| industry | BilingualText | Yes | Industry category |
| system_type | BilingualText | Yes | System/solution type |
| title | BilingualText | Yes | Project title |
| scope | BilingualText | Yes | Project scope description |
| outcome | BilingualText | Yes | Results/outcomes achieved |
| featured | boolean | No | Featured status (default: false) |
| order | integer | No | Display order (default: 0) |

**Example Request**
```json
{
  "industry": {
    "en": "Manufacturing",
    "id": "Manufaktur"
  },
  "system_type": {
    "en": "Custom ERP",
    "id": "ERP Kustom"
  },
  "title": {
    "en": "Integrated ERP for Manufacturing Company",
    "id": "ERP Terintegrasi untuk Perusahaan Manufaktur"
  },
  "scope": {
    "en": "Finance, inventory, production planning",
    "id": "Keuangan, inventaris, perencanaan produksi"
  },
  "outcome": {
    "en": "Reduced operational costs by 30%",
    "id": "Mengurangi biaya operasional sebesar 30%"
  },
  "featured": true,
  "order": 1
}
```

**Response** `201 Created` - Project object

---

#### GET `/api/projects`
List all projects with optional filters.

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| industry | string | Filter by industry (case-insensitive) |
| system_type | string | Filter by system type (case-insensitive) |
| featured | boolean | Filter by featured status |
| limit | integer | Max results (1-100, default: 20) |
| skip | integer | Offset for pagination (default: 0) |

**Example**: `GET /api/projects?industry=retail&featured=true`

**Response** `200 OK` - Array of project objects (sorted by order)

---

#### GET `/api/projects/{project_id}`
Get a single project by ID.

**Response** `200 OK` - Project object  
**Response** `404 Not Found` - Project not found

---

#### PUT `/api/projects/{project_id}`
Update a project/case study.

**Request Body** - Same as POST (all fields optional for partial update)

**Response** `200 OK` - Updated project object

---

#### DELETE `/api/projects/{project_id}`
Delete a project/case study.

**Response** `204 No Content`  
**Response** `404 Not Found` - Project not found

---

## Data Models

### BilingualText
```typescript
{
  en: string;  // English content
  id: string;  // Indonesian content
}
```

### Contact
```typescript
{
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  language: "en" | "id";
  status: "new" | "read" | "responded" | "archived";
  created_at: datetime;
}
```

### Insight
```typescript
{
  id: string;
  slug: string;
  title: BilingualText;
  excerpt: BilingualText;
  content: BilingualText;
  category: BilingualText;
  read_time: string;
  published: boolean;
  featured_image?: string;
  created_at: datetime;
  updated_at: datetime;
}
```

### Project
```typescript
{
  id: string;
  industry: BilingualText;
  system_type: BilingualText;
  title: BilingualText;
  scope: BilingualText;
  outcome: BilingualText;
  featured: boolean;
  order: number;
  created_at: datetime;
  updated_at: datetime;
}
```

---

## Error Handling

### Error Response Format
```json
{
  "detail": "Error message description"
}
```

### HTTP Status Codes
| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Resource deleted successfully |
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

---

## Interactive API Documentation

FastAPI provides automatic interactive documentation:

- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`

Access these endpoints in your browser to explore and test the API interactively.

---

## Example Usage (JavaScript/Axios)

```javascript
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Submit contact form
const submitContact = async (formData) => {
  const response = await axios.post(`${API}/contacts`, formData);
  return response.data;
};

// Fetch insights with filter
const fetchInsights = async (category = null) => {
  const params = category ? { category } : {};
  const response = await axios.get(`${API}/insights`, { params });
  return response.data;
};

// Fetch projects
const fetchProjects = async (industry = null) => {
  const params = industry ? { industry } : {};
  const response = await axios.get(`${API}/projects`, { params });
  return response.data;
};
```

---

**Generated for**: Atlas Digitalize Corporate Website  
**Last Updated**: January 2025
