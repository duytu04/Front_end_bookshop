// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Grid,
// } from '@mui/material';

// // Dữ liệu mẫu (đồng bộ với UserList.js)
// const users = [
//   {
//     id: 1,
//     name: 'User 1',
//     email: 'user1@gmail.com',
//     phoneNumber: '0901234567',
//     address: '123 Đường A, TP.HCM',
//     birthDay: '1990-01-01',
//     gender: 'Male',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['Admin'],
//   },
//   {
//     id: 2,
//     name: 'User 2',
//     email: 'user2@gmail.com',
//     phoneNumber: '0909876543',
//     address: '456 Đường B, Hà Nội',
//     birthDay: '1995-05-05',
//     gender: 'Female',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['User'],
//   },
// ];

// // Danh sách vai trò có thể chọn
// const roleOptions = ['Admin', 'User', 'Moderator'];

// function EditUser() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const initialUser = users.find((u) => u.id === parseInt(userId)) || {};

//   // State cho thông tin người dùng
//   const [user, setUser] = useState({
//     name: initialUser.name || '',
//     email: initialUser.email || '',
//     phoneNumber: initialUser.phoneNumber || '',
//     address: initialUser.address || '',
//     birthDay: initialUser.birthDay || '',
//     gender: initialUser.gender || '',
//     avata: initialUser.avata || '',
//     roles: initialUser.roles || [],
//   });
//   const [error, setError] = useState('');

//   // Xử lý thay đổi input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//     setError('');
//   };

//   // Xử lý thay đổi roles
//   const handleRolesChange = (e) => {
//     setUser((prev) => ({ ...prev, roles: e.target.value }));
//     setError('');
//   };

//   // Kiểm tra dữ liệu hợp lệ
//   const isValid = () => {
//     return (
//       user.name.trim() !== '' &&
//       user.email.trim() !== '' &&
//       user.phoneNumber.trim() !== '' &&
//       user.address.trim() !== '' &&
//       user.birthDay !== '' &&
//       user.gender !== '' &&
//       user.roles.length > 0
//     );
//   };

//   // Xử lý submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValid()) {
//       setError('Vui lòng điền đầy đủ thông tin');
//       return;
//     }

//     const userData = {
//       id: parseInt(userId),
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       birthDay: user.birthDay,
//       gender: user.gender,
//       avata: user.avata || 'https://via.placeholder.com/40',
//       roles: user.roles,
//     };
//     console.log('Cập nhật user:', userData);
//     navigate('/admin/user');
//   };

//   if (!initialUser.id) {
//     return (
//       <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
//         <Typography
//           variant="h6"
//           sx={{
//             color: 'text.secondary',
//             fontWeight: 'medium',
//           }}
//         >
//           Không tìm thấy người dùng
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{
//           fontWeight: 'bold',
//           color: '#1a2820',
//           letterSpacing: '0.5px',
//         }}
//       >
//         CHỈNH SỬA NGƯỜI DÙNG #{userId}
//       </Typography>
//       <Paper
//         sx={{
//           p: 3,
//           borderRadius: '12px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//         }}
//       >
//         <Box component="form" onSubmit={handleSubmit}>
//           {/* Hiển thị lỗi nếu có */}
//           {error && (
//             <Alert
//               severity="error"
//               sx={{
//                 mb: 2,
//                 borderRadius: '8px',
//               }}
//             >
//               {error}
//             </Alert>
//           )}

//           <Grid container spacing={2}>
//             {/* Cột trái */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Tên"
//                 name="name"
//                 value={user.name}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'primary.main',
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={user.email}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'primary.main',
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Số điện thoại"
//                 name="phoneNumber"
//                 value={user.phoneNumber}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'primary.main',
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Ngày sinh"
//                 name="birthDay"
//                 type="date"
//                 value={user.birthDay}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//                 required
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'primary.main',
//                   },
//                 }}
//               />
//             </Grid>
//             {/* Cột phải */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Địa chỉ"
//                 name="address"
//                 value={user.address}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'primary.main',
//                   },
//                 }}
//               />
//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: 2,
//                 }}
//                 required
//               >
//                 <InputLabel
//                   sx={{
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                     '&.Mui-focused': {
//                       color: 'primary.main',
//                     },
//                   }}
//                 >
//                   Giới tính
//                 </InputLabel>
//                 <Select
//                   name="gender"
//                   value={user.gender}
//                   onChange={handleChange}
//                   sx={{
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   }}
//                 >
//                   <MenuItem value="Male">Nam</MenuItem>
//                   <MenuItem value="Female">Nữ</MenuItem>
//                   <MenuItem value="Other">Khác</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 fullWidth
//                 label="URL Avatar"
//                 name="avata"
//                 value={user.avata}
//                 onChange={handleChange}
//                 sx={{
//                   mb: 2,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: 'primary.main',
//                   },
//                 }}
//               />
//               <FormControl
//                 fullWidth
//                 sx={{
//                   mb: 2,
//                 }}
//                 required
//               >
//                 <InputLabel
//                   sx={{
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                     '&.Mui-focused': {
//                       color: 'primary.main',
//                     },
//                   }}
//                 >
//                   Vai trò
//                 </InputLabel>
//                 <Select
//                   multiple
//                   name="roles"
//                   value={user.roles}
//                   onChange={handleRolesChange}
//                   sx={{
//                     borderRadius: '12px',
//                     backgroundColor: 'background.paper',
//                     '&:hover .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'primary.main',
//                     },
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'primary.main',
//                       boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
//                     },
//                   }}
//                 >
//                   {roleOptions.map((role) => (
//                     <MenuItem key={role} value={role}>
//                       {role}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           {/* Nút submit */}
//           <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{
//                 borderRadius: '20px',
//                 textTransform: 'none',
//                 fontWeight: 'medium',
//                 px: 3,
//                 py: 1,
//                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//                 '&:hover': {
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//                   bgcolor: 'primary.dark',
//                 },
//               }}
//             >
//               Lưu
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/admin/user')}
//               sx={{
//                 borderRadius: '20px',
//                 textTransform: 'none',
//                 fontWeight: 'medium',
//                 px: 3,
//                 py: 1,
//                 borderColor: 'grey.400',
//                 color: 'text.primary',
//                 '&:hover': {
//                   borderColor: 'primary.main',
//                   bgcolor: 'grey.50',
//                 },
//               }}
//             >
//               Hủy
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default EditUser;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Snackbar,
} from '@mui/material';

