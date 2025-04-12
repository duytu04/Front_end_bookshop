
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
// } from '@mui/material';
// import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP

// function AddSupplier() {
//   const navigate = useNavigate();
//   const [supplier, setSupplier] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     email: '',
//   });
//   const [error, setError] = useState(null); // Thêm trạng thái để xử lý lỗi
//   const [loading, setLoading] = useState(false); // Thêm trạng thái để hiển thị đang tải

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Bật trạng thái đang tải
//     setError(null); // Xóa lỗi cũ

//     try {
//       // Gửi yêu cầu POST tới API backend
//       const response = await axios.post('http://localhost:6868/api/supplier', supplier);
//       console.log('Nhà cung cấp đã được thêm:', response.data);
//       navigate('/admin/supplier'); // Quay lại danh sách nếu thành công
//     } catch (err) {
//       // Xử lý lỗi từ backend
//       setError('Có lỗi khi thêm nhà cung cấp. Vui lòng thử lại.');
//       console.error('Lỗi:', err);
//     } finally {
//       setLoading(false); // Tắt trạng thái tải
//     }
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Thêm nhà cung cấp mới
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
//           {/* Hiển thị thông báo lỗi nếu có */}
//           {error && (
//             <Typography color="error" sx={{ mt: 2 }}>
//               {error}
//             </Typography>
//           )}
//           <Box sx={{ mt: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ mr: 2 }}
//               disabled={loading} // Vô hiệu hóa nút khi đang tải
//             >
//               {loading ? 'Đang thêm...' : 'Thêm'} {/* Thay đổi văn bản nút */}
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/admin/supplier')}
//               disabled={loading} // Vô hiệu hóa nút Hủy khi đang tải
//             >
//               Hủy
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default AddSupplier;




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Paper, Typography, TextField, Button } from '@mui/material';
// import axios from 'axios';

// function AddSupplier() {
//   const navigate = useNavigate();
//   const [supplier, setSupplier] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     email: '',
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fieldErrors, setFieldErrors] = useState({}); // Thêm trạng thái lỗi cho từng trường

//   const validateForm = () => {
//     const errors = {};
//     if (!supplier.name.trim()) errors.name = 'Tên không được để trống';
//     if (!supplier.address.trim()) errors.address = 'Địa chỉ không được để trống';
//     if (!/^\+?[0-9]{10,15}$/.test(supplier.phoneNumber)) {
//       errors.phoneNumber = 'Số điện thoại không hợp lệ';
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplier.email)) {
//       errors.email = 'Email không hợp lệ';
//     }
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({ ...prev, [name]: value }));
//     // Xóa lỗi của trường khi người dùng nhập lại
//     setFieldErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return; // Không gửi nếu form không hợp lệ

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:6868/api/supplier', supplier);
//       console.log('Nhà cung cấp đã được thêm:', response.data);
//       navigate('/admin/supplier');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.message || 'Có lỗi khi thêm nhà cung cấp.');
//       } else {
//         setError('Không thể kết nối đến server.');
//       }
//       console.error('Lỗi:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Thêm nhà cung cấp mới
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
//             error={!!fieldErrors.name}
//             helperText={fieldErrors.name}
//           />
//           <TextField
//             fullWidth
//             label="Địa chỉ"
//             name="address"
//             value={supplier.address}
//             onChange={handleChange}
//             margin="normal"
//             required
//             error={!!fieldErrors.address}
//             helperText={fieldErrors.address}
//           />
//           <TextField
//             fullWidth
//             label="Số điện thoại"
//             name="phoneNumber"
//             value={supplier.phoneNumber}
//             onChange={handleChange}
//             margin="normal"
//             required
//             error={!!fieldErrors.phoneNumber}
//             helperText={fieldErrors.phoneNumber}
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
//             error={!!fieldErrors.email}
//             helperText={fieldErrors.email}
//           />
//           {error && (
//             <Typography color="error" sx={{ mt: 2 }}>
//               {error}
//             </Typography>
//           )}
//           <Box sx={{ mt: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ mr: 2 }}
//               disabled={loading}
//             >
//               {loading ? 'Đang thêm...' : 'Thêm'}
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/admin/supplier')}
//               disabled={loading}
//             >
//               Hủy
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default AddSupplier;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';

function AddSupplier() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

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
      await axios.post('http://localhost:6868/api/supplier', supplier);
      alert('Thêm nhà cung cấp thành công.');
      navigate('/admin/supplier');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Có lỗi khi thêm nhà cung cấp.');
      } else {
        setError('Không thể kết nối đến server.');
      }
      console.error('Lỗi:', err);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm nhà cung cấp mới
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
              {loading ? 'Đang thêm...' : 'Thêm'}
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

export default AddSupplier;