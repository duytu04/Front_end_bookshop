




// import React, { useState, useEffect } from 'react'; // import hook useState và useEffect để quản lý state và gọi API khi component mount
// import { useNavigate } from 'react-router-dom'; // hook dùng để chuyển hướng
// import axios from 'axios'; // thư viện gọi HTTP

// // Import các component từ MUI
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
//   const navigate = useNavigate(); // khởi tạo navigate để chuyển trang sau khi thêm xong

//   const [products, setProducts] = useState([]); // lưu danh sách sản phẩm lấy từ server
//   const [dateStart, setDateStart] = useState(''); // ngày bắt đầu chương trình
//   const [dateEnd, setDateEnd] = useState(''); // ngày kết thúc chương trình
//   const [error, setError] = useState(''); // thông báo lỗi nếu có
//   const [selectedProducts, setSelectedProducts] = useState([]); // danh sách sản phẩm được chọn để giảm giá

//   useEffect(() => {
//     axios
//       .get('http://localhost:6868/api/products') // gọi API lấy danh sách sản phẩm
//       .then((res) => {
//         setProducts(res.data); // lưu vào state products
//       })
//       .catch((err) => {
//         console.error('Lỗi khi tải sản phẩm:', err);
//         setError('Không thể tải danh sách sản phẩm từ máy chủ');
//       });
//   }, []);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'dateStart') setDateStart(value); // cập nhật ngày bắt đầu
//     if (name === 'dateEnd') setDateEnd(value); // cập nhật ngày kết thúc
//     setError('');
//   };

//   const handleProductChange = (event, newValue) => {
//     if (newValue && !selectedProducts.some((p) => p.id === newValue.id)) {
//       setSelectedProducts((prev) => [
//         ...prev,
//         {
//           ...newValue,
//           salePrice: '', // thêm giá khuyến mại mặc định rỗng
//           saleQuantity: '', // thêm số lượng khuyến mại mặc định rỗng
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
//               return { ...product, [field]: product.quantity }; // không cho vượt quá số lượng tồn
//             }
//           }
//           return { ...product, [field]: value }; // cập nhật giá trị field tương ứng
//         }
//         return product;
//       })
//     );
//   };

//   const handleRemoveProduct = (id) => {
//     setSelectedProducts((prev) => prev.filter((p) => p.id !== id)); // xóa sản phẩm khỏi danh sách đã chọn
//   };

//   const isDateValid = () => {
//     if (!dateStart || !dateEnd) return false;
//     const start = new Date(dateStart);
//     const end = new Date(dateEnd);
//     return (end - start) / (1000 * 60 * 60 * 24) >= 1; // ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày
//   };

//   const isProductsValid = () => {
//     return selectedProducts.every((p) => {
//       const salePrice = parseFloat(p.salePrice);
//       return (
//         p.salePrice !== '' &&
//         p.saleQuantity !== '' &&
//         parseInt(p.saleQuantity) > 0 &&
//         salePrice > 0 &&
//         salePrice <= p.price // giá khuyến mãi không vượt giá gốc
//       );
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // ngăn reload trang

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
//         product: { id: p.id }, // Thêm đối tượng product với id
//         salePrice: parseFloat(p.salePrice),
//         quantity: parseInt(p.saleQuantity),
//       })),
//     };

//     try {
//       await axios.post('http://localhost:6868/api/discounts', discountData); // gửi dữ liệu khuyến mãi lên server
//       navigate('/admin/discount'); // chuyển về trang danh sách khuyến mãi sau khi thêm thành công
//     } catch (err) {
//       console.error('Lỗi khi gửi dữ liệu:', err);
//       setError('Đã xảy ra lỗi khi gửi chương trình khuyến mại'); // hiện lỗi nếu có
//     }
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Thêm chương trình khuyến mại mới
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Box component="form" onSubmit={handleSubmit}> {/* form gọi handleSubmit khi bấm nút Thêm */}
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
//               {error} {/* hiển thị thông báo lỗi nếu có */}
//             </Alert>
//           )}

