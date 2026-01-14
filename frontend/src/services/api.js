import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== ABOUT API ====================

export const getAbout = async () => {
  try {
    const response = await apiClient.get("/about");
    return response.data;
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw error;
  }
};

// ==================== SOLUTIONS API ====================

export const getSolutions = async () => {
  try {
    const response = await apiClient.get("/solutions");
    return response.data;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    throw error;
  }
};

export const getSolutionBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/solutions/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching solution:", error);
    throw error;
  }
};

// ==================== CONTACTS API ====================

export const submitContact = async (formData) => {
  try {
    const response = await apiClient.post("/contacts", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    throw error;
  }
};

export const getContacts = async (status = null, limit = 50, skip = 0) => {
  try {
    const params = { limit, skip };
    if (status) params.status = status;
    const response = await apiClient.get("/contacts", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// ==================== CLIENTS API ====================

export const getClients = async () => {
  try {
    const response = await apiClient.get("/clients");
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await apiClient.get(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

// ==================== INSIGHTS API ====================

export const getInsights = async (
  category = null,
  published = true,
  limit = 20,
  skip = 0
) => {
  try {
    const params = { limit, skip };
    if (category && category !== "all") params.category = category;
    if (published !== null) params.published = published;
    const response = await apiClient.get("/insights", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching insights:", error);
    throw error;
  }
};

export const getInsightBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/insights/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching insight:", error);
    throw error;
  }
};

export const getRelatedInsights = async (slug) => {
  try {
    const response = await apiClient.get(`/insights/${slug}/related`);
    return response.data;
  } catch (error) {
    console.error("Error fetching related insights:", error);
    throw error;
  }
};

export const getInsightFilters = async () => {
  try {
    const response = await apiClient.get("/insights/filters");
    return response.data;
  } catch (error) {
    console.error("Error fetching insight filters:", error);
    throw error;
  }
};

// ==================== PROJECTS API ====================

export const getProjects = async (
  industry = null,
  systemType = null,
  featured = null,
  limit = 20,
  skip = 0
) => {
  try {
    const params = { limit, skip };
    if (industry && industry !== "all") params.industry = industry;
    if (systemType && systemType !== "all") params.system_type = systemType;
    if (featured !== null) params.featured = featured;
    const response = await apiClient.get("/projects", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const getProjectFilters = async () => {
  try {
    const response = await apiClient.get("/projects/filters");
    return response.data;
  } catch (error) {
    console.error("Error fetching project filters:", error);
    throw error;
  }
};

// ==================== HEALTH CHECK ====================

export const healthCheck = async () => {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (error) {
    console.error("API health check failed:", error);
    throw error;
  }
};

export default apiClient;
