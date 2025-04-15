// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   Autocomplete,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
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
//       { productId: 1, price: 40000, quantity: 50, name: 'Sách A' },
//       { productId: 2, price: 60000, quantity: 30, name: 'Sách B' },
//     ],
//   },
//   {
//     id: 2,
//     supplierId: 2,
//     importDate: '2025-04-02',
//     items: [
//       { productId: 1, price: 45000, quantity: 20, name: 'Sách A' },
//     ],
//   },
// ];

// function EditImportProduct() {
//   const { importId } = useParams();
//   const navigate = useNavigate();
//   const initialImport = importProducts.find((i) => i.id === parseInt(importId)) || {};

//   // State cho thông tin phiếu nhập
//   const [importProduct, setImportProduct] = useState({
//     supplierId: initialImport.supplierId || null,
//     importDate: initialImport.importDate || '',
//     items: initialImport.items || [],
//   });
//   const [error, setError] = useState('');

//   // Xử lý thay đổi nhà cung cấp
//   const handleSupplierChange = (event, newValue) => {
//     setImportProduct((prev) => ({ ...prev, supplierId: newValue ? newValue.id : null }));
//     setError('');
//   };

//   // Xử lý khi chọn sản phẩm (tự động thêm vào danh sách)
//   const handleProductChange = (event, newValue) => {
//     if (newValue && !importProduct.items.some((item) => item.productId === newValue.id)) {
//       setImportProduct((prev) => ({
//         ...prev,
//         items: [...prev.items, { productId: newValue.id, name: newValue.name, price: '', quantity: '' }],
//       }));
//     }
//   };

//   // Xử lý thay đổi giá và số lượng trong bảng
//   const handleItemDetailChange = (productId, field, value) => {
//     setImportProduct((prev) => ({
//       ...prev,
//       items: prev.items.map((item) =>
//         item.productId === productId ? { ...item, [field]: value } : item
//       ),
//     }));
//   };

//   // Xử lý xóa sản phẩm khỏi danh sách
//   const handleRemoveItem = (productId) => {
//     setImportProduct((prev) => ({
//       ...prev,
//       items: prev.items.filter((item) => item.productId !== productId),
//     }));
//   };

//   // Kiểm tra dữ liệu hợp lệ
//   const isValid = () => {
//     return (
//       importProduct.supplierId !== null &&
//       importProduct.items.length > 0 &&
//       importProduct.items.every(
//         (item) => item.price !== '' && item.quantity !== '' && parseInt(item.quantity) > 0
//       )
//     );
//   };

//   // Xử lý submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValid()) {
//       setError('Vui lòng chọn nhà cung cấp và điền đầy đủ giá, số lượng cho tất cả sản phẩm');
//       return;
//     }

//     const importData = {
//       id: parseInt(importId),
//       supplierId: importProduct.supplierId,
//       importDate: importProduct.importDate,
//       items: importProduct.items.map(({ productId, price, quantity }) => ({
//         productId,
//         price: parseFloat(price) || 0,
//         quantity: parseInt(quantity) || 0,
//       })),
//     };
//     console.log('Cập nhật phiếu nhập:', importData);
//     navigate('/admin/import-products');
//   };

//   if (!initialImport.id) {
//     return (
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h6">Không tìm thấy phiếu nhập</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Chỉnh sửa phiếu nhập hàng #{importId}
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {/* Ô chọn nhà cung cấp và sản phẩm */}
//           <Grid container spacing={2} sx={{ mb: 2 }}>
//             <Grid item xs={6}>
//               <Autocomplete
//                 options={suppliers}
//                 value={suppliers.find((s) => s.id === importProduct.supplierId) || null}
//                 getOptionLabel={(option) => `${option.id} - ${option.name}`}
//                 onChange={handleSupplierChange}
//                 renderInput={(params) => (
//                   <TextField {...params} label="Chọn nhà cung cấp" required />
//                 )}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Autocomplete
//                 options={products.filter(
//                   (p) => !importProduct.items.some((item) => item.productId === p.id)
//                 )}
//                 getOptionLabel={(option) => `${option.id} - ${option.name}`}
//                 onChange={handleProductChange}
//                 renderInput={(params) => (
//                   <TextField {...params} label="Chọn sản phẩm" placeholder="Gõ ID hoặc tên sản phẩm" />
//                 )}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>

//           {/* Bảng danh sách sản phẩm */}
//           {importProduct.items.length > 0 && (
//             <TableContainer sx={{ mt: 2 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Tên sản phẩm</TableCell>
//                     <TableCell>Giá (VNĐ)</TableCell>
//                     <TableCell>Số lượng</TableCell>
//                     <TableCell>Hành động</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {importProduct.items.map((item) => (
//                     <TableRow key={item.productId}>
//                       <TableCell>{item.productId}</TableCell>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={item.price}
//                           onChange={(e) =>
//                             handleItemDetailChange(item.productId, 'price', e.target.value)
//                           }
//                           size="small"
//                           required
//                           inputProps={{ min: 0 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={item.quantity}
//                           onChange={(e) =>
//                             handleItemDetailChange(item.productId, 'quantity', e.target.value)
//                           }
//                           size="small"
//                           required
//                           inputProps={{ min: 0 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           size="small"
//                           onClick={() => handleRemoveItem(item.productId)}
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

