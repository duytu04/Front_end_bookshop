// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from '@mui/material';


// // object orderDetailsData để mô phỏng dữ liệu chi tiết đơn hàng
// // Dữ liệu mẫu (có thể thay bằng API thực tế)
// const orderDetailsData = {
//   1: {
//     id: 1,
//     date: '2025-03-31',
//     total: 150000,
//     status: 'Completed',
//     user: { name: 'User1', email: 'user1@gmail.com' },
//     items: [
//       { productId: 1, name: 'Áo thun', quantity: 2, price: 50000 },
//       { productId: 2, name: 'Quần jeans', quantity: 1, price: 100000 },
//     ],
//   },
//   2: {
//     id: 2,
//     date: '2025-03-31',
//     total: 200000,
//     status: 'Pending',
//     user: { name: 'User2', email: 'user2@gmail.com' },
//     items: [{ productId: 2, name: 'Quần jeans', quantity: 2, price: 100000 }],
//   },
//   3: {
//     id: 2,
//     date: '2022-03-31',
//     total: 999,
//     status: 'Pending',
//     user: { name: 'Userxxxxxxxx', email: 'xxxxxxxx@gmail.com' },
//     items: [{ productId: 99, name: 'Quần jeans', quantity: 2, price: 100000 }],
//   },
// };


// // hiển thị thông tin chi tiết của một đơn hàng cụ thể dựa trên orderId từ URL
// function OrderDetails() {
//   const { orderId } = useParams();
// //   useParams: Lấy orderId từ URL để hiển thị chi tiết đơn hàng tương ứng
//   const navigate = useNavigate();
//   const order = orderDetailsData[orderId] || {};

//   if (!order.id) {
//     return (
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h6">Không tìm thấy đơn hàng</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Chi tiết đơn hàng #{order.id}
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h6">Thông tin đơn hàng</Typography>
//         <Typography>Ngày đặt: {order.date}</Typography>
//         <Typography>Trạng thái: {order.status}</Typography>
//         <Typography>Tổng tiền: {order.total.toLocaleString()} VNĐ</Typography>
//         <Typography>Khách hàng: {order.user.name} ({order.user.email})</Typography>

//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Danh sách sản phẩm
//         </Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Tên sản phẩm</TableCell>
//                 <TableCell>Số lượng</TableCell>
//                 <TableCell>Đơn giá (VNĐ)</TableCell>
//                 <TableCell>Thành tiền (VNĐ)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {order.items.map((item) => (
//                 <TableRow key={item.productId}>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.quantity}</TableCell>
//                   <TableCell>{item.price.toLocaleString()}</TableCell>
//                   <TableCell>{(item.quantity * item.price).toLocaleString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Button
//           variant="outlined"
//           sx={{ mt: 2 }}
//           onClick={() => navigate('/admin/order')}
//         >
//           Quay lại
//         </Button>
//       </Paper>
//     </Box>
//   );
// }

// export default OrderDetails;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const headers = {};

        // For Option 2: Add JWT token
        const token = localStorage.getItem('jwt');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:6868/api/orders/${orderId}`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Map backend response to frontend format
        const mappedOrder = {
          id: data.id,
          date: data.orderDate.split('T')[0],
          total: data.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          status: data.status,
          user: {
            name: data.userName,
            email: data.user?.email || ''
          },
          items: data.orderItems.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        };

        setOrder(mappedOrder);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <Box sx={{ mt: 8 }}><Typography>Loading...</Typography></Box>;
  }

  if (error || !order) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy đơn hàng: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chi tiết đơn hàng #{order.id}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Thông tin đơn hàng</Typography>
        <Typography>Ngày đặt: {order.date}</Typography>
        <Typography>Trạng thái: {order.status}</Typography>
        <Typography>Tổng tiền: {order.total.toLocaleString()} VNĐ</Typography>
        <Typography>Khách hàng: {order.user.name} ({order.user.email})</Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Danh sách sản phẩm
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá (VNĐ)</TableCell>
                <TableCell>Thành tiền (VNĐ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toLocaleString()}</TableCell>
                  <TableCell>{(item.quantity * item.price).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate('/admin/order')}
        >
          Quay lại
        </Button>
      </Paper>
    </Box>
  );
}

export default OrderDetails;