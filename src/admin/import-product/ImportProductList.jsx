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

// // Dữ liệu mẫu
// const products = [
//   { id: 1, name: 'Sách A' },
//   { id: 2, name: 'Sách B' },
// ];

// const suppliers = [
//   { id: 1, name: 'Nhà cung cấp A' },
//   { id: 2, name: 'Nhà cung cấp B' },
// ];

// const importProducts = [
//   {
//     id: 1,
//     supplierId: 1,
//     importDate: '2025-04-01',
//     items: [
//       { productId: 1, price: 40000, quantity: 50 },
//       { productId: 2, price: 60000, quantity: 30 },
//     ],
//   },
//   {
//     id: 2,
//     supplierId: 2,
//     importDate: '2025-04-02',
//     items: [
//       { productId: 1, price: 45000, quantity: 20 },
//     ],
//   },
// ];

// function ImportProductList() {
//   const navigate = useNavigate();
//   const [expandedId, setExpandedId] = useState(null);

//   const handleEditImport = (importId) => {
//     navigate(`/admin/edit-import-product/${importId}`);
//   };

//   const handleDeleteImport = (importId) => {
//     console.log(`Xóa phiếu nhập với ID: ${importId}`);
//     // Gọi API để xóa tại đây
//   };

//   const handleAddImport = () => {
//     navigate('/admin/create-import-product');
//   };

//   const handleRowClick = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const getProductName = (productId) => {
//     const product = products.find((p) => p.id === productId);
//     return product ? product.name : 'Không xác định';
//   };

//   const getSupplierName = (supplierId) => {
//     const supplier = suppliers.find((s) => s.id === supplierId);
//     return supplier ? supplier.name : 'Không xác định';
//   };

//   const getTotalQuantity = (items) => {
//     return items.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h5">Danh sách phiếu nhập hàng</Typography>
//         <Button variant="contained" color="primary" onClick={handleAddImport}>
//           Thêm phiếu nhập
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="import product table">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID phiếu nhập</TableCell>
//               <TableCell>Ngày nhập</TableCell>
//               <TableCell>Tổng số lượng</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {importProducts.map((importProduct) => (
//               <React.Fragment key={importProduct.id}>
//                 <TableRow
//                   onClick={() => handleRowClick(importProduct.id)}
//                   sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
//                 >
//                   <TableCell>{importProduct.id}</TableCell>
//                   <TableCell>{importProduct.importDate}</TableCell>
//                   <TableCell>{getTotalQuantity(importProduct.items)}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEditImport(importProduct.id);
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
//                         e.stopPropagation();
//                         handleDeleteImport(importProduct.id);
//                       }}
//                     >
//                       Xóa
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
//                     <Collapse in={expandedId === importProduct.id} timeout="auto" unmountOnExit>
//                       <Box sx={{ margin: 1 }}>
//                         <Typography variant="subtitle1" gutterBottom>
//                           Chi tiết phiếu nhập hàng
//                         </Typography>
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>ID sản phẩm</TableCell>
//                               <TableCell>Tên sản phẩm</TableCell>
//                               <TableCell>Giá</TableCell>
//                               <TableCell>Số lượng</TableCell>
//                               <TableCell>Nhà cung cấp</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {importProduct.items.map((item, index) => (
//                               <TableRow key={index}>
//                                 <TableCell>{item.productId}</TableCell>
//                                 <TableCell>{getProductName(item.productId)}</TableCell>
//                                 <TableCell>{item.price.toLocaleString()} VNĐ</TableCell>
//                                 <TableCell>{item.quantity}</TableCell>
//                                 <TableCell>{getSupplierName(importProduct.supplierId)}</TableCell>
//                               </TableRow>
//                             ))}
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

// export default ImportProductList;





// // Import các hook và module cần thiết từ React và thư viện khác
// import React, { useState, useEffect } from 'react'; // useState và useEffect là các hook của React
// import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng người dùng giữa các trang
// import axios from 'axios'; // Dùng để gọi API từ backend

// // Import các component UI từ Material UI
// import {
//   Box, // Thành phần khối dùng để layout
//   Paper, // Tạo hiệu ứng nền giấy
//   Table, // Bảng
//   TableBody, // Phần thân của bảng
//   TableCell, // Ô trong bảng
//   TableContainer, // Container bao ngoài bảng
//   TableHead, // Phần tiêu đề bảng
//   TableRow, // Hàng trong bảng
//   Typography, // Văn bản định dạng
//   Button, // Nút bấm
//   Collapse, // Hiệu ứng ẩn/hiện chi tiết
// } from '@mui/material';

// function ImportProductList() {
//   const navigate = useNavigate(); // Hook để điều hướng sang trang khác
//   const [importProducts, setImportProducts] = useState([]); // State lưu danh sách phiếu nhập hàng
//   const [expandedId, setExpandedId] = useState(null); // State theo dõi hàng đang được mở rộng

//   // Gọi API để lấy danh sách phiếu nhập khi component được mount
//   useEffect(() => {
//     fetchImportProducts();
//   }, []);

//   // Hàm gọi API lấy danh sách phiếu nhập
//   const fetchImportProducts = () => {
//     axios.get('/api/import-products') // Gọi GET API
//       .then(res => setImportProducts(res.data)) // Nếu thành công, lưu dữ liệu vào state
//       .catch(err => console.error('Lỗi khi lấy danh sách phiếu nhập:', err)); // Nếu lỗi, log lỗi ra console
//   };

//   // Điều hướng sang trang sửa phiếu nhập
//   const handleEditImport = (importId) => {
//     navigate(`/admin/import-product/EditImportProduct/${importId}`); // Chuyển hướng theo ID
//   };

//   // Gọi API để xóa phiếu nhập và load lại danh sách
//   const handleDeleteImport = (importId) => {
//     axios.delete(`/api/import-products/${importId}`) // Gọi DELETE API
//       .then(() => fetchImportProducts()) // Tải lại danh sách nếu xóa thành công
//       .catch(err => console.error('Lỗi khi xóa phiếu nhập:', err)); // Log lỗi nếu có
//   };

//   // Điều hướng sang trang tạo mới phiếu nhập
//   const handleAddImport = () => {
//     navigate('/admin/import-product/CreateImportProduct');
//   };

//   // Hàm mở rộng hoặc thu gọn dòng bảng được click
//   const handleRowClick = (id) => {
//     setExpandedId(expandedId === id ? null : id); // Toggle mở/đóng dòng chi tiết
//   };

//   return (
//     <Box sx={{ mt: 8 }}> {/* Tạo khoảng cách phía trên */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}> {/* Layout tiêu đề và nút thêm */}
//         <Typography variant="h5">Danh sách phiếu nhập hàng</Typography> {/* Tiêu đề */}
//         <Button variant="contained" color="primary" onClick={handleAddImport}> {/* Nút thêm phiếu nhập */}
//           Thêm phiếu nhập
//         </Button>
//       </Box>

//       <TableContainer component={Paper}> {/* Bảng nằm trong khung Paper */}
//         <Table sx={{ minWidth: 650 }} aria-label="import product table">
//           <TableHead> {/* Phần đầu bảng */}
//             <TableRow>
//               <TableCell>ID phiếu nhập</TableCell>
//               <TableCell>Ngày nhập</TableCell>
//               <TableCell>Nhà cung cấp</TableCell>
//               <TableCell>Số lượng</TableCell>
//               <TableCell>Giá nhập</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody> {/* Phần thân bảng */}
//             {importProducts.map((importProduct) => ( // Lặp qua danh sách phiếu nhập
//               <React.Fragment key={importProduct.id}> {/* Gói 2 dòng: 1 dòng chính + 1 dòng chi tiết */}
//                 <TableRow
//                   onClick={() => handleRowClick(importProduct.id)} // Khi click thì mở chi tiết
//                   sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
//                 >
//                   <TableCell>{importProduct.id}</TableCell>
//                   <TableCell>{importProduct.importDate}</TableCell>
//                   <TableCell>{importProduct.supplier?.name || 'Không xác định'}</TableCell>
//                   <TableCell>{importProduct.quantity}</TableCell>
//                   <TableCell>{importProduct.price?.toLocaleString()} VNĐ</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Ngăn sự kiện lan sang dòng tableRow
//                         handleEditImport(importProduct.id); // Sửa
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
//                         e.stopPropagation(); // Ngăn mở chi tiết khi click nút
//                         handleDeleteImport(importProduct.id); // Xóa
//                       }}
//                     >
//                       Xóa
//                     </Button>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow>
//                   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}> {/* Gộp cột chi tiết */}
//                     <Collapse in={expandedId === importProduct.id} timeout="auto" unmountOnExit> {/* Mở rộng chi tiết */}
//                       <Box sx={{ margin: 1 }}>
//                         <Typography variant="subtitle1" gutterBottom>
//                           Chi tiết phiếu nhập hàng
//                         </Typography>
//                         <Typography>ID: {importProduct.id}</Typography>
//                         <Typography>Ngày nhập: {importProduct.importDate}</Typography>
//                         <Typography>Nhà cung cấp: {importProduct.supplier?.name}</Typography>
//                         <Typography>Số lượng: {importProduct.quantity}</Typography>
//                         <Typography>Giá nhập: {importProduct.price?.toLocaleString()} VNĐ</Typography>
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

