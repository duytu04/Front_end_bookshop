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




import React, { useEffect, useState } from 'react'; // Import React cùng với các hook useEffect và useState để quản lý trạng thái và side effects
import { useNavigate } from 'react-router-dom'; // Import hook useNavigate để điều hướng giữa các trang trong ứng dụng React Router
import axios from 'axios'; // Import thư viện axios để thực hiện các yêu cầu HTTP (GET, DELETE, v.v.)
import {
  Box, // Thành phần bố cục cơ bản của Material-UI
  Paper, // Thành phần tạo bề mặt giống như giấy
  Table, // Thành phần bảng chính
  TableBody, // Phần thân của bảng
  TableCell, // Ô trong bảng
  TableContainer, // Container bao quanh bảng
  TableHead, // Phần đầu của bảng
  TableRow, // Dòng trong bảng
  Typography, // Thành phần văn bản với kiểu chữ
  Button, // Nút bấm
  Collapse, // Thành phần để hiển thị/ẩn nội dung một cách mượt mà
  IconButton, // Nút dạng biểu tượng
  Dialog, // Thành phần hộp thoại
  DialogActions, // Khu vực chứa các nút hành động trong hộp thoại
  DialogContent, // Nội dung chính của hộp thoại
  DialogContentText, // Văn bản trong nội dung hộp thoại
  DialogTitle, // Tiêu đề của hộp thoại
  TablePagination, // Thành phần phân trang cho bảng
} from '@mui/material'; // Import các thành phần giao diện từ Material-UI
import { ExpandLess, ExpandMore } from '@mui/icons-material'; // Import biểu tượng mở rộng/thu gọn từ Material-UI

