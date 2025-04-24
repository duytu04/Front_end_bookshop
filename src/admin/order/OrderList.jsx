
// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
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
// } from '@mui/material';

// // Dữ liệu mẫu (thay bằng API thực tế)
// const orders = [
//   { id: 1, userId: 1, date: '2025-03-31', total: 150000, status: 'Completed' },
//   { id: 2, userId: 1, date: '2025-03-31', total: 200000, status: 'Pending' },
//   { id: 3, userId: 1, date: '2025-03-30', total: 300000, status: 'Shipped' },
// ];

// function OrderList() {
//   const { userId } = useParams(); // Lấy userId từ URL nếu có
//   const navigate = useNavigate();

//   const handleViewDetails = (orderId) => {
//     navigate(`/admin/order/${orderId}`);
//   };
//   //   Điều hướng: Khi nhấp vào "Xem chi tiết",
// // useNavigate sẽ chuyển hướng đến trang chi tiết đơn hàng với URL /admin/order/:orderId.

//   // Lọc đơn hàng theo userId nếu có, nếu không thì hiển thị tất cả
//   const filteredOrders = userId
//     ? orders.filter((order) => order.userId === parseInt(userId))
//     : orders;

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         {userId ? `Đơn hàng của người dùng #${userId}` : 'Danh sách đơn hàng'}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="order table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Mã đơn hàng</TableCell>
//               <TableCell>Ngày đặt</TableCell>
//               <TableCell>Tổng tiền (VNĐ)</TableCell>
//               <TableCell>Trạng thái</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell>{order.id}</TableCell>
//                   <TableCell>{order.date}</TableCell>
//                   <TableCell>{order.total.toLocaleString()}</TableCell>
//                   <TableCell>{order.status}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       onClick={() => handleViewDetails(order.id)}
//                     >
//                       Xem chi tiết
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   Không có đơn hàng nào
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default OrderList;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
} from '@mui/material';

function OrderList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const url = userId
          ? `http://localhost:6868/api/orders/user/${userId}`
          : `http://localhost:6868/api/orders`;
        const headers = {};

        // For Option 2: Add JWT token
        const token = localStorage.getItem('jwt');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Map backend response to frontend format
        const mappedOrders = data.map(order => ({
          id: order.id,
          userId: order.user?.id || parseInt(userId) || 0,
          date: order.orderDate.split('T')[0], // Convert ISO date to YYYY-MM-DD
          total: order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          status: order.status
        }));

        setOrders(mappedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleViewDetails = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        {userId ? `Đơn hàng của người dùng #${userId}` : 'Danh sách đơn hàng'}
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Tổng tiền (VNĐ)</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total.toLocaleString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderList;