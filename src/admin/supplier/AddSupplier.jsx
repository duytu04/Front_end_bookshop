// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
// } from '@mui/material';

// function AddSupplier() {
//   const navigate = useNavigate();
//   const [supplier, setSupplier] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Gọi API để thêm supplier tại đây
//     console.log('Thêm supplier:', supplier);
//     navigate('/admin/supplier'); // Quay lại danh sách sau khi thêm
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
//           <Box sx={{ mt: 2 }}>
//             <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
//               Thêm
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
import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP

function AddSupplier() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [error, setError] = useState(null); // Thêm trạng thái để xử lý lỗi
  const [loading, setLoading] = useState(false); // Thêm trạng thái để hiển thị đang tải

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bật trạng thái đang tải
    setError(null); // Xóa lỗi cũ

    try {
      // Gửi yêu cầu POST tới API backend
      const response = await axios.post('http://localhost:6868/api/supplier', supplier);
      console.log('Nhà cung cấp đã được thêm:', response.data);
      navigate('/admin/supplier'); // Quay lại danh sách nếu thành công
    } catch (err) {
      // Xử lý lỗi từ backend
      setError('Có lỗi khi thêm nhà cung cấp. Vui lòng thử lại.');
      console.error('Lỗi:', err);
    } finally {
      setLoading(false); // Tắt trạng thái tải
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
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={supplier.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
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
          />
          {/* Hiển thị thông báo lỗi nếu có */}
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
              disabled={loading} // Vô hiệu hóa nút khi đang tải
            >
              {loading ? 'Đang thêm...' : 'Thêm'} {/* Thay đổi văn bản nút */}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/supplier')}
              disabled={loading} // Vô hiệu hóa nút Hủy khi đang tải
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