import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Front-end only mode bypass: Return dummy data for all API requests
api.interceptors.request.use(
  (config) => {
    config.adapter = async (config) => {
      const response = {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        request: {}
      };

      if (config.url.includes('/users/profile') || config.url.includes('/auth/login')) {
        response.data = { token: 'dummy', user: { _id: '1', name: 'Demo User', email: 'demo@example.com', skillsToTeach: ['React'], skillsToLearn: ['Node.js'] } };
      } else if (config.url.includes('/matches')) {
        response.data = [
          { user: { _id: '2', name: 'Alice Smith', bio: 'Full-stack developer' }, score: '85%', matchedSkills: { theyOffer: ['Node.js', 'Python'], theyWant: ['React'] } },
          { user: { _id: '3', name: 'Bob Jones', bio: 'UX Designer turned coder' }, score: '70%', matchedSkills: { theyOffer: ['UI/UX Design'], theyWant: ['React', 'CSS'] } }
        ];
      } else if (config.url.includes('/swaps/incoming')) {
        response.data = [
          { _id: 's1', status: 'pending', fromUser: { name: 'Alice Smith', email: 'alice@example.com' }, message: 'Hi! Let\'s swap React for Node?', createdAt: new Date().toISOString() }
        ];
      } else if (config.url.includes('/swaps/outgoing')) {
        response.data = [
          { _id: 's2', status: 'accepted', toUser: { name: 'Bob Jones', email: 'bob@example.com' }, message: 'Would love to learn UI/UX!', createdAt: new Date().toISOString() }
        ];
      }

      return response;
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;