//           <Autocomplete
//             options={products.filter(
//               (p) => !selectedProducts.some((sp) => sp.id === p.id)
//             )} // lọc sản phẩm chưa chọn
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
//                           onClick={() => handleRemoveProduct(product.id)} // xóa sản phẩm khỏi danh sách
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
//             <Button variant="contained" color="primary" type="submit"> {/* khi ấn sẽ gọi handleSubmit */}
//               Thêm chương trình
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default AddDiscount;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  CircularProgress,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function AddDiscount() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:6868/api/products');
        const normalizedProducts = res.data
          .filter((product) => product && product.id && product.name)
          .map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price || product.Price || product.originalPrice || 0,
            stock: product.quantity || product.stock || 0,
          }));
        console.log('Normalized products:', normalizedProducts);
        setProducts(normalizedProducts);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        setError('Không thể tải danh sách sản phẩm từ máy chủ');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateStart') setDateStart(value);
    if (name === 'dateEnd') setDateEnd(value);
    setError('');
  };

  const handleProductChange = (event, newValue) => {
    if (newValue && !selectedProducts.some((p) => p.id === newValue.id)) {
      setSelectedProducts((prev) => [
        ...prev,
        { ...newValue, salePrice: '', quantity: '' },
      ]);
    }
  };

  const handleProductDetailChange = (id, field, value) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          if (field === 'quantity') {
            const quantity = parseInt(value) || 0;
            const maxStock = product.stock || 0;
            if (quantity > maxStock) {
              setError(`Số lượng không được vượt quá tồn kho (${maxStock})`);
              return { ...product, quantity: maxStock.toString() };
            }
          }
          if (field === 'salePrice') {
            const salePrice = parseFloat(value) || 0;
            const maxPrice = product.price || 0;
            if (salePrice > maxPrice) {
              setError(`Giá khuyến mại không được vượt quá giá gốc (${maxPrice.toLocaleString('vi-VN')} VNĐ)`);
              return { ...product, salePrice: maxPrice.toString() };
            }
          }
          return { ...product, [field]: value };
        }
        return product;
      })
    );
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const isDateValid = () => {
    if (!dateStart || !dateEnd) return false;
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    return diffInDays >= 1;
  };

  const isProductsValid = () => {
    return selectedProducts.length > 0 && selectedProducts.every(
      (p) =>
        p.id &&
        p.name &&
        p.salePrice !== '' &&
        p.quantity !== '' &&
        parseFloat(p.salePrice) > 0 &&
        parseInt(p.quantity) > 0 &&
        parseFloat(p.salePrice) <= (p.price || 0) &&
        parseInt(p.quantity) <= (p.stock || 0)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isDateValid()) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
      return;
    }
    if (!isProductsValid()) {
      setError('Vui lòng chọn ít nhất một sản phẩm và điền đầy đủ giá, số lượng hợp lệ');
      return;
    }
    const discountData = {
      dateStart,
      dateEnd,
      dateCreate: new Date().toISOString().split('T')[0], // Thêm dateCreate
      products: selectedProducts.map((p) => ({
        product: {
          id: p.id,
          name: p.name,
          price: p.price || 0,
          quantity: p.stock || 0,
        },
        salePrice: parseFloat(p.salePrice) || 0,
        quantity: parseInt(p.quantity) || 0,
      })),
    };
    console.log('Dữ liệu gửi đi:', discountData);
    try {
      setLoading(true);
      await axios.post('http://localhost:6868/api/discounts', discountData);
      console.log('Tạo discount thành công:', discountData);
      navigate('/admin/discount');
    } catch (err) {
      console.error('Chi tiết lỗi:', err.response);
      setError(
        err.response?.data?.message ||
          'Không thể tạo mã giảm giá. Vui lòng kiểm tra dữ liệu và thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm chương trình khuyến mại
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
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
              disabled={loading}
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
              disabled={loading}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Autocomplete
            options={products.filter((p) => !selectedProducts.some((sp) => sp.id === p.id))}
            getOptionLabel={(option) => (option.id && option.name ? `${option.id} - ${option.name}` : 'Sản phẩm không hợp lệ')}
            filterOptions={(options, { inputValue }) => {
              const input = inputValue.toLowerCase();
              return options.filter(
                (option) =>
                  (option.name && option.name.toLowerCase().includes(input)) ||
                  (option.id && option.id.toString().includes(input))
              );
            }}
            renderOption={(props, option) => {
              if (!option || !option.id || !option.name) {
                return <li {...props}>Sản phẩm không hợp lệ</li>;
              }
              return (
                <li {...props}>
                  {option.id} - {option.name} (Tồn kho: {option.stock || 0}, Giá gốc: {(option.price || 0).toLocaleString('vi-VN')} VNĐ)
                </li>
              );
            }}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Thêm sản phẩm"
                placeholder="Gõ ID hoặc tên sản phẩm"
                variant="outlined"
                margin="normal"
                fullWidth
                sx={{ mb: 2 }}
                disabled={loading}
              />
            )}
            fullWidth
          />

          {selectedProducts.length === 0 && (
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Chưa có sản phẩm nào được chọn. Vui lòng thêm sản phẩm từ ô tìm kiếm.
            </Typography>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá gốc</TableCell>
                  <TableCell>Giá khuyến mãi</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Tồn kho</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{(product.price || 0).toLocaleString('vi-VN')} VNĐ</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.salePrice}
                        onChange={(e) =>
                          handleProductDetailChange(product.id, 'salePrice', e.target.value)
                        }
                        inputProps={{ min: 0, step: 1 }}
                        size="small"
                        disabled={loading}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductDetailChange(product.id, 'quantity', e.target.value)
                        }
                        inputProps={{ min: 1, max: product.stock || 0, step: 1 }}
                        size="small"
                        disabled={loading}
                      />
                    </TableCell>
                    <TableCell>{product.stock || 0}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveProduct(product.id)}
                        disabled={loading}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Tạo chương trình'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddDiscount;