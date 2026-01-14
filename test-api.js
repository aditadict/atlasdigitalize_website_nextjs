// API Base URL
const API_BASE_URL = "http://127.0.0.1:9000/api";

// Test API Endpoints
async function testAPI() {
  console.log("🚀 Testing API Endpoints...\n");

  // 1. Test Health Endpoint
  console.log("1️⃣ Testing Health Endpoint:");
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`, {
      headers: {
        Accept: "application/json",
      },
    });
    const healthData = await healthResponse.json();
    console.log("✅ Health:", healthData);
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
  }

  // 2. Test Login
  console.log("\n2️⃣ Testing Login:");
  let authToken = null;
  try {
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@atlasdigitalize.com",
        password: "password",
      }),
    });
    const loginData = await loginResponse.json();
    authToken = loginData.token;
    console.log("✅ Login successful:", {
      user: loginData.user.name,
      email: loginData.user.email,
      token: authToken.substring(0, 20) + "...",
    });
  } catch (error) {
    console.error("❌ Login failed:", error.message);
  }

  // 3. Test Public Insights
  console.log("\n3️⃣ Testing Public Insights:");
  try {
    const insightsResponse = await fetch(`${API_BASE_URL}/insights`, {
      headers: {
        Accept: "application/json",
      },
    });
    const insightsData = await insightsResponse.json();
    console.log(`✅ Insights: Found ${insightsData.length} articles`);
    console.log("   First insight:", insightsData[0]?.title?.en || "N/A");
  } catch (error) {
    console.error("❌ Insights fetch failed:", error.message);
  }

  // 4. Test Public Projects
  console.log("\n4️⃣ Testing Public Projects:");
  try {
    const projectsResponse = await fetch(`${API_BASE_URL}/projects`, {
      headers: {
        Accept: "application/json",
      },
    });
    const projectsData = await projectsResponse.json();
    console.log(`✅ Projects: Found ${projectsData.length} projects`);
    console.log("   First project:", projectsData[0]?.title?.en || "N/A");
  } catch (error) {
    console.error("❌ Projects fetch failed:", error.message);
  }

  // 5. Test Protected Endpoint (Get User)
  if (authToken) {
    console.log("\n5️⃣ Testing Protected Endpoint (/auth/me):");
    try {
      const meResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const meData = await meResponse.json();
      console.log("✅ Authenticated user:", meData.user);
    } catch (error) {
      console.error("❌ Auth/me failed:", error.message);
    }

    // 6. Test Protected Endpoint (Get all Contacts - Admin)
    console.log("\n6️⃣ Testing Protected Endpoint (/contacts - Admin):");
    try {
      const contactsResponse = await fetch(`${API_BASE_URL}/contacts`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const contactsData = await contactsResponse.json();
      console.log(`✅ Contacts: Found ${contactsData.length} contacts`);
    } catch (error) {
      console.error("❌ Contacts fetch failed:", error.message);
    }
  }

  console.log("\n✨ API Test Complete!\n");
  console.log(
    "📚 API Documentation available at: http://127.0.0.1:9000/docs/api"
  );
  console.log(
    "🎨 Filament Admin Panel available at: http://127.0.0.1:9000/admin"
  );
}

// Run tests
testAPI();
