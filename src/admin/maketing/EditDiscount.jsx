


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
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
//   CircularProgress,
// } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';

// function EditDiscount() {
//   const { discountId } = useParams();
//   const navigate = useNavigate();

//   const [discount, setDiscount] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [dateStart, setDateStart] = useState('');
//   const [dateEnd, setDateEnd] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const productsRes = await axios.get('http://localhost:6868/api/products');
//         setProducts(productsRes.data);
//         const discountRes = await axios.get(`http://localhost:6868/api/discounts/${discountId}`);
//         const discountData = discountRes.data;

//         setDiscount(discountData);
//         setDateStart(discountData.dateStart || '');
//         setDateEnd(discountData.dateEnd || '');
//         setSelectedProducts(
//           discountData.products?.map((p) => ({
//             ...productsRes.data.find((prod) => prod.id === p.productId),
//             salePrice: p.salePrice.toString(),
//             quantity: p.quantity.toString(),
//           })) || []
//         );
//       } catch (err) {
//         console.error('Lỗi khi tải dữ liệu:', err);
//         setError('Không thể tải dữ liệu mã giảm giá hoặc sản phẩm');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [discountId]);

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
//         { ...newValue, salePrice: '', quantity: '' },
//       ]);
//     }
//   };

//   const handleProductDetailChange = (id, field, value) => {
//     setSelectedProducts((prev) =>
//       prev.map((product) => {
//         if (product.id === id) {
//           if (field === 'quantity') {
//             const quantity = parseInt(value) || 0;
//             if (quantity > product.quantity) {
//               setError(`Số lượng không được vượt quá tồn kho (${product.stock})`);
//               return { ...product, quantity: product.quantity.toString() };
//             }
//           }
//           if (field === 'salePrice') {
//             const salePrice = parseFloat(value) || 0;
//             if (salePrice > product.Price) {
//               setError(`Giá khuyến mại không được vượt quá giá gốc (${product.Price.toLocaleString()} VNĐ)`);
//               return { ...product, salePrice: product.Price.toString() };
//             }
//           }
//           return { ...product, [field]: value };
//         }
//         return product;
//       })
//     );
//   };

//   const handleRemoveProduct = (id) => {
//     setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
//   };

//   const isDateValid = () => {
//     if (!dateStart || !dateEnd) return false;
//     const start = new Date(dateStart);
//     const end = new Date(dateEnd);
//     const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
//     return diffInDays >= 1;
//   };

