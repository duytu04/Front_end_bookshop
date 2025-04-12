// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
// } from '@mui/material';

// // Dữ liệu mẫu (thay bằng API thực tế)
// const supplierData = {
//   1: { id: 1, name: 'Supplier A', address: '123 Đường A, TP.HCM', phoneNumber: '0901234567', email: 'supa@gmail.com' },
//   2: { id: 2, name: 'Supplier B', address: '456 Đường B, Hà Nội', phoneNumber: '0909876543', email: 'supb@gmail.com' },
// };

// function EditSupplier() {
//   const { supplierId } = useParams();
//   const navigate = useNavigate();
//   const initialSupplier = supplierData[supplierId] || {};

//   const [supplier, setSupplier] = useState({
//     name: initialSupplier.name || '',
//     address: initialSupplier.address || '',
//     phoneNumber: initialSupplier.phoneNumber || '',
//     email: initialSupplier.email || '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Gọi API để cập nhật supplier tại đây
//     console.log('Cập nhật supplier:', supplier);
//     navigate('/admin/supplier'); // Quay lại danh sách sau khi sửa
//   };

//   if (!initialSupplier.id) {
//     return (
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h6">Không tìm thấy nhà cung cấp</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Chỉnh sửa nhà cung cấp #{supplierId}
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Tên"
//             name="name"
//             value={supplier.name}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Địa chỉ"
//             name="address"
//             value={supplier.address}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Số điện thoại"
//             name="phoneNumber"
//             value={supplier.phoneNumber}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={supplier.email}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <Box sx={{ mt: 2 }}>
//             <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
//               Lưu
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/admin/supplier')}
//             >
//               Hủy
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default EditSupplier;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://localhost:6868/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function EditSupplier() {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Lấy thông tin nhà cung cấp
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/api/supplier/${supplierId}`);
        setSupplier(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin nhà cung cấp.');
        setLoading(false);
        console.error('Lỗi:', err);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const validateForm = () => {
    const errors = {};
    if (!supplier.name.trim()) errors.name = 'Tên không được để trống';
    if (!supplier.address.trim()) errors.address = 'Địa chỉ không được để trống';
    if (!/^\+?[0-9]{10,15}$/.test(supplier.phoneNumber)) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplier.email)) {
      errors.email = 'Email không hợp lệ';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await axios.put(`http://localhost:6868/api/supplier/${supplierId}`, supplier);
      alert('Cập nhật nhà cung cấp thành công.');
      navigate('/admin/supplier');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Không thể cập nhật nhà cung cấp.');
      } else {
        setError('Không thể kết nối đến server.');
      }
      console.error('Lỗi:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !supplier.id) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/admin/supplier')}
          sx={{ mt: 2 }}
        >
          Quay lại
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa nhà cung cấp #{supplierId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tên"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.address}
            helperText={fieldErrors.address}
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={supplier.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.phoneNumber}
            helperText={fieldErrors.phoneNumber}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={supplier.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/supplier')}
              disabled={loading}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditSupplier;