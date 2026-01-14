import axios from "axios";

const API = `${
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"
}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface LocalizedString {
  en: string;
  id: string;
}

export interface AboutData {
  headline: LocalizedString;
  subheadline: LocalizedString;
  story: LocalizedString;
  years_experience: number;
  systems_delivered: number;
  industries_served: number;
}

export interface Solution {
  id: number;
  slug: string;
  key?: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
}

// SEO data from backend
export interface SEOData {
  title: string | null;
  description: string | null;
  author: string | null;
  robots: string | null;
  image: string | null;
  type: string;
  published_time: string | null;
  modified_time: string | null;
  section: string | null;
}

export interface Insight {
  id: number;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content?: LocalizedString;
  category: LocalizedString | string;
  featured_image: string | null;
  read_time: string;
  formatted_date_en: string;
  formatted_date_id: string;
  published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  seo?: SEOData;
}

export interface Project {
  id: number;
  title: LocalizedString;
  industry: LocalizedString;
  system_type: LocalizedString;
  scope: LocalizedString;
  outcome: LocalizedString;
  featured: boolean;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  language?: string;
}

// ==================== ABOUT API ====================

export const getAbout = async (): Promise<AboutData> => {
  const response = await apiClient.get("/about");
  return response.data;
};

// ==================== SOLUTIONS API ====================

export const getSolutions = async (): Promise<Solution[]> => {
  const response = await apiClient.get("/solutions");
  return response.data;
};

export const getSolutionBySlug = async (slug: string): Promise<Solution> => {
  const response = await apiClient.get(`/solutions/${slug}`);
  return response.data;
};

// ==================== CONTACTS API ====================

export const submitContact = async (
  formData: ContactFormData
): Promise<{ success: boolean }> => {
  const response = await apiClient.post("/contacts", formData);
  return response.data;
};

// ==================== CLIENTS API ====================

export const getClients = async (): Promise<Client[]> => {
  const response = await apiClient.get("/clients");
  return response.data;
};

export const getClientById = async (clientId: number): Promise<Client> => {
  const response = await apiClient.get(`/clients/${clientId}`);
  return response.data;
};

// ==================== INSIGHTS API ====================

export const getInsights = async (
  category: string | null = null,
  published: boolean = true,
  limit: number = 20,
  skip: number = 0
): Promise<Insight[]> => {
  const params: Record<string, unknown> = { limit, skip };
  if (category && category !== "all") params.category = category;
  if (published !== null) params.published = published;
  const response = await apiClient.get("/insights", { params });
  return response.data;
};

export const getInsightBySlug = async (slug: string): Promise<Insight> => {
  const response = await apiClient.get(`/insights/${slug}`);
  return response.data;
};

export const getRelatedInsights = async (slug: string): Promise<Insight[]> => {
  const response = await apiClient.get(`/insights/${slug}/related`);
  return response.data;
};

export const getInsightFilters = async (): Promise<LocalizedString[]> => {
  const response = await apiClient.get("/insights/filters");
  return response.data;
};

// ==================== PROJECTS API ====================

export const getProjects = async (
  industry: string | null = null,
  systemType: string | null = null,
  featured: boolean | null = null,
  limit: number = 20,
  skip: number = 0
): Promise<Project[]> => {
  const params: Record<string, unknown> = { limit, skip };
  if (industry && industry !== "all") params.industry = industry;
  if (systemType && systemType !== "all") params.system_type = systemType;
  if (featured !== null) params.featured = featured;
  const response = await apiClient.get("/projects", { params });
  return response.data;
};

export const getProjectById = async (projectId: number): Promise<Project> => {
  const response = await apiClient.get(`/projects/${projectId}`);
  return response.data;
};

export const getProjectFilters = async (): Promise<{
  industries: LocalizedString[];
  system_types: LocalizedString[];
}> => {
  const response = await apiClient.get("/projects/filters");
  return response.data;
};

// ==================== HEALTH CHECK ====================

export const healthCheck = async (): Promise<{ status: string }> => {
  const response = await apiClient.get("/health");
  return response.data;
};

export default apiClient;
