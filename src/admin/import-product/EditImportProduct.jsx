




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
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

// function EditImportProduct() {
//   const { importId } = useParams();
//   const navigate = useNavigate();
//   const [suppliers, setSuppliers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [importProduct, setImportProduct] = useState({
//     supplierId: null,
//     importDate: '',
//     items: [],
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('/api/suppliers').then(res => setSuppliers(res.data));
//     axios.get('/api/products').then(res => setProducts(res.data));

//     axios.get(`/api/import-products/${importId}`).then(res => {
//       const data = res.data;
//       setImportProduct({
//         supplierId: data.supplier.id,
//         importDate: data.importDate,
//         items: [
//           {
//             productId: 1,
//             name: 'Sản phẩm A',
//             quantity: data.quantity,
//             price: data.price
//           }
//         ]
//       });
//     });
//   }, [importId]);

//   const handleSupplierChange = (event, newValue) => {
//     setImportProduct(prev => ({ ...prev, supplierId: newValue ? newValue.id : null }));
//     setError('');
//   };

//   const handleProductChange = (event, newValue) => {
//     if (newValue && !importProduct.items.some(item => item.productId === newValue.id)) {
//       setImportProduct(prev => ({
//         ...prev,
//         items: [...prev.items, { productId: newValue.id, name: newValue.name, price: '', quantity: '' }],
//       }));
//     }
//   };

//   const handleItemDetailChange = (productId, field, value) => {
//     setImportProduct(prev => ({
//       ...prev,
//       items: prev.items.map(item =>
//         item.productId === productId ? { ...item, [field]: value } : item
//       ),
//     }));
//   };

//   const handleRemoveItem = (productId) => {
//     setImportProduct(prev => ({
//       ...prev,
//       items: prev.items.filter(item => item.productId !== productId),
//     }));
//   };

//   const isValid = () => {
//     return (
//       importProduct.supplierId !== null &&
//       importProduct.items.length > 0 &&
//       importProduct.items.every(item => item.price !== '' && item.quantity !== '' && parseInt(item.quantity) > 0)
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isValid()) {
//       setError('Vui lòng chọn nhà cung cấp và điền đầy đủ giá, số lượng cho tất cả sản phẩm');
//       return;
//     }

//     const item = importProduct.items[0];
//     const importData = {
//       supplier: { id: importProduct.supplierId },
//       quantity: parseInt(item.quantity),
//       price: parseFloat(item.price),
//       importDate: importProduct.importDate
//     };

//     axios.put(`/api/import-products/${importId}`, importData)
//       .then(() => navigate('/admin/import-products'))
//       .catch(err => {
//         console.error(err);
//         setError('Lỗi khi cập nhật phiếu nhập hàng');
//       });
//   };

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Chỉnh sửa phiếu nhập hàng #{importId}
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           <Grid container spacing={2} sx={{ mb: 2 }}>
//             <Grid item xs={6}>
//               <Autocomplete
//                 options={suppliers}
//                 value={suppliers.find(s => s.id === importProduct.supplierId) || null}
//                 getOptionLabel={option => `${option.id} - ${option.name}`}
//                 onChange={handleSupplierChange}
//                 renderInput={params => <TextField {...params} label="Chọn nhà cung cấp" required />}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Autocomplete
//                 options={products.filter(p => !importProduct.items.some(item => item.productId === p.id))}
//                 getOptionLabel={option => `${option.id} - ${option.name}`}
//                 onChange={handleProductChange}
//                 renderInput={params => <TextField {...params} label="Chọn sản phẩm" />}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>

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
//                   {importProduct.items.map(item => (
//                     <TableRow key={item.productId}>
//                       <TableCell>{item.productId}</TableCell>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={item.price}
//                           onChange={e => handleItemDetailChange(item.productId, 'price', e.target.value)}
//                           size="small"
//                           required
//                           inputProps={{ min: 0 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={item.quantity}
//                           onChange={e => handleItemDetailChange(item.productId, 'quantity', e.target.value)}
//                           size="small"
//                           required
//                           inputProps={{ min: 0 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button variant="contained" color="error" size="small" onClick={() => handleRemoveItem(item.productId)}>
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
//             <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} disabled={importProduct.items.length === 0}>
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
  Grid,
} from '@mui/material';

function EditImportProduct() {
  const { importId } = useParams();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [importProduct, setImportProduct] = useState({
    supplierId: null,
    productId: null,
    productName: '',
    price: '',
    quantity: '',
    importDate: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/supplier')
      .then(res => setSuppliers(res.data))
      .catch(err => {
        console.error(err);
        setError('Không thể tải danh sách nhà cung cấp');
      });
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error(err);
        setError('Không thể tải danh sách sản phẩm');
      });
    axios.get(`/api/import-products/${importId}`)
      .then(res => {
        const data = res.data;
        setImportProduct({
          supplierId: data.supplier?.id || null,
          productId: data.product?.id || null,
          productName: data.product?.name || '',
          price: data.price || '',
          quantity: data.quantity || '',
          importDate: data.importDate || '',
        });
      })
      .catch(err => {
        console.error(err);
        setError('Không thể tải thông tin phiếu nhập');
      });
  }, [importId]);

  const handleSupplierChange = (event, newValue) => {
    setImportProduct(prev => ({ ...prev, supplierId: newValue ? newValue.id : null }));
    setError('');
  };

  const handleProductChange = (event, newValue) => {
    setImportProduct(prev => ({
      ...prev,
      productId: newValue ? newValue.id : null,
      productName: newValue ? newValue.name : '',
    }));
    setError('');
  };

  const handleInputChange = (field, value) => {
    setImportProduct(prev => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    return (
      importProduct.supplierId !== null &&
      importProduct.productId !== null &&
      importProduct.price !== '' &&
      importProduct.quantity !== '' &&
      parseInt(importProduct.quantity) > 0 &&
      parseFloat(importProduct.price) >= 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError('Vui lòng chọn nhà cung cấp, sản phẩm và điền đầy đủ giá, số lượng');
      return;
    }

    const importData = {
      supplier: { id: importProduct.supplierId },
      product: { id: importProduct.productId },
      quantity: parseInt(importProduct.quantity),
      price: parseFloat(importProduct.price),
      importDate: importProduct.importDate,
    };

    axios.put(`/api/import-products/${importId}`, importData)
      .then(() => navigate('/admin/import-products'))
      .catch(err => {
        console.error(err);
        setError('Lỗi khi cập nhật phiếu nhập hàng');
      });
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa phiếu nhập hàng #{importId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Autocomplete
                options={suppliers}
                value={suppliers.find(s => s.id === importProduct.supplierId) || null}
                getOptionLabel={option => `${option.id} - ${option.name}`}
                onChange={handleSupplierChange}
                renderInput={params => <TextField {...params} label="Chọn nhà cung cấp" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={products}
                value={products.find(p => p.id === importProduct.productId) || null}
                getOptionLabel={option => `${option.id} - ${option.name}`}
                onChange={handleProductChange}
                renderInput={params => <TextField {...params} label="Chọn sản phẩm" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Giá (VNĐ)"
                type="number"
                value={importProduct.price}
                onChange={e => handleInputChange('price', e.target.value)}
                fullWidth
                required
                inputProps={{ min: 0, step: '0.01' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Số lượng"
                type="number"
                value={importProduct.quantity}
                onChange={e => handleInputChange('quantity', e.target.value)}
                fullWidth
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} disabled={!isValid()}>
              Lưu
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/import-products')}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditImportProduct;