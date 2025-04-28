// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Button,
//   TablePagination,
// } from '@mui/material';

// // Dữ liệu mẫu
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
//   {
//     id: 3,
//     name: 'User 3',
//     email: 'user3@gmail.com',
//     phoneNumber: '0903456789',
//     address: '789 Đường C, Đà Nẵng',
//     birthDay: '1988-03-15',
//     gender: 'Male',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['Moderator'],
//   },
//   {
//     id: 4,
//     name: 'User 4',
//     email: 'user4@gmail.com',
//     phoneNumber: '0902345678',
//     address: '101 Đường D, Cần Thơ',
//     birthDay: '1992-07-20',
//     gender: 'Female',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['User'],
//   },
//   {
//     id: 5,
//     name: 'User 5',
//     email: 'user5@gmail.com',
//     phoneNumber: '0908765432',
//     address: '202 Đường E, Hải Phòng',
//     birthDay: '1997-11-11',
//     gender: 'Male',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['Admin', 'User'],
//   },
//   {
//     id: 6,
//     name: 'User 6',
//     email: 'user6@gmail.com',
//     phoneNumber: '0907654321',
//     address: '303 Đường F, TP.HCM',
//     birthDay: '1985-09-09',
//     gender: 'Female',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['User'],
//   },
//   {
//     id: 7,
//     name: 'User 7',
//     email: 'user7@gmail.com',
//     phoneNumber: '0906543210',
//     address: '404 Đường G, Hà Nội',
//     birthDay: '1993-12-25',
//     gender: 'Male',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['Moderator'],
//   },
//   {
//     id: 8,
//     name: 'User 8',
//     email: 'user8@gmail.com',
//     phoneNumber: '0905432109',
//     address: '505 Đường H, Đà Nẵng',
//     birthDay: '1998-04-30',
//     gender: 'Female',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['User'],
//   },
//   {
//     id: 9,
//     name: 'User 9',
//     email: 'user9@gmail.com',
//     phoneNumber: '0904321098',
//     address: '606 Đường I, Cần Thơ',
//     birthDay: '1991-06-18',
//     gender: 'Male',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['Admin'],
//   },
//   {
//     id: 10,
//     name: 'User 10',
//     email: 'user10@gmail.com',
//     phoneNumber: '0903210987',
//     address: '707 Đường J, Hải Phòng',
//     birthDay: '2000-02-14',
//     gender: 'Female',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['User', 'Moderator'],
//   },
// ];

// function UserList() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(6);

//   const handleEditUser = (userId) => {
//     navigate(`/admin/edit-user/${userId}`);
//   };

//   const handleDeleteUser = (userId) => {
//     console.log(`Xóa user với ID: ${userId}`);
//     // Gọi API để xóa user tại đây
//   };

