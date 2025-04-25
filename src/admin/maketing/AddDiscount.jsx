import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';

function AddDiscount() {
  const navigate = useNavigate();
  const [discount, setDiscount] = useState({
    dateStart: '',
    dateEnd: '',
    discountProducts: []
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:6868/api/products')
      .then((response) => {
        setProducts(
          response.data.map((p) => ({
            id: p.id,
            name: p.name,
            stock: p.quantity,
            originalPrice: p.price
          }))
        );
      })
      .catch((err) => {
        setError('Không thể tải danh sách sản phẩm');
        console.error('Lỗi khi lấy sản phẩm:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDiscount(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleProductChange = (event, newValues) => {
    const updatedProducts = newValues.map((newValue) => {
      const existingProduct = discount.discountProducts.find((p) => p.id === newValue.id);
      return existingProduct || { ...newValue, salePrice: '', quantity: '' };
    });
    setDiscount(prev => ({ ...prev, discountProducts: updatedProducts }));
    setError('');
  };

  const handleProductDetailChange = (id, field, value) => {
    setDiscount(prev => {
      const newProducts = prev.discountProducts.map((product) => {
        if (product.id === id) {
          if (field === 'quantity') {
            const quantity = parseInt(value) || 0;
            if (quantity > product.stock) {
              setError(`Số lượng không được vượt quá tồn kho (${product.stock})`);
              return { ...product, quantity: product.stock.toString() };
            }
          }
          if (field === 'salePrice') {
            const salePrice = parseFloat(value) || 0;
            if (salePrice > product.originalPrice) {
              setError(
                `Giá khuyến mại không được vượt quá giá gốc (${product.originalPrice.toLocaleString()} VNĐ)`
              );
              return { ...product, salePrice: product.originalPrice.toString() };
            }
          }
          return { ...product, [field]: value };
        }
        return product;
      });
      return { ...prev, discountProducts: newProducts };
    });
  };

  const handleRemoveProduct = (id) => {
    setDiscount(prev => ({
      ...prev,
      discountProducts: prev.discountProducts.filter((p) => p.id !== id)
    }));
    setError('');
  };

  const isDateValid = () => {
    if (!discount.dateStart || !discount.dateEnd) return false;
    const start = new Date(discount.dateStart);
    const end = new Date(discount.dateEnd);
    return end >= start;
  };

  const isProductsValid = () => {
    return (
      discount.discountProducts.length > 0 &&
      discount.discountProducts.every(
        (p) => p.salePrice !== '' && p.quantity !== '' && parseInt(p.quantity) > 0
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDateValid()) {
      setError('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu');
      return;
    }

    if (!isProductsValid()) {
      setError('Vui lòng chọn ít nhất một sản phẩm và điền đầy đủ giá, số lượng khuyến mại');
      return;
    }

    const discountData = {
      dateCreate: new Date().toISOString().split('T')[0],
      dateStart: discount.dateStart,
      dateEnd: discount.dateEnd,
      discountProducts: discount.discountProducts.map((p) => ({
        productId: p.id,
        salePrice: parseFloat(p.salePrice),
        quantity: parseInt(p.quantity)
      }))
    };

    try {
      await axios.post('http://localhost:6868/api/discounts', discountData);
      navigate('/admin/discount');
    } catch (err) {
      setError(err.response?.data || 'Lỗi khi tạo mã giảm giá.');
      console.error('Lỗi khi tạo mã giảm giá:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Đang tải...</Typography>
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
              value={discount.dateStart}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="Ngày kết thúc"
              name="dateEnd"
              type="date"
              value={discount.dateEnd}
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
            multiple
            options={products}
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
                {option.id} - {option.name} (Tồn kho: {option.stock}, Giá gốc: {option.originalPrice.toLocaleString()} VNĐ)
              </li>
            )}
            onChange={handleProductChange}
            value={discount.discountProducts}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn sản phẩm"
                placeholder="Gõ ID hoặc tên sản phẩm"
                margin="normal"
              />
            )}
            fullWidth
          />

          {discount.discountProducts.length > 0 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Tồn kho</TableCell>
                    <TableCell>Giá gốc (VNĐ)</TableCell>
                    <TableCell>Giá khuyến mại (VNĐ)</TableCell>
                    <TableCell>Số lượng khuyến mại</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {discount.discountProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.originalPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.salePrice}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'salePrice', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0, max: product.originalPrice }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'quantity', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0, max: product.stock }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
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
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              disabled={discount.discountProducts.length === 0}
            >
              Lưu
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/discount')}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddDiscount;