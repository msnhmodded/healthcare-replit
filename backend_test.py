#!/usr/bin/env python3
"""
Backend API Testing for Somali Health Equity Collective
Tests all API endpoints defined in the backend routes
"""

import requests
import sys
import json
from datetime import datetime

class SomaliHealthAPITester:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: Array with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response: Object with keys: {list(response_data.keys())[:5]}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection Error: Could not connect to {url}")
            return False, {}
        except requests.exceptions.Timeout:
            print(f"❌ Failed - Timeout: Request took too long")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_workshops_endpoints(self):
        """Test workshop-related endpoints"""
        print("\n" + "="*50)
        print("TESTING WORKSHOPS ENDPOINTS")
        print("="*50)
        
        # Get all workshops
        self.run_test("Get All Workshops", "GET", "api/workshops", 200)
        
        # Test creating a workshop
        workshop_data = {
            "title": {"en": "Test Workshop", "so": "Tababarka Tijaabada"},
            "description": {"en": "Test Description", "so": "Sharaxaada Tijaabada"},
            "date": "2024-03-15T10:00:00Z",
            "location": "Toronto Community Center",
            "maxAttendees": 50,
            "currentAttendees": 0,
            "facilitator": "Dr. Test",
            "category": "health",
            "isActive": True
        }
        success, workshop = self.run_test("Create Workshop", "POST", "api/workshops", 201, workshop_data)
        
        if success and isinstance(workshop, dict) and 'id' in workshop:
            workshop_id = workshop['id']
            # Test getting specific workshop
            self.run_test("Get Specific Workshop", "GET", f"api/workshops/{workshop_id}", 200)
            
            # Test workshop registration
            registration_data = {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "+1234567890",
                "preferredLanguage": "en"
            }
            self.run_test("Register for Workshop", "POST", f"api/workshops/{workshop_id}/register", 201, registration_data)

    def test_resources_endpoints(self):
        """Test resource-related endpoints"""
        print("\n" + "="*50)
        print("TESTING RESOURCES ENDPOINTS")
        print("="*50)
        
        # Get all resources
        self.run_test("Get All Resources", "GET", "api/resources", 200)
        
        # Get resources by category
        categories = ["health-guides", "nutrition", "videos", "tools", "directory", "forms"]
        for category in categories:
            self.run_test(f"Get {category} Resources", "GET", "api/resources", 200, params={"category": category})
        
        # Test creating a resource
        resource_data = {
            "title": {"en": "Test Resource", "so": "Khayraadka Tijaabada"},
            "description": {"en": "Test Description", "so": "Sharaxaada Tijaabada"},
            "type": "pdf",
            "category": "health-guides",
            "fileUrl": "/resources/test.pdf",
            "tags": ["test", "tijaabo"],
            "isActive": True
        }
        self.run_test("Create Resource", "POST", "api/resources", 201, resource_data)

    def test_contacts_endpoints(self):
        """Test contact-related endpoints"""
        print("\n" + "="*50)
        print("TESTING CONTACTS ENDPOINTS")
        print("="*50)
        
        # Test creating a contact
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "subject": "Test Subject",
            "message": "This is a test message",
            "preferredLanguage": "en"
        }
        self.run_test("Create Contact", "POST", "api/contacts", 201, contact_data)
        
        # Get all contacts
        self.run_test("Get All Contacts", "GET", "api/contacts", 200)

    def test_partners_endpoints(self):
        """Test partner-related endpoints"""
        print("\n" + "="*50)
        print("TESTING PARTNERS ENDPOINTS")
        print("="*50)
        
        # Get all partners
        self.run_test("Get All Partners", "GET", "api/partners", 200)
        
        # Test creating a partner
        partner_data = {
            "name": "Test Partner",
            "description": "Test partner description",
            "website": "https://testpartner.com",
            "logoUrl": "/images/test-partner.png",
            "category": "healthcare",
            "isActive": True
        }
        self.run_test("Create Partner", "POST", "api/partners", 201, partner_data)

    def test_team_endpoints(self):
        """Test team member endpoints"""
        print("\n" + "="*50)
        print("TESTING TEAM ENDPOINTS")
        print("="*50)
        
        # Get all team members
        self.run_test("Get All Team Members", "GET", "api/team", 200)
        
        # Test creating a team member
        team_data = {
            "name": "Test Member",
            "role": {"en": "Test Role", "so": "Doorka Tijaabada"},
            "bio": {"en": "Test bio", "so": "Taariikh nololeed tijaabo"},
            "imageUrl": "/images/test-member.jpg",
            "email": "testmember@example.com",
            "isActive": True
        }
        self.run_test("Create Team Member", "POST", "api/team", 201, team_data)

    def test_static_files(self):
        """Test static file serving (PDFs)"""
        print("\n" + "="*50)
        print("TESTING STATIC FILE SERVING")
        print("="*50)
        
        # Test PDF files
        pdf_files = [
            "resources/diabetes-guide.pdf",
            "resources/heart-health-handbook.pdf",
            "resources/mental-wellness-guide.pdf",
            "resources/healthy-recipes.pdf",
            "resources/appointment-preparation-form.pdf"
        ]
        
        for pdf_file in pdf_files:
            success, _ = self.run_test(f"Access {pdf_file}", "GET", pdf_file, 200)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Somali Health Equity Collective API Tests")
        print(f"Testing against: {self.base_url}")
        print("="*60)
        
        try:
            # Test basic connectivity
            response = requests.get(f"{self.base_url}/api/workshops", timeout=5)
            print(f"✅ Server is accessible at {self.base_url}")
        except:
            print(f"❌ Cannot connect to server at {self.base_url}")
            return 1

        # Run all test suites
        self.test_workshops_endpoints()
        self.test_resources_endpoints()
        self.test_contacts_endpoints()
        self.test_partners_endpoints()
        self.test_team_endpoints()
        self.test_static_files()

        # Print final results
        print("\n" + "="*60)
        print("📊 FINAL TEST RESULTS")
        print("="*60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the output above for details.")
            return 1

def main():
    tester = SomaliHealthAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())