//   const handleAddUser = () => {
//     navigate('/admin/create-user');
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 3,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 'bold',
//             color: '#1a2820',
//             letterSpacing: '0.5px',
//           }}
//         >
//           DANH SÁCH NGƯỜI DÙNG
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddUser}
//           sx={{
//             borderRadius: '20px',
//             textTransform: 'none',
//             fontWeight: 'medium',
//             px: 3,
//             py: 1,
//             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//             '&:hover': {
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//               bgcolor: 'primary.dark',
//             },
//           }}
//         >
//           Thêm người dùng
//         </Button>
//       </Box>
//       <TableContainer
//         component={Paper}
//         sx={{
//           borderRadius: '12px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//           overflow: 'hidden',
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="user table">
//           <TableHead>
//             <TableRow
//               sx={{
//                 backgroundColor: 'grey.100',
//                 '& th': {
//                   fontWeight: 'bold',
//                   color: 'text.primary',
//                   py: 2,
//                   borderBottom: '2px solid',
//                   borderColor: 'grey.300',
//                 },
//               }}
//             >
//               <TableCell>ID</TableCell>
//               <TableCell>Tên</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Số điện thoại</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.length > 0 ? (
//               users
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((user) => (
//                   <TableRow
//                     key={user.id}
//                     sx={{
//                       '&:hover': {
//                         backgroundColor: 'grey.50',
//                         transition: 'background-color 0.2s',
//                       },
//                       '& td': {
//                         py: 1.5,
//                         borderBottom: '1px solid',
//                         borderColor: 'grey.200',
//                       },
//                     }}
//                   >
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.phoneNumber}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', gap: 1 }}>
//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           size="small"
//                           onClick={() => handleEditUser(user.id)}
//                           sx={{
//                             borderRadius: '20px',
//                             textTransform: 'none',
//                             fontWeight: 'medium',
//                             px: 2,
//                             py: 0.5,
//                             borderColor: 'secondary.main',
//                             color: 'secondary.main',
//                             '&:hover': {
//                               borderColor: 'secondary.dark',
//                               bgcolor: 'grey.50',
//                             },
//                           }}
//                         >
//                           Sửa
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           color="error"
//                           size="small"
//                           onClick={() => handleDeleteUser(user.id)}
//                           sx={{
//                             borderRadius: '20px',
//                             textTransform: 'none',
//                             fontWeight: 'medium',
//                             px: 2,
//                             py: 0.5,
//                             borderColor: 'error.main',
//                             color: 'error.main',
//                             '&:hover': {
//                               borderColor: 'error.dark',
//                               bgcolor: 'grey.50',
//                             },
//                           }}
//                         >
//                           Xóa
//                         </Button>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={5}
//                   align="center"
//                   sx={{
//                     py: 2,
//                     color: 'text.secondary',
//                     fontWeight: 'medium',
//                   }}
//                 >
//                   Không có người dùng nào
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[6, 12, 24]}
//         component="div"
//         count={users.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         labelRowsPerPage="Số hàng mỗi trang:"
//         labelDisplayedRows={({ from, to, count }) => `${from}–${to} của ${count}`}
//         sx={{
//           mt: 2,
//           '& .MuiTablePagination-toolbar': {
//             backgroundColor: 'grey.50',
//             borderRadius: '8px',
//             py: 1,
//           },
//           '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//             color: 'text.secondary',
//             fontWeight: 'medium',
//           },
//           '& .MuiTablePagination-actions button': {
//             borderRadius: '8px',
//             '&:hover': {
//               bgcolor: 'grey.200',
//             },
//           },
//         }}
//       />
//     </Box>
//   );
// }

// export default UserList;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TablePagination,
} from '@mui/material';

function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for your backend API (replace with your actual backend URL)
  const API_URL = 'http://localhost:6868/api/user';

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách người dùng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Edit User
  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        alert('Xóa người dùng thành công');
      } catch (err) {
        alert('Không thể xóa người dùng');
      }
    }
  };

  // Handle Add User
  const handleAddUser = () => {
    navigate('/admin/create-user');
  };

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1a2820',
            letterSpacing: '0.5px',
          }}
        >
          DANH SÁCH NGƯỜI DÙNG
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
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
          Thêm người dùng
        </Button>
      </Box>

      {loading ? (
        <Typography align="center">Đang tải...</Typography>
      ) : error ? (
        <Typography align="center" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: 'grey.100',
                    '& th': {
                      fontWeight: 'bold',
                      color: 'text.primary',
                      py: 2,
                      borderBottom: '2px solid',
                      borderColor: 'grey.300',
                    },
                  }}
                >
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'grey.50',
                            transition: 'background-color 0.2s',
                          },
                          '& td': {
                            py: 1.5,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200',
                          },
                        }}
                      >
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              onClick={() => handleEditUser(user.id)}
                              sx={{
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontWeight: 'medium',
                                px: 2,
                                py: 0.5,
                                borderColor: 'secondary.main',
                                color: 'secondary.main',
                                '&:hover': {
                                  borderColor: 'secondary.dark',
                                  bgcolor: 'grey.50',
                                },
                              }}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDeleteUser(user.id)}
                              sx={{
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontWeight: 'medium',
                                px: 2,
                                py: 0.5,
                                borderColor: 'error.main',
                                color: 'error.main',
                                '&:hover': {
                                  borderColor: 'error.dark',
                                  bgcolor: 'grey.50',
                                },
                              }}
                            >
                              Xóa
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{
                        py: 2,
                        color: 'text.secondary',
                        fontWeight: 'medium',
                      }}
                    >
                      Không có người dùng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6, 12, 24]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} của ${count}`
            }
            sx={{
              mt: 2,
              '& .MuiTablePagination-toolbar': {
                backgroundColor: 'grey.50',
                borderRadius: '8px',
                py: 1,
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: 'text.secondary',
                fontWeight: 'medium',
              },
              '& .MuiTablePagination-actions button': {
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: 'grey.200',
                },
              },
            }}
          />
        </>
      )}
    </Box>
  );
}

export default UserList;