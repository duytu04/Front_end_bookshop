


// BẢN MỚI ĐANG LỖI
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';

function DiscountList() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách mã giảm giá
        const discountResponse = await axios.get('http://localhost:6868/api/discounts');
        const validDiscounts = discountResponse.data
          .filter(
            (discount) => discount && discount.id && !isNaN(discount.id) && discount.id > 0
          )
          .map((discount) => ({
            ...discount,
            discountProducts: Array.isArray(discount.discountProducts)
              ? discount.discountProducts.map((dp) => ({
                  productId: dp.productId,
                  name: dp.name || 'Không xác định',
                  price: dp.price || 0,
                  salePrice: dp.salePrice,
                  quantity: dp.quantity
                }))
              : [],
          }));
        console.log('Discounts data:', validDiscounts);
        setDiscounts(validDiscounts);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || 'Không thể tải danh sách mã giảm giá');
        setLoading(false);
        console.error('Error fetching discounts:', err);
      }
    };
    fetchData();
  }, []);

  const handleEditDiscount = async (discountId) => {
    if (!discountId || isNaN(discountId) || discountId <= 0) {
      setError('ID mã giảm giá không hợp lệ');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:6868/api/discounts/${discountId}`);
      if (response.data) {
        navigate(`/admin/edit-discount/${discountId}`);
      } else {
        setError(`Mã giảm giá #${discountId} không tồn tại`);
      }
    } catch (err) {
      setError(`Mã giảm giá #${discountId} không tồn tại`);
      console.error('Error checking discount:', err);
    }
  };

  const handleDeleteDiscount = async () => {
    try {
      await axios.delete(`http://localhost:6868/api/discounts/${deleteId}`);
      setDiscounts((prev) => prev.filter((d) => d.id !== deleteId));
      setOpenDialog(false);
      setDeleteId(null);
    } catch (err) {
      setError(err.response?.data || 'Không thể xóa mã giảm giá');
      console.error('Lỗi khi xóa mã giảm giá:', err);
    }
  };

  const handleAddDiscount = () => {
    navigate('/admin/add-discount');
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  if (loading) return <Box sx={{ mt: 8 }}><Typography>Đang tải...</Typography></Box>;
  if (error) return (
    <Box sx={{ mt: 8 }}>
      <Alert severity="error">{error}</Alert>
      <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
        Thử lại
      </Button>
    </Box>
  );

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách mã giảm giá</Typography>
        <Button variant="contained" color="primary" onClick={handleAddDiscount}>
          Thêm mã giảm giá
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="discount table">
          <TableHead>
            <TableRow>
              <TableCell>ID mã giảm giá</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((discount) => (
                <React.Fragment key={discount.id}>
                  <TableRow
                    onClick={() => handleRowClick(discount.id)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: expandedId === discount.id ? '#e3f2fd' : 'inherit',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {discount.id}
                        <IconButton size="small">
                          {expandedId === discount.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{discount.dateStart}</TableCell>
                    <TableCell>{discount.dateEnd}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditDiscount(discount.id);
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
                          handleOpenDialog(discount.id);
                        }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                      <Collapse in={expandedId === discount.id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Chi tiết sản phẩm
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>ID sản phẩm</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Giá gốc (VNĐ)</TableCell>
                                <TableCell>Giá khuyến mại (VNĐ)</TableCell>
                                <TableCell>Số lượng khuyến mại</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {discount.discountProducts && discount.discountProducts.length > 0 ? (
                                discount.discountProducts.map((dp, index) => (
                                  <TableRow key={dp.productId || index}>
                                    <TableCell>{dp.productId || '-'}</TableCell>
                                    <TableCell>{dp.name || 'Không xác định'}</TableCell>
                                    <TableCell>
                                      {dp.price ? dp.price.toLocaleString() : '-'}
                                    </TableCell>
                                    <TableCell>
                                      {dp.salePrice ? dp.salePrice.toLocaleString() : '-'}
                                    </TableCell>
                                    <TableCell>{dp.quantity || '-'}</TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5}>Không có sản phẩm</TableCell>
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={discounts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa mã giảm giá này? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteDiscount} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DiscountList;