//           <Box sx={{ mt: 3 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ mr: 2 }}
//               disabled={importProduct.items.length === 0}
//             >
//               Lưu
//             </Button>
//             <Button variant="outlined" onClick={() => navigate('/admin/import-products')}>
//               Hủy
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default EditImportProduct;

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
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  CircularProgress,
} from '@mui/material';

function EditImportProduct() {
  const { importId } = useParams();
  const navigate = useNavigate();

  // State cho thông tin phiếu nhập
  const [importProduct, setImportProduct] = useState({
    supplierId: null,
    importDate: '',
    items: [],
  });
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [suppliersResponse, productsResponse, importResponse] = await Promise.all([
          axios.get('http://localhost:6868/api/supplier'),
          axios.get('http://localhost:6868/api/products'),
          axios.get(`http://localhost:6868/api/import-products/${importId}`),
        ]);
        setSuppliers(suppliersResponse.data);
        setProducts(productsResponse.data);
        const importData = importResponse.data;
        setImportProduct({
          supplierId: importData.supplier?.id || null,
          importDate: importData.importDate || '',
          items: [
            {
              productId: importData.product?.id,
              name: importData.product?.name,
              price: importData.price?.toString() || '',
              quantity: importData.quantity?.toString() || '',
            },
          ],
        });
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError('Không thể tải dữ liệu phiếu nhập, nhà cung cấp hoặc sản phẩm.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [importId]);

  // Xử lý thay đổi nhà cung cấp
  const handleSupplierChange = (event, newValue) => {
    setImportProduct((prev) => ({ ...prev, supplierId: newValue ? newValue.id : null }));
    setError('');
  };

  // Xử lý khi chọn sản phẩm (tự động thêm vào danh sách)
  const handleProductChange = (event, newValue) => {
    if (newValue && !importProduct.items.some((item) => item.productId === newValue.id)) {
      setImportProduct((prev) => ({
        ...prev,
        items: [...prev.items, { productId: newValue.id, name: newValue.name, price: '', quantity: '' }],
      }));
    }
  };

  // Xử lý thay đổi giá và số lượng trong bảng
  const handleItemDetailChange = (productId, field, value) => {
    setImportProduct((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Xử lý xóa sản phẩm khỏi danh sách
  const handleRemoveItem = (productId) => {
    setImportProduct((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    return (
      importProduct.supplierId !== null &&
      importProduct.items.length > 0 &&
      importProduct.items.every(
        (item) => item.price !== '' && item.quantity !== '' && parseInt(item.quantity) > 0
      )
    );
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError('Vui lòng chọn nhà cung cấp và điền đầy đủ giá, số lượng cho tất cả sản phẩm');
      return;
    }

    setLoading(true);
    try {
      // Delete original import product
      await axios.delete(`http://localhost:6868/api/import-products/${importId}`);

      // Create new import products for each item
      const importPromises = importProduct.items.map((item) =>
        axios.post('http://localhost:6868/api/import-products', {
          supplier: { id: importProduct.supplierId },
          product: { id: item.productId },
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 0,
          importDate: importProduct.importDate || new Date().toISOString(),
        })
      );

      await Promise.all(importPromises);
      navigate('/admin/import-products');
    } catch (err) {
      console.error('Lỗi khi cập nhật phiếu nhập:', err);
      setError('Không thể cập nhật phiếu nhập. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy phiếu nhập</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa phiếu nhập hàng #{importId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Ô chọn nhà cung cấp và sản phẩm */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Autocomplete
                    options={suppliers}
                    value={suppliers.find((s) => s.id === importProduct.supplierId) || null}
                    getOptionLabel={(option) => `${option.id} - ${option.name}`}
                    onChange={handleSupplierChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Chọn nhà cung cấp" required />
                    )}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={products.filter(
                      (p) => !importProduct.items.some((item) => item.productId === p.id)
                    )}
                    getOptionLabel={(option) => `${option.id} - ${option.name}`}
                    onChange={handleProductChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Chọn sản phẩm" placeholder="Gõ ID hoặc tên sản phẩm" />
                    )}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              {/* Bảng danh sách sản phẩm */}
              {importProduct.items.length > 0 && (
                <TableContainer sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Giá (VNĐ)</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {importProduct.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.productId}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={item.price}
                              onChange={(e) =>
                                handleItemDetailChange(item.productId, 'price', e.target.value)
                              }
                              size="small"
                              required
                              inputProps={{ min: 0, step: '0.01' }}
                              disabled={loading}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemDetailChange(item.productId, 'quantity', e.target.value)
                              }
                              size="small"
                              required
                              inputProps={{ min: 1 }}
                              disabled={loading}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleRemoveItem(item.productId)}
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
              )}

              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  disabled={loading || importProduct.items.length === 0}
                >
                  Lưu
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/import-products')}
                  disabled={loading}
                >
                  Hủy
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default EditImportProduct;