// export default ImportProductList; // Export component để sử dụng ở nơi khác


// src/pages/ImportProductList.jsx
import React, { useState, useEffect } from 'react'; // useState và useEffect là các hook của React
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng người dùng giữa các trang
import axios from 'axios'; // Dùng để gọi API từ backend

// Import các component UI từ Material UI
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
} from '@mui/material';

function ImportProductList() {
  const navigate = useNavigate(); // Hook để điều hướng sang trang khác
  const [importProducts, setImportProducts] = useState([]); // State lưu danh sách phiếu nhập hàng
  const [expandedId, setExpandedId] = useState(null); // State theo dõi hàng đang được mở rộng

  // Hàm lấy dữ liệu phiếu nhập hàng từ API khi component được mount
  useEffect(() => {
    fetchImportProducts();
  }, []);

  // Gọi API lấy danh sách phiếu nhập
  const fetchImportProducts = () => {
    axios
      .get('/api/import-products')
      .then((res) => setImportProducts(res.data))
      .catch((err) => console.error('Lỗi khi lấy danh sách phiếu nhập:', err));
  };

  // Điều hướng sang trang sửa phiếu nhập
  const handleEditImport = (importId) => {
    navigate(`/admin/edit-import-product/${importId}`);
  };

  // Gọi API để xóa phiếu nhập và cập nhật lại danh sách
  const handleDeleteImport = (importId) => {
    axios
      .delete(`/api/import-products/${importId}`)
      .then(() => fetchImportProducts())
      .catch((err) => console.error('Lỗi khi xóa phiếu nhập:', err));
  };

  // Điều hướng sang trang tạo mới phiếu nhập
  const handleAddImport = () => {
    navigate('/admin/create-import-product');
  };

  // Mở hoặc đóng phần chi tiết phiếu nhập
  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Hàm định dạng ngày hiển thị
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Box sx={{ mt: 8 }}>
      {/* Thanh tiêu đề và nút Thêm phiếu nhập */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách phiếu nhập hàng</Typography>
        <Button variant="contained" color="primary" onClick={handleAddImport}>
          Thêm phiếu nhập
        </Button>
      </Box>

      {/* Bảng danh sách phiếu nhập */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="import product table">
          <TableHead>
            <TableRow>
              <TableCell>ID phiếu nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {importProducts.map((importProduct) => (
              <React.Fragment key={importProduct.id}>
                {/* Dòng chính */}
                <TableRow
                  onClick={() => handleRowClick(importProduct.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{importProduct.id}</TableCell>
                  <TableCell>{formatDate(importProduct.importDate)}</TableCell>
                  <TableCell>{importProduct.supplier?.name || 'Không xác định'}</TableCell>
                  <TableCell>{importProduct.quantity}</TableCell>
                  <TableCell>{importProduct.price?.toLocaleString()} VNĐ</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditImport(importProduct.id);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImport(importProduct.id);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Dòng chi tiết */}
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedId === importProduct.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Chi tiết phiếu nhập hàng
                        </Typography>
                        <Typography>ID: {importProduct.id}</Typography>
                        <Typography>Ngày nhập: {formatDate(importProduct.importDate)}</Typography>
                        <Typography>Nhà cung cấp: {importProduct.supplier?.name || 'Không xác định'}</Typography>
                        <Typography>Số lượng: {importProduct.quantity}</Typography>
                        <Typography>Giá nhập: {importProduct.price?.toLocaleString()} VNĐ</Typography>
                        <Typography>
                          Tổng tiền:{' '}
                          {(importProduct.price * importProduct.quantity)?.toLocaleString()} VNĐ
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ImportProductList;