function DiscountList() { // Định nghĩa component DiscountList
  const navigate = useNavigate(); // Khởi tạo hook useNavigate để điều hướng
  const [discounts, setDiscounts] = useState([]); // State để lưu danh sách mã giảm giá, khởi tạo là mảng rỗng
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm, khởi tạo là mảng rỗng
  const [expandedId, setExpandedId] = useState(null); // State để theo dõi ID của dòng đang được mở rộng, khởi tạo là null
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // State để lưu ID của mã giảm giá cần xác nhận xóa, khởi tạo là null
  const [page, setPage] = useState(0); // State để theo dõi trang hiện tại trong phân trang, khởi tạo là 0
  const [rowsPerPage, setRowsPerPage] = useState(5); // State để theo dõi số dòng mỗi trang, khởi tạo là 5

 


  useEffect(() => {
    axios.get('http://localhost:6868/api/discounts')
      .then((res) => {
        const transformedDiscounts = res.data.map(d => ({
          ...d,
          products: [{ productId: d.product.id, salePrice: d.salePrice, quantity: d.quantity }]
        }));
        setDiscounts(transformedDiscounts);
      })
      .catch((err) => console.error('Lỗi khi tải discounts:', err));

    axios.get('http://localhost:6868/api/products')
      .then((res) => 
        setProducts(res.data))
      .catch((err) => console.error('Lỗi khi tải products:', err));
  }, []);







  const handleEditDiscount = (id) => { // Hàm xử lý khi nhấn nút "Sửa" mã giảm giá
    navigate(`/admin/edit-discount/${id}`); // Điều hướng đến trang chỉnh sửa với ID tương ứng
  };

  const handleDelete = (id) => { // Hàm xử lý khi xác nhận xóa mã giảm giá
    axios.delete(`http://localhost:6868/api/discounts/${id}`) // Gửi yêu cầu DELETE đến API để xóa mã giảm giá với ID tương ứng
      .then(() => { // Nếu thành công
        setDiscounts(discounts.filter((d) => d.id !== id)); // Lọc bỏ mã giảm giá vừa xóa khỏi state discounts
        setConfirmDeleteId(null); // Đóng hộp thoại xác nhận bằng cách đặt lại confirmDeleteId về null
      })
      .catch((err) => console.error('Lỗi khi xóa:', err)); // Nếu lỗi, in thông báo lỗi ra console
  };

  const handleAddDiscount = () => { // Hàm xử lý khi nhấn nút "Thêm mã giảm giá"
    navigate('/admin/add-discount'); // Điều hướng đến trang thêm mã giảm giá
  };

  const handleRowClick = (id) => { // Hàm xử lý khi nhấp vào nút mở rộng/thu gọn chi tiết
    setExpandedId(expandedId === id ? null : id); // Nếu dòng đã mở, đóng lại (null), nếu chưa mở, mở ra (set ID)
  };


  const handleChangePage = (event, newPage) => setPage(newPage); // Hàm xử lý khi thay đổi trang trong phân trang
  const handleChangeRowsPerPage = (event) => { // Hàm xử lý khi thay đổi số dòng mỗi trang
    setRowsPerPage(+event.target.value); // Cập nhật số dòng mỗi trang (chuyển sang số bằng toán tử +)
    setPage(0); // Đặt lại trang về 0 khi thay đổi số dòng mỗi trang
  };

  return ( 
    <Box sx={{ mt: 8 }}> {/* Container chính với margin-top 8 đơn vị */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}> {/* Header với tiêu đề và nút thêm */}
        <Typography variant="h5">Danh sách mã giảm giá</Typography> {/* Tiêu đề "Danh sách mã giảm giá" */}
        <Button variant="contained" color="primary" onClick={handleAddDiscount}> {/* Nút "Thêm mã giảm giá" */}
          Thêm mã giảm giá
        </Button>
      </Box>

      <TableContainer component={Paper}> {/* Container bảng với giao diện giống giấy */}
        <Table> {/* Bảng chính */}
          <TableHead> {/* Phần đầu bảng */}
            <TableRow sx={{ backgroundColor: '#1976d2' }}> {/* Dòng tiêu đề với màu nền xanh */}
              <TableCell sx={{ color: 'white' }}>ID mã</TableCell> {/* Cột ID */}
              <TableCell sx={{ color: 'white' }}>Ngày bắt đầu</TableCell> {/* Cột ngày bắt đầu */}
              <TableCell sx={{ color: 'white' }}>Ngày kết thúc</TableCell> {/* Cột ngày kết thúc */}
              <TableCell sx={{ color: 'white' }}>Chi tiết</TableCell> {/* Cột chi tiết */}
              <TableCell sx={{ color: 'white' }}>Hành động</TableCell> {/* Cột hành động */}
            </TableRow>
          </TableHead>
          <TableBody> {/* Phần thân bảng */}
            {discounts // Lặp qua danh sách mã giảm giá
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Cắt dữ liệu theo phân trang
              .map((discount) => ( // Ánh xạ mỗi mã giảm giá thành một dòng trong bảng
                <React.Fragment key={discount.id}> {/* Fragment để nhóm các dòng liên quan đến một discount */}
                  <TableRow
                    sx={{
                      backgroundColor: expandedId === discount.id ? '#e3f2fd' : 'transparent', // Đổi màu nền nếu dòng được mở rộng
                    }}
                  >
                    <TableCell>{discount.id}</TableCell> {/* Hiển thị ID mã giảm giá */}
                    <TableCell>{discount.dateStart}</TableCell> {/* Hiển thị ngày bắt đầu */}
                    <TableCell>{discount.dateEnd}</TableCell> {/* Hiển thị ngày kết thúc */}
                    <TableCell>
                      <IconButton onClick={() => handleRowClick(discount.id)}> {/* Nút mở rộng/thu gọn */}
                        {expandedId === discount.id ? <ExpandLess /> : <ExpandMore />} {/* Hiển thị biểu tượng tương ứng */}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditDiscount(discount.id)} // Nút "Sửa"
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => setConfirmDeleteId(discount.id)} // Nút "Xóa" mở hộp thoại xác nhận
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow> {/* Dòng chứa chi tiết mở rộng */}
                    <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}> {/* Ô trải dài 5 cột */}
                      <Collapse in={expandedId === discount.id} timeout="auto" unmountOnExit> {/* Hiển thị/ẩn chi tiết */}
                        <Box sx={{ margin: 2 }}> {/* Container cho phần chi tiết */}
                          <Typography variant="subtitle1" gutterBottom>
                            Chi tiết sản phẩm
                          </Typography> {/* Tiêu đề phần chi tiết */}
                          <Table size="small"> {/* Bảng con chứa chi tiết sản phẩm */}
                            <TableHead>
                              <TableRow>
                                <TableCell>ID</TableCell> {/* Cột ID sản phẩm */}
                                <TableCell>Tên sản phẩm</TableCell> {/* Cột tên sản phẩm */}
                                <TableCell>Tồn kho</TableCell> {/* Cột tồn kho */}
                                <TableCell>Giá gốc</TableCell> {/* Cột giá gốc */}
                                <TableCell>Giá khuyến mãi</TableCell> {/* Cột giá khuyến mãi */}
                                <TableCell>Số lượng</TableCell> {/* Cột số lượng */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {discount.product ? (() => {
                                const item = {
                                  productId: discount.product.id,
                                  name: discount.product.name,
                                  stockquantity: discount.product.quantity,
                                  salePrice: discount.salePrice,
                                  quantity: discount.quantity
                                };
                                const product = products.find((p) => p.id === item.productId);
                                return (
                                  <TableRow key={item.productId}>
                                    <TableCell>{item.productId}</TableCell>
                                    <TableCell>{product?.name || 'Không xác định'}</TableCell>
                                    <TableCell>{product?.quantity || '-'}</TableCell>
                                    <TableCell>{product?.price != null ? product.price.toLocaleString() : '-'}</TableCell>
                                    <TableCell>{item.salePrice.toLocaleString()}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                  </TableRow>
                                );
                              })() : (
                                <TableRow>
                                  <TableCell colSpan={6}>Không có sản phẩm khuyến mãi</TableCell>
                                </TableRow>
                              )}
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
        <TablePagination // Thành phần phân trang
          rowsPerPageOptions={[5, 10, 25]} // Các tùy chọn số dòng mỗi trang
          component="div" // Sử dụng div thay vì thẻ mặc định
          count={discounts.length} // Tổng số mã giảm giá
          rowsPerPage={rowsPerPage} // Số dòng mỗi trang hiện tại
          page={page} // Trang hiện tại
          onPageChange={handleChangePage} // Xử lý khi đổi trang
          onRowsPerPageChange={handleChangeRowsPerPage} // Xử lý khi đổi số dòng mỗi trang
        />
      </TableContainer>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={confirmDeleteId !== null} // Hiển thị hộp thoại khi confirmDeleteId không phải null
        onClose={() => setConfirmDeleteId(null)} // Đóng hộp thoại khi nhấp nút hủy
      >
        <DialogTitle>Xác nhận xóa</DialogTitle> {/* Tiêu đề hộp thoại */}
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác.
          </DialogContentText> {/* Nội dung cảnh báo */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Hủy</Button> {/* Nút hủy */}
          <Button
            onClick={() => handleDelete(confirmDeleteId)} // Xác nhận xóa
            color="error"
            variant="contained"
          >
            Xóa
          </Button> {/* Nút xóa */}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DiscountList; // Xuất component để sử dụng ở nơi khác