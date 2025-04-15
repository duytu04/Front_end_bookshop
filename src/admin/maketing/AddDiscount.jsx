// // TODO
// // Kiểm tra giá khuyến mại: Thêm logic để salePrice không vượt quá originalPrice.
// // API: Fetch danh sách sản phẩm từ /api/products và gửi dữ liệu qua POST.


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Alert,
// } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';

// // Dữ liệu mẫu cho Product (thêm originalPrice)
// const products = [
//   { id: 1, name: 'Áo thun', stock: 100, originalPrice: 50000 },
//   { id: 2, name: 'Quần jeans', stock: 50, originalPrice: 120000 },
//   { id: 3, name: 'Giày thể thao', stock: 20, originalPrice: 200000 },
// ];

// function AddDiscount() {
//   const navigate = useNavigate();

//   // State cho ngày bắt đầu và kết thúc
//   const [dateStart, setDateStart] = useState('');
//   const [dateEnd, setDateEnd] = useState('');
//   const [error, setError] = useState(''); // State cho thông báo lỗi

//   // State cho danh sách sản phẩm đã chọn
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   // Xử lý thay đổi ngày
//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'dateStart') setDateStart(value);
//     if (name === 'dateEnd') setDateEnd(value);
//     setError(''); // Xóa lỗi khi thay đổi ngày
//   };

//   // Xử lý khi chọn sản phẩm từ Autocomplete
//   const handleProductChange = (event, newValue) => {
//     if (newValue && !selectedProducts.some((p) => p.id === newValue.id)) {
//       setSelectedProducts((prev) => [
//         ...prev,
//         { ...newValue, salePrice: '', quantity: '' },
//       ]);
//     }
//   };

//   // Xử lý thay đổi giá và số lượng cho từng sản phẩm
//   const handleProductDetailChange = (id, field, value) => {
//     setSelectedProducts((prev) =>
//       prev.map((product) => {
//         if (product.id === id) {
//           if (field === 'quantity') {
//             const quantity = parseInt(value) || 0;
//             if (quantity > product.stock) {
//               return { ...product, quantity: product.stock }; // Giới hạn quantity bằng stock
//             }
//           }
//           return { ...product, [field]: value };
//         }
//         return product;
//       })
//     );
//   };

//   // Xử lý xóa sản phẩm khỏi danh sách
//   const handleRemoveProduct = (id) => {
//     setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
//   };

//   // Kiểm tra ngày hợp lệ
//   const isDateValid = () => {
//     if (!dateStart || !dateEnd) return false;
//     const start = new Date(dateStart);
//     const end = new Date(dateEnd);
//     const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
//     return diffInDays >= 1;
//   };

//   // Kiểm tra dữ liệu sản phẩm hợp lệ
//   const isProductsValid = () => {
//     return selectedProducts.every(
//       (p) => p.salePrice !== '' && p.quantity !== '' && parseInt(p.quantity) > 0
//     );
//   };

//   // Xử lý submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isDateValid()) {
//       setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
//       return;
//     }

//     if (!isProductsValid()) {
//       setError('Vui lòng điền đầy đủ giá và số lượng khuyến mại cho tất cả sản phẩm');
//       return;
//     }

//     const discountData = {
//       dateStart,
//       dateEnd,
//       products: selectedProducts.map(({ id, salePrice, quantity }) => ({
//         productId: id,
//         salePrice: parseFloat(salePrice) || 0,
//         quantity: parseInt(quantity) || 0,
//       })),
//     };
//     console.log('Thêm discount:', discountData);
//     navigate('/admin/discount');
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Thêm chương trình khuyến mại mới
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           {/* Khu vực chọn ngày */}
//           <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//             <TextField
//               label="Ngày bắt đầu"
//               name="dateStart"
//               type="date"
//               value={dateStart}
//               onChange={handleDateChange}
//               InputLabelProps={{ shrink: true }}
//               required
//               fullWidth
//             />
//             <TextField
//               label="Ngày kết thúc"
//               name="dateEnd"
//               type="date"
//               value={dateEnd}
//               onChange={handleDateChange}
//               InputLabelProps={{ shrink: true }}
//               required
//               fullWidth
//             />
//           </Box>

//           {/* Hiển thị lỗi nếu có */}
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {/* Ô chọn sản phẩm */}
//           <Autocomplete
//             options={products.filter(
//               (p) => !selectedProducts.some((sp) => sp.id === p.id)
//             )}
//             getOptionLabel={(option) => `${option.id} - ${option.name}`}
//             filterOptions={(options, { inputValue }) => {
//               const input = inputValue.toLowerCase();
//               return options.filter(
//                 (option) =>
//                   option.name.toLowerCase().includes(input) ||
//                   option.id.toString().includes(input)
//               );
//             }}
//             renderOption={(props, option) => (
//               <li {...props}>
//                 {option.id} - {option.name} (Tồn kho: {option.stock}, Giá gốc: {option.originalPrice.toLocaleString()} VNĐ)
//               </li>
//             )}
//             onChange={handleProductChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Thêm sản phẩm"
//                 placeholder="Gõ ID hoặc tên sản phẩm"
//                 margin="normal"
//               />
//             )}
//             fullWidth
//           />

//           {/* Bảng sản phẩm đã chọn */}
//           {selectedProducts.length > 0 && (
//             <TableContainer sx={{ mt: 2 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Tên sản phẩm</TableCell>
//                     <TableCell>Tồn kho</TableCell>
//                     <TableCell>Giá gốc (VNĐ)</TableCell>
//                     <TableCell>Giá khuyến mại (VNĐ)</TableCell>
//                     <TableCell>Số lượng khuyến mại</TableCell>
//                     <TableCell>Hành động</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {selectedProducts.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell>{product.id}</TableCell>
//                       <TableCell>{product.name}</TableCell>
//                       <TableCell>{product.stock}</TableCell>
//                       <TableCell>{product.originalPrice.toLocaleString()}</TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={product.salePrice}
//                           onChange={(e) =>
//                             handleProductDetailChange(product.id, 'salePrice', e.target.value)
//                           }
//                           size="small"
//                           required
//                           inputProps={{ min: 0 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={product.quantity}
//                           onChange={(e) =>
//                             handleProductDetailChange(product.id, 'quantity', e.target.value)
//                           }
//                           size="small"
//                           required
//                           inputProps={{ min: 0, max: product.stock }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           size="small"
//                           onClick={() => handleRemoveProduct(product.id)}
//                         >
//                           Xóa
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* Nút submit */}
//           <Box sx={{ mt: 3 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ mr: 2 }}
//               disabled={selectedProducts.length === 0}
//             >
//               Thêm
//             </Button>
//             <Button variant="outlined" onClick={() => navigate('/admin/discount')}>
//               Hủy
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default AddDiscount;
// Import các thư viện cần thiết









// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Alert,
// } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';

// function AddDiscount() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [dateStart, setDateStart] = useState('');
//   const [dateEnd, setDateEnd] = useState('');
//   const [error, setError] = useState('');
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:6868/api/product')
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.error('Lỗi khi tải sản phẩm:', err);
//         setError('Không thể tải danh sách sản phẩm từ máy chủ');
//       });
//   }, []);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'dateStart') setDateStart(value);
//     if (name === 'dateEnd') setDateEnd(value);
//     setError('');
//   };

//   const handleProductChange = (event, newValue) => {
//     if (newValue && !selectedProducts.some((p) => p.id === newValue.id)) {
//       setSelectedProducts((prev) => [
//         ...prev,
//         {
//           ...newValue,
//           salePrice: '',
//           saleQuantity: '',
//         },
//       ]);
//     }
//   };

//   const handleProductDetailChange = (id, field, value) => {
//     setSelectedProducts((prev) =>
//       prev.map((product) => {
//         if (product.id === id) {
//           if (field === 'saleQuantity') {
//             const quantity = parseInt(value) || 0;
//             if (quantity > product.quantity) {
//               return { ...product, [field]: product.quantity };
//             }
//           }
//           return { ...product, [field]: value };
//         }
//         return product;
//       })
//     );
//   };

//   const handleRemoveProduct = (id) => {
//     setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
//   };

//   const isDateValid = () => {
//     if (!dateStart || !dateEnd) return false;
//     const start = new Date(dateStart);
//     const end = new Date(dateEnd);
//     return (end - start) / (1000 * 60 * 60 * 24) >= 1;
//   };

