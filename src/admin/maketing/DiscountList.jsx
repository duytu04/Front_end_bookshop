// // TODO
// // API: Fetch dữ liệu từ /api/discounts thay vì dùng dữ liệu mẫu.
// // Xác nhận xóa: Thêm dialog xác nhận trước khi xóa bằng Dialog của MUI.
// // Phân trang: Nếu danh sách dài, thêm TablePagination để phân trang.
// // Tùy chỉnh giao diện: Thêm màu nền khác cho dòng đang mở rộng hoặc thêm icon mở/đóng.

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
//   Collapse,
// } from '@mui/material';

// // Dữ liệu mẫu cho Product
// const products = [
//   { id: 1, name: 'Áo thun', stock: 100, originalPrice: 50000 },
//   { id: 2, name: 'Quần jeans', stock: 50, originalPrice: 120000 },
//   { id: 3, name: 'Giày thể thao', stock: 20, originalPrice: 200000 },
// ];

// // Dữ liệu mẫu cho Discount
// const discounts = [
//   {
//     id: 1,
//     dateStart: '2025-03-10',
//     dateEnd: '2025-03-20',
//     products: [
//       { productId: 1, salePrice: 20000, quantity: 10 },
//       { productId: 2, salePrice: 50000, quantity: 5 },
//     ],
//   },
//   {
//     id: 2,
//     dateStart: '2025-03-15',
//     dateEnd: '2025-03-25',
//     products: [
//       { productId: 3, salePrice: 150000, quantity: 8 },
//     ],
//   },
// ];

// function DiscountList() {
//   const navigate = useNavigate();
//   const [expandedId, setExpandedId] = useState(null); // State để theo dõi dòng đang mở rộng

//   const handleEditDiscount = (discountId) => {
//     navigate(`/admin/edit-discount/${discountId}`);
//   };

//   const handleDeleteDiscount = (discountId) => {
//     console.log(`Xóa discount với ID: ${discountId}`);
//     // Gọi API để xóa discount tại đây
//   };

//   const handleAddDiscount = () => {
//     navigate('/admin/add-discount');
//   };

//   const handleRowClick = (id) => {
//     setExpandedId(expandedId === id ? null : id); // Mở rộng hoặc thu gọn khi nhấp
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h5">Danh sách mã giảm giá</Typography>
//         <Button variant="contained" color="primary" onClick={handleAddDiscount}>
//           Thêm mã giảm giá
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="discount table">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID mã giảm giá</TableCell>
//               <TableCell>Ngày bắt đầu</TableCell>
//               <TableCell>Ngày kết thúc</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {discounts.map((discount) => (
//               <React.Fragment key={discount.id}>
//                 <TableRow
//                   onClick={() => handleRowClick(discount.id)}
//                   sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
//                 >
//                   <TableCell>{discount.id}</TableCell>
//                   <TableCell>{discount.dateStart}</TableCell>
//                   <TableCell>{discount.dateEnd}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Ngăn sự kiện click row
//                         handleEditDiscount(discount.id);
//                       }}
//                       sx={{ mr: 1 }}
//                     >
//                       Sửa
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Ngăn sự kiện click row
//                         handleDeleteDiscount(discount.id);
//                       }}
//                     >
//                       Xóa
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
//                     <Collapse in={expandedId === discount.id} timeout="auto" unmountOnExit>
//                       <Box sx={{ margin: 1 }}>
//                         <Typography variant="subtitle1" gutterBottom>
//                           Chi tiết sản phẩm
//                         </Typography>
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>ID sản phẩm</TableCell>
//                               <TableCell>Tên sản phẩm</TableCell>
//                               <TableCell>Tồn kho</TableCell>
//                               <TableCell>Giá gốc (VNĐ)</TableCell>
//                               <TableCell>Giá khuyến mại (VNĐ)</TableCell>
//                               <TableCell>Số lượng</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {discount.products.map((item) => {
//                               const product = products.find((p) => p.id === item.productId);
//                               return (
//                                 <TableRow key={item.productId}>
//                                   <TableCell>{item.productId}</TableCell>
//                                   <TableCell>{product ? product.name : 'Không xác định'}</TableCell>
//                                   <TableCell>{product ? product.stock : '-'}</TableCell>
//                                   <TableCell>
//                                     {product ? product.originalPrice.toLocaleString() : '-'}
//                                   </TableCell>
//                                   <TableCell>{item.salePrice.toLocaleString()}</TableCell>
//                                   <TableCell>{item.quantity}</TableCell>
//                                 </TableRow>
//                               );
//                             })}
//                           </TableBody>
//                         </Table>
//                       </Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default DiscountList;

import React, { useEffect, useState } from 'react';
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
  Collapse,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function DiscountList() {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:6868/api/discounts')
      .then((res) =>
        setDiscounts(res.data))
      .catch((err) => console.error('Lỗi khi tải discounts:', err));

    axios.get('http://localhost:6868/api/product')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Lỗi khi tải products:', err));
  }, []);
  

  const handleEditDiscount = (id) => {
    navigate(`/admin/edit-discounts/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/discount/${id}`)
      .then(() => {
        setDiscounts(discounts.filter((d) => d.id !== id));
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error('Lỗi khi xóa:', err));
  };

  const handleAddDiscount = () => {
    navigate('/admin/add-discount');
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách mã giảm giá</Typography>
        <Button variant="contained" color="primary" onClick={handleAddDiscount}>
          Thêm mã giảm giá
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>ID mã</TableCell>
              <TableCell sx={{ color: 'white' }}>Ngày bắt đầu</TableCell>
              <TableCell sx={{ color: 'white' }}>Ngày kết thúc</TableCell>
              <TableCell sx={{ color: 'white' }}>Chi tiết</TableCell>
              <TableCell sx={{ color: 'white' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((discount) => (
                <React.Fragment key={discount.id}>
                  <TableRow
                    sx={{
                      backgroundColor: expandedId === discount.id ? '#e3f2fd' : 'transparent',
                    }}
                  >
                    <TableCell>{discount.id}</TableCell>
                    <TableCell>{discount.dateStart}</TableCell>
                    <TableCell>{discount.dateEnd}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRowClick(discount.id)}>
                        {expandedId === discount.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditDiscount(discount.id)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => setConfirmDeleteId(discount.id)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={expandedId === discount.id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Chi tiết sản phẩm
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Tồn kho</TableCell>
                                <TableCell>Giá gốc</TableCell>
                                <TableCell>Giá khuyến mãi</TableCell>
                                <TableCell>Số lượng</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {/* {discount.products.map((item) => { */}
                              {/* Trong JSX, để tránh .map() trên giá trị undefined, bạn cần thêm điều kiện kiểm tra trước khi .map(): */}
                            {Array.isArray(discount.products) && discount.products.map((item) => {
                                const product = products.find((p) => p.id === item.productId);
                                return (
                                  <TableRow key={item.productId}>
                                    <TableCell>{item.productId}</TableCell>
                                    <TableCell>{product?.name || 'Không xác định'}</TableCell>
                                    <TableCell>{product?.stock || '-'}</TableCell>
                                    <TableCell>
                                      {product
                                        ? product.originalPrice.toLocaleString()
                                        : '-'}
                                    </TableCell>
                                    <TableCell>{item.salePrice.toLocaleString()}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={discounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Hủy</Button>
          <Button
            onClick={() => handleDelete(confirmDeleteId)}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DiscountList;
