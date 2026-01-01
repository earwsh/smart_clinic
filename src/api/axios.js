import axios from 'axios';

const api = axios.create({
    // بک‌اِند کار آدرس اصلی سرور را اینجا جایگزین می‌کند
    baseURL: 'http://localhost:5000/api/v1', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// مدیریت توکن (بسیار مهم برای ورود و امنیت)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// مدیریت خطاهای عمومی (مثلاً اگر توکن منقضی شده بود)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // هدایت به صفحه لاگین در صورت انقضای توکن
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;