// // src/components/ConfirmDeleteModal.jsx
// import React from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   borderRadius: 2,
//   boxShadow: 24,
//   p: 4,
// };

// const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="delete-confirmation"
//       aria-describedby="delete-confirmation-description"
//     >
//       <Box sx={style}>
//         <Typography variant="h6" component="h2" mb={2}>
//           Are you sure you want to delete this product?
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Button variant="contained" color="primary" onClick={onConfirm}>
//             Yes, Delete
//           </Button>
//           <Button variant="contained" color="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ConfirmDeleteModal;


import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from '@mui/icons-material/Warning';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  minWidth: 300,
};

const ConfirmDeleteModal = ({ open, onClose, onConfirm, productName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      await onConfirm(); // Gọi hàm onConfirm từ component cha
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation"
      aria-describedby="delete-confirmation-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WarningIcon sx={{ color: 'error.main', mr: 1 }} />
          <Typography variant="h6" component="h2">
            Delete Product
          </Typography>
        </Box>
        <Typography mb={2}>
          Are you sure you want to delete {productName ? `"${productName}"` : 'this product'}? This action cannot be undone.
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Yes, Delete
          </Button>
          <Button variant="contained" color="primary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;