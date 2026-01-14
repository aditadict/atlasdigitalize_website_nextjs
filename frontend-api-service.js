// API Service for React Frontend
// Save this as: frontend/src/services/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:9000/api";

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to create headers
const createHeaders = (includeAuth = false) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// API Service Object
const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    },

    register: async (name, email, password, password_confirmation) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    },

    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: createHeaders(true),
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      return response.ok;
    },

    me: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: createHeaders(true),
      });
      return response.json();
    },

    isAuthenticated: () => {
      return !!getAuthToken();
    },

    getUser: () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },
  },

  // Insights (Public)
  insights: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/insights`, {
        headers: createHeaders(),
      });
      return response.json();
    },

    getBySlug: async (slug) => {
      const response = await fetch(`${API_BASE_URL}/insights/${slug}`, {
        headers: createHeaders(),
      });
      return response.json();
    },

    // Admin only
    create: async (data) => {
      const response = await fetch(`${API_BASE_URL}/insights`, {
        method: "POST",
        headers: createHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_BASE_URL}/insights/${id}`, {
        method: "PUT",
        headers: createHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/insights/${id}`, {
        method: "DELETE",
        headers: createHeaders(true),
      });
      return response.ok;
    },
  },

  // Projects (Public)
  projects: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: createHeaders(),
      });
      return response.json();
    },

    getBySlug: async (slug) => {
      const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
        headers: createHeaders(),
      });
      return response.json();
    },

    // Admin only
    create: async (data) => {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: createHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: createHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: createHeaders(true),
      });
      return response.ok;
    },
  },

  // Contacts
  contacts: {
    // Public - Submit contact form
    submit: async (data) => {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    // Admin only
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        headers: createHeaders(true),
      });
      return response.json();
    },

    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        headers: createHeaders(true),
      });
      return response.json();
    },

    update: async (id, data) => {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "PUT",
        headers: createHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: createHeaders(true),
      });
      return response.ok;
    },
  },

  // Health check
  health: async () => {
    const response = await fetch(`${API_BASE_URL}/health`, {
      headers: createHeaders(),
    });
    return response.json();
  },
};

export default api;

// Example usage in React components:
/*
import api from './services/api';

// In your component:
const InsightsPage = () => {
  const [insights, setInsights] = useState([]);
  
  useEffect(() => {
    const fetchInsights = async () => {
      const data = await api.insights.getAll();
      setInsights(data);
    };
    fetchInsights();
  }, []);
  
  return (
    <div>
      {insights.map(insight => (
        <div key={insight.id}>
          <h2>{insight.title.en}</h2>
          <p>{insight.excerpt.en}</p>
        </div>
      ))}
    </div>
  );
};

// Login form example:
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.auth.login(email, password);
      console.log('Logged in:', result.user);
      // Redirect to dashboard or update app state
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

// Contact form example:
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.contacts.submit(formData);
      console.log('Contact submitted:', result);
      // Show success message
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={formData.name} 
        onChange={e => setFormData({...formData, name: e.target.value})} 
        placeholder="Name"
      />
      <input 
        type="email" 
        value={formData.email} 
        onChange={e => setFormData({...formData, email: e.target.value})} 
        placeholder="Email"
      />
      <textarea 
        value={formData.message} 
        onChange={e => setFormData({...formData, message: e.target.value})} 
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
*/