// Danh sách vai trò có thể chọn
const roleOptions = ['Admin', 'User', 'Moderator'];

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // State cho thông tin người dùng
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDay: '',
    gender: true, // Default to true (Nam)
    avata: '',
    roles: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Base URL for your backend API
  const API_URL = `http://localhost:6868/api/user/${userId}`;

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({
          name: response.data.name || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          address: response.data.address || '',
          birthDay: response.data.birthDay || '',
          gender: response.data.gender !== undefined ? response.data.gender : true,
          avata: response.data.avata || '',
          roles: response.data.roles || [],
        });
      } catch (err) {
        setFetchError(
          err.response?.data?.message || 'Không thể tải thông tin người dùng.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === 'gender' ? value === 'true' : value,
    }));
    setError('');
  };

  // Xử lý thay đổi roles
  const handleRolesChange = (e) => {
    setUser((prev) => ({ ...prev, roles: e.target.value }));
    setError('');
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(user.email)) {
      setError('Email không hợp lệ');
      return false;
    }
    if (!/^\d{10}$/.test(user.phoneNumber)) {
      setError('Số điện thoại phải có 10 chữ số');
      return false;
    }
    return (
      user.name.trim() !== '' &&
      user.email.trim() !== '' &&
      user.phoneNumber.trim() !== '' &&
      user.address.trim() !== '' &&
      user.birthDay !== '' &&
      user.roles.length > 0
    );
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    const userData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      birthDay: user.birthDay,
      gender: user.gender, // Boolean: true (Nam), false (Nữ)
      avata: user.avata || 'https://via.placeholder.com/40',
      roles: user.roles,
    };

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(API_URL, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Cập nhật người dùng thành công');
      navigate('/admin/user');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Không thể cập nhật người dùng. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchError) {
    return (
      <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
          }}
        >
          {fetchError}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1a2820',
          letterSpacing: '0.5px',
        }}
      >
        CHỈNH SỬA NGƯỜI DÙNG #{userId}
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: '8px',
              }}
            >
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            {/* Cột trái */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                disabled={loading}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
                disabled={loading}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                required
                disabled={loading}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Ngày sinh"
                name="birthDay"
                type="date"
                value={user.birthDay}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                disabled={loading}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Grid>
            {/* Cột phải */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
                disabled={loading}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                required
                disabled={loading}
              >
                <InputLabel
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Giới tính
                </InputLabel>
                <Select
                  name="gender"
                  value={user.gender.toString()} // Convert boolean to string for Select
                  onChange={handleChange}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  }}
                >
                  <MenuItem value="true">Nam</MenuItem>
                  <MenuItem value="false">Nữ</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="URL Avatar"
                name="avata"
                value={user.avata}
                onChange={handleChange}
                disabled={loading}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    fontWeight: 'medium',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                required
                disabled={loading}
              >
                <InputLabel
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Vai trò
                </InputLabel>
                <Select
                  multiple
                  name="roles"
                  value={user.roles}
                  onChange={handleRolesChange}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: 'background.paper',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                    },
                  }}
                >
                  {roleOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Nút submit */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3,
                py: 1,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {loading ? 'Đang xử lý...' : 'Lưu'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/user')}
              disabled={loading}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3,
                py: 1,
                borderColor: 'grey.400',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'grey.50',
                },
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        message={success}
      />
    </Box>
  );
}

export default EditUser;