//   const isProductsValid = () => {
//     return selectedProducts.every((p) => {
//       const salePrice = parseFloat(p.salePrice);
//       return (
//         p.salePrice !== '' &&
//         p.saleQuantity !== '' &&
//         parseInt(p.saleQuantity) > 0 &&
//         salePrice > 0 &&
//         salePrice <= p.price
//       );
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isDateValid()) {
//       setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
//       return;
//     }

//     if (!isProductsValid()) {
//       setError('Vui lòng nhập đúng giá và số lượng khuyến mại');
//       return;
//     }

//     const discountData = {
//       dateStart,
//       dateEnd,
//       products: selectedProducts.map((p) => ({
//         productId: p.id,
//         salePrice: parseFloat(p.salePrice),
//         quantity: parseInt(p.saleQuantity),
//       })),
//     };

//     try {
//       await axios.post('http://localhost:6868/api/discount', discountData);
//       navigate('/admin/discount');
//     } catch (err) {
//       console.error('Lỗi khi gửi dữ liệu:', err);
//       setError('Đã xảy ra lỗi khi gửi chương trình khuyến mại');
//     }
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Thêm chương trình khuyến mại mới
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//             <TextField
//               label="Ngày bắt đầu"
//               name="dateStart"
//               type="date"
//               value={dateStart}
//               onChange={handleDateChange}
//               InputLabelProps={{ shrink: true }}
//               required
//               fullWidth
//             />
//             <TextField
//               label="Ngày kết thúc"
//               name="dateEnd"
//               type="date"
//               value={dateEnd}
//               onChange={handleDateChange}
//               InputLabelProps={{ shrink: true }}
//               required
//               fullWidth
//             />
//           </Box>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Autocomplete
//             options={products.filter(
//               (p) => !selectedProducts.some((sp) => sp.id === p.id)
//             )}
//             getOptionLabel={(option) => `${option.id} - ${option.name}`}
//             filterOptions={(options, { inputValue }) => {
//               const input = inputValue.toLowerCase();
//               return options.filter(
//                 (option) =>
//                   option.name.toLowerCase().includes(input) ||
//                   option.id.toString().includes(input)
//               );
//             }}
//             renderOption={(props, option) => (
//               <li {...props}>
//                 {option.id} - {option.name} (Tồn kho: {option.quantity}, Giá: {option.price?.toLocaleString()} VNĐ)
//               </li>
//             )}
//             onChange={handleProductChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Thêm sản phẩm"
//                 placeholder="Gõ ID hoặc tên sản phẩm"
//                 margin="normal"
//               />
//             )}
//             fullWidth
//           />

//           {selectedProducts.length > 0 && (
//             <TableContainer sx={{ mt: 2 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Tên sản phẩm</TableCell>
//                     <TableCell>Tồn kho</TableCell>
//                     <TableCell>Giá gốc (VNĐ)</TableCell>
//                     <TableCell>Giá khuyến mại</TableCell>
//                     <TableCell>Số lượng KM</TableCell>
//                     <TableCell>Hành động</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {selectedProducts.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell>{product.id}</TableCell>
//                       <TableCell>{product.name}</TableCell>
//                       <TableCell>{product.quantity}</TableCell>
//                       <TableCell>{product.price?.toLocaleString()}</TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={product.salePrice}
//                           onChange={(e) =>
//                             handleProductDetailChange(product.id, 'salePrice', e.target.value)
//                           }
//                           size="small"
//                           inputProps={{ min: 0 }}
//                           required
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={product.saleQuantity}
//                           onChange={(e) =>
//                             handleProductDetailChange(product.id, 'saleQuantity', e.target.value)
//                           }
//                           size="small"
//                           inputProps={{ min: 1, max: product.quantity }}
//                           required
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           size="small"
//                           onClick={() => handleRemoveProduct(product.id)}
//                         >
//                           Xóa
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           <Box sx={{ mt: 3, textAlign: 'right' }}>
//             <Button variant="contained" color="primary" type="submit">
//               Thêm chương trình
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default AddDiscount;




import React, { useState, useEffect } from 'react'; // import hook useState và useEffect để quản lý state và gọi API khi component mount
import { useNavigate } from 'react-router-dom'; // hook dùng để chuyển hướng
import axios from 'axios'; // thư viện gọi HTTP

// Import các component từ MUI
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function AddDiscount() {
  const navigate = useNavigate(); // khởi tạo navigate để chuyển trang sau khi thêm xong

  const [products, setProducts] = useState([]); // lưu danh sách sản phẩm lấy từ server
  const [dateStart, setDateStart] = useState(''); // ngày bắt đầu chương trình
  const [dateEnd, setDateEnd] = useState(''); // ngày kết thúc chương trình
  const [error, setError] = useState(''); // thông báo lỗi nếu có
  const [selectedProducts, setSelectedProducts] = useState([]); // danh sách sản phẩm được chọn để giảm giá

  useEffect(() => {
    axios
      .get('http://localhost:6868/api/products') // gọi API lấy danh sách sản phẩm
      .then((res) => {
        setProducts(res.data); // lưu vào state products
      })
      .catch((err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
        setError('Không thể tải danh sách sản phẩm từ máy chủ');
      });
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateStart') setDateStart(value); // cập nhật ngày bắt đầu
    if (name === 'dateEnd') setDateEnd(value); // cập nhật ngày kết thúc
    setError('');
  };

  const handleProductChange = (event, newValue) => {
    if (newValue && !selectedProducts.some((p) => p.id === newValue.id)) {
      setSelectedProducts((prev) => [
        ...prev,
        {
          ...newValue,
          salePrice: '', // thêm giá khuyến mại mặc định rỗng
          saleQuantity: '', // thêm số lượng khuyến mại mặc định rỗng
        },
      ]);
    }
  };

  const handleProductDetailChange = (id, field, value) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          if (field === 'saleQuantity') {
            const quantity = parseInt(value) || 0;
            if (quantity > product.quantity) {
              return { ...product, [field]: product.quantity }; // không cho vượt quá số lượng tồn
            }
          }
          return { ...product, [field]: value }; // cập nhật giá trị field tương ứng
        }
        return product;
      })
    );
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id)); // xóa sản phẩm khỏi danh sách đã chọn
  };

  const isDateValid = () => {
    if (!dateStart || !dateEnd) return false;
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    return (end - start) / (1000 * 60 * 60 * 24) >= 1; // ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày
  };

  const isProductsValid = () => {
    return selectedProducts.every((p) => {
      const salePrice = parseFloat(p.salePrice);
      return (
        p.salePrice !== '' &&
        p.saleQuantity !== '' &&
        parseInt(p.saleQuantity) > 0 &&
        salePrice > 0 &&
        salePrice <= p.price // giá khuyến mãi không vượt giá gốc
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ngăn reload trang

    if (!isDateValid()) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
      return;
    }

    if (!isProductsValid()) {
      setError('Vui lòng nhập đúng giá và số lượng khuyến mại');
      return;
    }

    const discountData = {
      dateStart,
      dateEnd,
      products: selectedProducts.map((p) => ({
        productId: p.id,
        salePrice: parseFloat(p.salePrice),
        quantity: parseInt(p.saleQuantity),
      })),
    };

    try {
      await axios.post('http://localhost:6868/api/discounts', discountData); // gửi dữ liệu khuyến mãi lên server
      navigate('/admin/discount'); // chuyển về trang danh sách khuyến mãi sau khi thêm thành công
    } catch (err) {
      console.error('Lỗi khi gửi dữ liệu:', err);
      setError('Đã xảy ra lỗi khi gửi chương trình khuyến mại'); // hiện lỗi nếu có
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm chương trình khuyến mại mới
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}> {/* form gọi handleSubmit khi bấm nút Thêm */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Ngày bắt đầu"
              name="dateStart"
              type="date"
              value={dateStart}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="Ngày kết thúc"
              name="dateEnd"
              type="date"
              value={dateEnd}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error} {/* hiển thị thông báo lỗi nếu có */}
            </Alert>
          )}

          <Autocomplete
            options={products.filter(
              (p) => !selectedProducts.some((sp) => sp.id === p.id)
            )} // lọc sản phẩm chưa chọn
            getOptionLabel={(option) => `${option.id} - ${option.name}`}
            filterOptions={(options, { inputValue }) => {
              const input = inputValue.toLowerCase();
              return options.filter(
                (option) =>
                  option.name.toLowerCase().includes(input) ||
                  option.id.toString().includes(input)
              );
            }}
            renderOption={(props, option) => (
              <li {...props}>
                {option.id} - {option.name} (Tồn kho: {option.quantity}, Giá: {option.price?.toLocaleString()} VNĐ)
              </li>
            )}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Thêm sản phẩm"
                placeholder="Gõ ID hoặc tên sản phẩm"
                margin="normal"
              />
            )}
            fullWidth
          />

          {selectedProducts.length > 0 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Tồn kho</TableCell>
                    <TableCell>Giá gốc (VNĐ)</TableCell>
                    <TableCell>Giá khuyến mại</TableCell>
                    <TableCell>Số lượng KM</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.price?.toLocaleString()}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.salePrice}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'salePrice', e.target.value)
                          }
                          size="small"
                          inputProps={{ min: 0 }}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.saleQuantity}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'saleQuantity', e.target.value)
                          }
                          size="small"
                          inputProps={{ min: 1, max: product.quantity }}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleRemoveProduct(product.id)} // xóa sản phẩm khỏi danh sách
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" color="primary" type="submit"> {/* khi ấn sẽ gọi handleSubmit */}
              Thêm chương trình
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddDiscount;
