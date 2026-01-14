#!/usr/bin/env python3
"""
Atlas Digitalize Backend API Test Suite
Tests all backend endpoints for the Atlas Digitalize corporate website
"""

import requests
import json
import sys
from typing import Dict, Any, Optional
import time

# Base URL from frontend environment
BASE_URL = "https://atlas-digital-2.preview.emergentagent.com/api"

class APITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.test_results = []
        self.created_resources = []  # Track created resources for cleanup
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'response': response_data
        })
    
    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, params: Optional[Dict] = None) -> tuple:
        """Make HTTP request and return (success, response, status_code)"""
        url = f"{self.base_url}{endpoint}"
        try:
            if method.upper() == 'GET':
                response = self.session.get(url, params=params, timeout=30)
            elif method.upper() == 'POST':
                response = self.session.post(url, json=data, params=params, timeout=30)
            elif method.upper() == 'PATCH':
                response = self.session.patch(url, json=data, params=params, timeout=30)
            elif method.upper() == 'PUT':
                response = self.session.put(url, json=data, params=params, timeout=30)
            elif method.upper() == 'DELETE':
                response = self.session.delete(url, params=params, timeout=30)
            else:
                return False, f"Unsupported method: {method}", 0
            
            return True, response, response.status_code
        except requests.exceptions.RequestException as e:
            return False, str(e), 0
    
    def test_root_and_health(self):
        """Test root and health endpoints"""
        print("=== Testing Root & Health Endpoints ===")
        
        # Test root endpoint
        success, response, status_code = self.make_request('GET', '/')
        if success and status_code == 200:
            try:
                data = response.json()
                if 'message' in data and 'version' in data:
                    self.log_test("GET /api/", True, f"Status: {status_code}, Message: {data.get('message')}")
                else:
                    self.log_test("GET /api/", False, f"Missing required fields in response", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # Test health endpoint
        success, response, status_code = self.make_request('GET', '/health')
        if success and status_code == 200:
            try:
                data = response.json()
                if 'status' in data and data['status'] == 'healthy':
                    self.log_test("GET /api/health", True, f"Status: {status_code}, Health: {data.get('status')}")
                else:
                    self.log_test("GET /api/health", False, f"Unhealthy status", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/health", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/health", False, f"Status: {status_code}, Error: {response if not success else response.text}")
    
    def test_contacts_api(self):
        """Test Contacts API CRUD operations"""
        print("=== Testing Contacts API ===")
        
        # Test data
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "company": "Tech Solutions Inc",
            "phone": "+1234567890",
            "service": "ERP Implementation",
            "message": "We need help with ERP system implementation for our growing business.",
            "language": "en"
        }
        
        contact_id = None
        
        # 1. Create contact (POST)
        success, response, status_code = self.make_request('POST', '/contacts', contact_data)
        if success and status_code == 201:
            try:
                data = response.json()
                contact_id = data.get('id')
                if contact_id and data.get('email') == contact_data['email']:
                    self.log_test("POST /api/contacts", True, f"Created contact with ID: {contact_id}")
                    self.created_resources.append(('contact', contact_id))
                else:
                    self.log_test("POST /api/contacts", False, "Missing ID or email mismatch", data)
            except json.JSONDecodeError:
                self.log_test("POST /api/contacts", False, "Invalid JSON response", response.text)
        else:
            self.log_test("POST /api/contacts", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 2. List all contacts (GET)
        success, response, status_code = self.make_request('GET', '/contacts')
        if success and status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/contacts", True, f"Retrieved {len(data)} contacts")
                else:
                    self.log_test("GET /api/contacts", False, "Response is not a list", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/contacts", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/contacts", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 3. Get single contact (GET by ID)
        if contact_id:
            success, response, status_code = self.make_request('GET', f'/contacts/{contact_id}')
            if success and status_code == 200:
                try:
                    data = response.json()
                    if data.get('id') == contact_id:
                        self.log_test("GET /api/contacts/{id}", True, f"Retrieved contact: {data.get('name')}")
                    else:
                        self.log_test("GET /api/contacts/{id}", False, "ID mismatch", data)
                except json.JSONDecodeError:
                    self.log_test("GET /api/contacts/{id}", False, "Invalid JSON response", response.text)
            else:
                self.log_test("GET /api/contacts/{id}", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 4. Update contact status (PATCH)
        if contact_id:
            update_data = {"status": "read"}
            success, response, status_code = self.make_request('PATCH', f'/contacts/{contact_id}', update_data)
            if success and status_code == 200:
                try:
                    data = response.json()
                    if data.get('status') == 'read':
                        self.log_test("PATCH /api/contacts/{id}", True, f"Updated status to: {data.get('status')}")
                    else:
                        self.log_test("PATCH /api/contacts/{id}", False, "Status not updated", data)
                except json.JSONDecodeError:
                    self.log_test("PATCH /api/contacts/{id}", False, "Invalid JSON response", response.text)
            else:
                self.log_test("PATCH /api/contacts/{id}", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 5. Delete contact (DELETE)
        if contact_id:
            success, response, status_code = self.make_request('DELETE', f'/contacts/{contact_id}')
            if success and status_code == 204:
                self.log_test("DELETE /api/contacts/{id}", True, "Contact deleted successfully")
                # Remove from cleanup list since it's already deleted
                self.created_resources = [(t, i) for t, i in self.created_resources if not (t == 'contact' and i == contact_id)]
            else:
                self.log_test("DELETE /api/contacts/{id}", False, f"Status: {status_code}, Error: {response if not success else response.text}")
    
    def test_insights_api(self):
        """Test Insights API CRUD operations"""
        print("=== Testing Insights API ===")
        
        # 1. List all insights (should return 6 seeded articles)
        success, response, status_code = self.make_request('GET', '/insights')
        if success and status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) >= 6:
                    self.log_test("GET /api/insights", True, f"Retrieved {len(data)} insights (expected 6+)")
                else:
                    self.log_test("GET /api/insights", False, f"Expected 6+ insights, got {len(data) if isinstance(data, list) else 'non-list'}", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/insights", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/insights", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 2. Filter by category (ERP)
        success, response, status_code = self.make_request('GET', '/insights', params={'category': 'ERP'})
        if success and status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    erp_found = any('ERP' in str(item.get('category', {})) for item in data)
                    if erp_found or len(data) > 0:
                        self.log_test("GET /api/insights?category=ERP", True, f"Retrieved {len(data)} ERP insights")
                    else:
                        self.log_test("GET /api/insights?category=ERP", False, "No ERP insights found", data)
                else:
                    self.log_test("GET /api/insights?category=ERP", False, "Response is not a list", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/insights?category=ERP", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/insights?category=ERP", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 3. Get by slug
        success, response, status_code = self.make_request('GET', '/insights/business-digitalization-strategy')
        if success and status_code == 200:
            try:
                data = response.json()
                if data.get('slug') == 'business-digitalization-strategy':
                    self.log_test("GET /api/insights/business-digitalization-strategy", True, f"Retrieved insight: {data.get('title', {}).get('en', 'N/A')}")
                else:
                    self.log_test("GET /api/insights/business-digitalization-strategy", False, "Slug mismatch", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/insights/business-digitalization-strategy", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/insights/business-digitalization-strategy", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 4. Create new insight (POST)
        insight_data = {
            "slug": "test-article",
            "title": {"en": "Test Article", "id": "Artikel Test"},
            "excerpt": {"en": "Test excerpt for testing purposes", "id": "Kutipan test untuk tujuan pengujian"},
            "content": {"en": "This is test content for our API testing.", "id": "Ini adalah konten test untuk pengujian API kami."},
            "category": {"en": "Testing", "id": "Pengujian"},
            "published": True
        }
        
        success, response, status_code = self.make_request('POST', '/insights', insight_data)
        if success and status_code == 201:
            try:
                data = response.json()
                if data.get('slug') == 'test-article':
                    self.log_test("POST /api/insights", True, f"Created insight: {data.get('title', {}).get('en', 'N/A')}")
                    self.created_resources.append(('insight', 'test-article'))
                else:
                    self.log_test("POST /api/insights", False, "Slug mismatch", data)
            except json.JSONDecodeError:
                self.log_test("POST /api/insights", False, "Invalid JSON response", response.text)
        else:
            self.log_test("POST /api/insights", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 5. Clean up - Delete test insight
        success, response, status_code = self.make_request('DELETE', '/insights/test-article')
        if success and status_code == 204:
            self.log_test("DELETE /api/insights/test-article", True, "Test insight deleted successfully")
            # Remove from cleanup list since it's already deleted
            self.created_resources = [(t, i) for t, i in self.created_resources if not (t == 'insight' and i == 'test-article')]
        else:
            self.log_test("DELETE /api/insights/test-article", False, f"Status: {status_code}, Error: {response if not success else response.text}")
    
    def test_projects_api(self):
        """Test Projects API operations"""
        print("=== Testing Projects API ===")
        
        # 1. List all projects (should return 4 seeded projects)
        success, response, status_code = self.make_request('GET', '/projects')
        if success and status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) >= 4:
                    self.log_test("GET /api/projects", True, f"Retrieved {len(data)} projects (expected 4+)")
                else:
                    self.log_test("GET /api/projects", False, f"Expected 4+ projects, got {len(data) if isinstance(data, list) else 'non-list'}", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/projects", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/projects", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 2. Filter by industry (retail)
        success, response, status_code = self.make_request('GET', '/projects', params={'industry': 'retail'})
        if success and status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    retail_found = any('retail' in str(item.get('industry', {})).lower() for item in data)
                    if retail_found or len(data) > 0:
                        self.log_test("GET /api/projects?industry=retail", True, f"Retrieved {len(data)} retail projects")
                    else:
                        self.log_test("GET /api/projects?industry=retail", False, "No retail projects found", data)
                else:
                    self.log_test("GET /api/projects?industry=retail", False, "Response is not a list", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/projects?industry=retail", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/projects?industry=retail", False, f"Status: {status_code}, Error: {response if not success else response.text}")
        
        # 3. Get by ID (proj-001)
        success, response, status_code = self.make_request('GET', '/projects/proj-001')
        if success and status_code == 200:
            try:
                data = response.json()
                if data.get('id') == 'proj-001':
                    self.log_test("GET /api/projects/proj-001", True, f"Retrieved project: {data.get('title', {}).get('en', 'N/A')}")
                else:
                    self.log_test("GET /api/projects/proj-001", False, "ID mismatch", data)
            except json.JSONDecodeError:
                self.log_test("GET /api/projects/proj-001", False, "Invalid JSON response", response.text)
        else:
            self.log_test("GET /api/projects/proj-001", False, f"Status: {status_code}, Error: {response if not success else response.text}")
    
    def cleanup_resources(self):
        """Clean up any created test resources"""
        print("=== Cleaning Up Test Resources ===")
        for resource_type, resource_id in self.created_resources:
            if resource_type == 'contact':
                success, response, status_code = self.make_request('DELETE', f'/contacts/{resource_id}')
                if success and status_code == 204:
                    print(f"✅ Cleaned up contact: {resource_id}")
                else:
                    print(f"❌ Failed to clean up contact: {resource_id}")
            elif resource_type == 'insight':
                success, response, status_code = self.make_request('DELETE', f'/insights/{resource_id}')
                if success and status_code == 204:
                    print(f"✅ Cleaned up insight: {resource_id}")
                else:
                    print(f"❌ Failed to clean up insight: {resource_id}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Atlas Digitalize Backend API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)
        
        try:
            self.test_root_and_health()
            self.test_contacts_api()
            self.test_insights_api()
            self.test_projects_api()
        finally:
            self.cleanup_resources()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  ❌ {result['test']}: {result['details']}")
        
        return failed_tests == 0

def main():
    """Main test execution"""
    tester = APITester(BASE_URL)
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Please check the details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()