//   const isProductsValid = () => {
//     return selectedProducts.every(
//       (p) =>
//         p.salePrice !== '' &&
//         p.quantity !== '' &&
//         parseFloat(p.salePrice) <= p.originalPrice &&
//         parseInt(p.quantity) > 0
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isDateValid()) {
//       setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
//       return;
//     }
//     if (!isProductsValid()) {
//       setError('Vui lòng điền đầy đủ giá và số lượng hợp lệ cho tất cả sản phẩm');
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
//     try {
//       await axios.put(`http://localhost:6868/api/discounts/${discountId}`, discountData);
//       console.log('Cập nhật discount thành công:', discountData);
//       navigate('/admin/discount');
//     } catch (err) {
//       console.error('Lỗi khi cập nhật discount:', err);
//       setError('Không thể cập nhật mã giảm giá. Vui lòng thử lại.');
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ mt: 8, textAlign: 'center' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!discount?.id) {
//     return (
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h6">Không tìm thấy mã giảm giá</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Chỉnh sửa chương trình khuyến mại #{discountId}
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
//             options={products.filter((p) => !selectedProducts.some((sp) => sp.id === p.id))}
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
//                 {option.id} - {option.name} (Tồn kho: {option.quantity}, Giá gốc: {option.Price.toLocaleString()} VNĐ)
//               </li>
//             )}
//             onChange={handleProductChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Thêm sản phẩm"
//                 placeholder="Gõ ID hoặc tên sản phẩm"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//             )}
//             fullWidth
//           />

//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Tên sản phẩm</TableCell>
//                   <TableCell>Giá gốc</TableCell>
//                   <TableCell>Giá khuyến mãi</TableCell>
//                   <TableCell>Số lượng</TableCell>
//                   <TableCell>Tồn kho</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {selectedProducts.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>{product.Price.toLocaleString()} VNĐ</TableCell>
//                     <TableCell>
//                       <TextField
//                         type="number"
//                         value={product.salePrice}
//                         onChange={(e) =>
//                           handleProductDetailChange(product.id, 'salePrice', e.target.value)
//                         }
//                         inputProps={{ min: 0 }}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <TextField
//                         type="number"
//                         value={product.quantity}
//                         onChange={(e) =>
//                           handleProductDetailChange(product.id, 'quantity', e.target.value)
//                         }
//                         inputProps={{ min: 0, max: product.quantity }}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>{product.quantity}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         onClick={() => handleRemoveProduct(product.id)}
//                       >
//                         Xóa
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//             Lưu thay đổi
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default EditDiscount;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

function EditDiscount() {
  const { discountId } = useParams();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsRes = await axios.get('http://localhost:6868/api/products');
        console.log('Raw products data:', productsRes.data);
        const normalizedProducts = productsRes.data
          .filter((product) => product && product.id && product.name)
          .map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price || product.Price || product.originalPrice || 0,
            stock: product.quantity || product.stock || 0,
          }));
        console.log('Normalized products:', normalizedProducts);
        setProducts(normalizedProducts);

        const discountRes = await axios.get(`http://localhost:6868/api/discounts/${discountId}`);
        console.log('Discount data:', discountRes.data);
        const discountData = discountRes.data;
        setDiscount(discountData);
        setDateStart(discountData.dateStart || '');
        setDateEnd(discountData.dateEnd || '');
        setSelectedProducts(
          discountData.products?.map((p) => {
            const product = normalizedProducts.find((prod) => prod.id === p.productId);
            if (!product) {
              console.warn(`Không tìm thấy sản phẩm với ID ${p.productId}`);
              return null;
            }
            return {
              ...product,
              salePrice: p.salePrice ? p.salePrice.toString() : '',
              quantity: p.quantity ? p.quantity.toString() : '',
            };
          }).filter(Boolean) || []
        );
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu mã giảm giá hoặc sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [discountId]);

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
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    return diffInDays >= 1;
  };

  const isProductsValid = () => {
    return selectedProducts.every(
      (p) =>
        p.salePrice !== '' &&
        p.quantity !== '' &&
        parseFloat(p.salePrice) <= (p.price || 0) &&
        parseInt(p.quantity) > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDateValid()) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
      return;
    }
    if (!isProductsValid()) {
      setError('Vui lòng điền đầy đủ giá và số lượng hợp lệ cho tất cả sản phẩm');
      return;
    }
    const discountData = {
      dateStart,
      dateEnd,
      products: selectedProducts.map(({ id, salePrice, quantity }) => ({
        productId: id,
        salePrice: parseFloat(salePrice) || 0,
        quantity: parseInt(quantity) || 0,
      })),
    };
    try {
      await axios.put(`http://localhost:6868/api/discounts/${discountId}`, discountData);
      console.log('Cập nhật discount thành công:', discountData);
      navigate('/admin/discount');
    } catch (err) {
      console.error('Lỗi khi cập nhật discount:', err);
      setError('Không thể cập nhật mã giảm giá. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!discount?.id) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy mã giảm giá</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa chương trình khuyến mại #{discountId}
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
                        inputProps={{ min: 0 }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductDetailChange(product.id, 'quantity', e.target.value)
                        }
                        inputProps={{ min: 0, max: product.stock || 0 }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{product.stock || 0}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Lưu thay đổi
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditDiscount;