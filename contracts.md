# DAITA Solutions API Contracts

## Overview
This document defines the API contracts for integrating the DAITA Solutions landing page frontend with the backend system.

## Current Mock Data Structure

### 1. Company Information
```javascript
company: {
  name: "DAITA Solutions",
  tagline: "Transforming Business Through Intelligent AI Solutions", 
  description: "Leading IT consulting firm..."
}
```

### 2. Services (3 items)
```javascript
services: [{
  id: number,
  title: string,
  description: string,
  features: string[],
  icon: string
}]
```

### 3. Team Members (3 items)  
```javascript
team: [{
  id: number,
  name: string,
  role: string,
  bio: string,
  image: string
}]
```

### 4. Testimonials (3 items)
```javascript
testimonials: [{
  id: number,
  name: string,
  role: string,
  content: string,
  rating: number
}]
```

### 5. Case Studies (3 items)
```javascript
caseStudies: [{
  id: number,
  title: string,
  client: string,
  challenge: string,
  solution: string,
  results: string[],
  industry: string
}]
```

### 6. Contact Information
```javascript
contact: {
  email: string,
  phone: string,
  address: string,
  hours: string
}
```

## API Endpoints to Implement

### GET /api/company
- **Purpose**: Get company information
- **Response**: Company object
- **Status**: 200 OK

### GET /api/services
- **Purpose**: Get all services
- **Response**: Array of service objects
- **Status**: 200 OK

### GET /api/team
- **Purpose**: Get team members
- **Response**: Array of team member objects
- **Status**: 200 OK

### GET /api/testimonials
- **Purpose**: Get client testimonials
- **Response**: Array of testimonial objects
- **Status**: 200 OK

### GET /api/case-studies
- **Purpose**: Get case studies
- **Response**: Array of case study objects
- **Status**: 200 OK

### GET /api/contact
- **Purpose**: Get contact information
- **Response**: Contact object
- **Status**: 200 OK

### POST /api/contact/message
- **Purpose**: Submit contact form
- **Request Body**:
```javascript
{
  name: string,
  email: string,
  company?: string,
  message: string
}
```
- **Response**: 
```javascript
{
  id: string,
  status: "received",
  timestamp: string
}
```
- **Status**: 201 Created

## MongoDB Collections

### 1. `company` Collection
- Single document with company information
- Fields: name, tagline, description, createdAt, updatedAt

### 2. `services` Collection  
- Multiple service documents
- Fields: _id, title, description, features, icon, order, isActive, createdAt

### 3. `team` Collection
- Multiple team member documents
- Fields: _id, name, role, bio, image, order, isActive, createdAt

### 4. `testimonials` Collection
- Multiple testimonial documents
- Fields: _id, name, role, content, rating, isActive, createdAt

### 5. `caseStudies` Collection
- Multiple case study documents  
- Fields: _id, title, client, challenge, solution, results, industry, isActive, createdAt

### 6. `contact` Collection
- Single document with contact information
- Fields: email, phone, address, hours, updatedAt

### 7. `contactMessages` Collection
- Contact form submissions
- Fields: _id, name, email, company, message, status, timestamp, ipAddress

## Frontend Integration Plan

### Data Loading Strategy
- Replace mock data imports with API calls
- Use React useEffect hooks to fetch data on component mount
- Implement loading states for better UX
- Add error handling for failed API calls

### Contact Form Integration
- Replace mock form submission with actual API call
- Add proper form validation feedback
- Show success/error messages based on API response
- Clear form after successful submission

### API Service Layer
Create `/frontend/src/services/api.js`:
- Centralized API calls
- Error handling
- Base URL configuration
- Request/response interceptors

### Error Handling
- Network error handling
- Loading states during API calls
- Fallback content for failed requests
- User-friendly error messages

## Implementation Steps

1. **Backend Models**: Create MongoDB models for all collections
2. **Seed Data**: Populate database with mock data  
3. **API Endpoints**: Implement all GET/POST endpoints
4. **Frontend Service**: Create API service layer
5. **Component Integration**: Replace mock data with API calls
6. **Testing**: Verify all endpoints and frontend integration
7. **Error Handling**: Add comprehensive error handling

## Success Criteria

- ✅ All mock data replaced with database data
- ✅ Contact form submits to backend successfully  
- ✅ All sections load data from API endpoints
- ✅ Proper loading states and error handling
- ✅ Responsive design maintained
- ✅ No console errors or warnings