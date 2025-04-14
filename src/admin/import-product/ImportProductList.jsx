


import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

function ImportProductList() {
  const navigate = useNavigate();
  const [importProducts, setImportProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchImportProducts();
  }, []);

  const fetchImportProducts = () => {
    axios.get('http://localhost:6868/api/import-products')
      .then(res => setImportProducts(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách phiếu nhập:', err));
  };

  const handleEditImport = (importId) => {
    navigate(`/admin/edit-import-product/${importId}`);
  };

  const handleDeleteImport = (importId) => {
    axios.delete(`http://localhost:6868/api/import-products/${importId}`)
      .then(() => fetchImportProducts())
      .catch(err => console.error('Lỗi khi xóa phiếu nhập:', err));
  };

  const handleAddImport = () => {
    navigate('/admin/create-import-product');
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách phiếu nhập hàng</Typography>
        <Button variant="contained" color="primary" onClick={handleAddImport}>
          Thêm phiếu nhập
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="import product table">
          <TableHead>
            <TableRow>
              <TableCell>ID phiếu nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {importProducts.map((importProduct) => (
              <React.Fragment key={importProduct.id}>
                <TableRow
                  onClick={() => handleRowClick(importProduct.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{importProduct.id}</TableCell>
                  <TableCell>{formatDate(importProduct.importDate)}</TableCell>
                  <TableCell>{importProduct.supplier?.name || 'Không xác định'}</TableCell>
                  <TableCell>{importProduct.product?.name || 'Không xác định'}</TableCell>
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
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={expandedId === importProduct.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Chi tiết phiếu nhập hàng
                        </Typography>
                        <Typography>ID: {importProduct.id}</Typography>
                        <Typography>Ngày nhập: {formatDate(importProduct.importDate)}</Typography>
                        <Typography>Nhà cung cấp: {importProduct.supplier?.name || 'Không xác định'}</Typography>
                        <Typography>Sản phẩm: {importProduct.product?.name || 'Không xác định'}</Typography>
                        <Typography>Số lượng: {importProduct.quantity}</Typography>
                        <Typography>Giá nhập: {importProduct.price?.toLocaleString()} VNĐ</Typography>
                        <Typography>
                          Tổng tiền: {(importProduct.price * importProduct.quantity)?.toLocaleString()} VNĐ
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


