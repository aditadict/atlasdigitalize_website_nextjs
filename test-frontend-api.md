# Frontend API Integration Test Guide

## Status: ✅ Successfully Integrated

### Backend Server

- **URL**: http://127.0.0.1:9000
- **API**: http://127.0.0.1:9000/api
- **Status**: Running (PID: 59333)

### Frontend Server

- **URL**: http://localhost:3000
- **Status**: Running
- **Environment**: REACT_APP_BACKEND_URL=http://127.0.0.1:9000

## Integration Points

### 1. **Contact Form** ✅ Already Integrated

- **File**: `frontend/src/components/pages/ContactPage.jsx`
- **API Call**: `submitContact()` from `services/api.js`
- **Endpoint**: `POST /api/contacts`
- **Features**:
  - Bilingual support (EN/ID)
  - Service dropdown
  - WhatsApp integration
  - Success/error toast notifications

### 2. **Insights Section** ✅ Already Integrated

- **Files**:
  - `frontend/src/components/sections/InsightsSection.jsx` (Home page - 3 articles)
  - `frontend/src/components/pages/InsightsPage.jsx` (Full page with filters)
- **API Call**: `getInsights()` from `services/api.js`
- **Endpoint**: `GET /api/insights`
- **Features**:
  - Category filtering
  - Loading states
  - Bilingual content display
  - Read time display

### 3. **Projects Section** ✅ Already Integrated

- **File**: `frontend/src/components/sections/ProjectsSection.jsx`
- **API Call**: `getProjects()` from `services/api.js`
- **Endpoint**: `GET /api/projects`
- **Features**:
  - Featured projects display (4 projects)
  - Industry and system type display
  - Loading states
  - Bilingual content

## Manual Testing Checklist

### Test 1: Home Page - Insights Section

1. ✅ Open http://localhost:3000
2. ✅ Scroll to "Insights & Thought Leadership" section
3. ✅ Verify 3 articles are loaded from API
4. ✅ Check category badges display correctly
5. ✅ Check bilingual content (switch EN/ID)

### Test 2: Home Page - Projects Section

1. ✅ On home page, scroll to "Case Studies" section
2. ✅ Verify 4 featured projects are loaded from API
3. ✅ Check industry and system type display
4. ✅ Check bilingual content (switch EN/ID)

### Test 3: Insights Page

1. ✅ Navigate to http://localhost:3000/en/insights
2. ✅ Verify all published insights are loaded
3. ✅ Test category filters (All, Strategy, ERP, Integration, HRIS, Retail, DMS)
4. ✅ Verify articles update when filter changes
5. ✅ Check loading states
6. ✅ Test Indonesian version: http://localhost:3000/id/insights

### Test 4: Contact Form

1. ✅ Navigate to http://localhost:3000/en/contact
2. ✅ Fill in form:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Phone: +62 812 3456 7890
   - Service: Select any service
   - Message: Test message
3. ✅ Submit form
4. ✅ Verify success toast appears
5. ✅ Check backend database for new contact entry

### Test 5: API Error Handling

1. ✅ Stop backend server: `kill 59333`
2. ✅ Refresh frontend
3. ✅ Verify error messages display correctly
4. ✅ Restart backend: `cd atlas_website_backend && php artisan serve --port=9000`

## Browser Console Tests

Open browser console (F12) and run:

```javascript
// Test 1: Check API base URL
console.log("API Base URL:", process.env.REACT_APP_BACKEND_URL);

// Test 2: Test health check (open Network tab first)
fetch("http://127.0.0.1:9000/api/health")
  .then((r) => r.json())
  .then((data) => console.log("Health Check:", data));

// Test 3: Check insights data in component
// Go to home page and check console for API responses
```

## Expected API Responses

### Insights (3 on home page):

```json
[
  {
    "id": "uuid",
    "slug": "digital-transformation-2026",
    "title": {
      "en": "Complete Guide to Digital Transformation in 2026",
      "id": "Panduan Lengkap Transformasi Digital di 2026"
    },
    "category": {
      "en": "Strategy",
      "id": "Strategi"
    },
    "read_time": "7 min",
    "published": true
  },
  ...
]
```

### Projects (4 featured on home page):

```json
[
  {
    "id": "uuid",
    "industry": {
      "en": "E-Commerce",
      "id": "E-Commerce"
    },
    "system_type": {
      "en": "Web Application",
      "id": "Aplikasi Web"
    },
    "title": {
      "en": "Multi-Vendor Marketplace Platform",
      "id": "Platform Marketplace Multi-Vendor"
    },
    "featured": true,
    "order": 1
  },
  ...
]
```

### Contact Submission:

```json
{
  "message": "Contact created successfully",
  "contact": {
    "id": "uuid",
    "name": "Test User",
    "email": "test@example.com",
    "status": "new"
  }
}
```

## Troubleshooting

### Issue: CORS errors in browser console

**Solution**: Backend already configured with CORS for localhost:3000

```php
// backend/bootstrap/app.php has:
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: ['api/*']);
})
```

### Issue: "Failed to load articles/projects"

**Check**:

1. Backend server running on port 9000
2. .env file exists in frontend/ with correct URL
3. Database has seeded data

### Issue: Form submission fails

**Check**:

1. Network tab for actual error
2. Backend logs: `tail -f storage/logs/laravel.log`
3. Validation errors in response

## Next Steps

### Optional Enhancements:

1. **Pagination**: Add pagination to insights/projects pages
2. **Search**: Add search functionality for insights
3. **Individual Pages**: Create detailed pages for each insight/project
4. **Image Upload**: Add featured image upload in contact form
5. **Loading Skeletons**: Replace spinners with skeleton loaders
6. **Error Boundaries**: Add React error boundaries
7. **Analytics**: Track API calls and user interactions

### Production Checklist:

- [ ] Update REACT_APP_BACKEND_URL to production URL
- [ ] Update CORS configuration in backend for production domain
- [ ] Enable HTTPS for API
- [ ] Add rate limiting on backend
- [ ] Optimize images and assets
- [ ] Add caching headers
- [ ] Set up CDN for assets
- [ ] Configure proper error logging
