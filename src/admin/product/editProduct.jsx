// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Typography, TextField, Button, Box, Chip, Autocomplete } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Grid from '@mui/material/Grid2';

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//   },
//   palette: {
//     primary: {
//       main: '#3498db',
//     },
//     secondary: {
//       main: '#E1306C',
//     },
//   },
// });

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     id: '',
//     name: '',
//     productPrice: '',
//     salePrice: '',
//     discount: '',
//     weight: '',
//     salePerMonth: '',
//     dateImport: '',
//     supplier: '',
//     description: '',
//     ingredient: '',
//     recipe: '',
//     tags: [],
//     images: [],
//     newImages: [],
//   });

//   const [tags, setTags] = useState([]);
//   const availableTags = ["Whole Spices", "Spice Blends", "Powdered Spices"];
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   // Dữ liệu mẫu để demo (thay vì lấy từ server)
//   useEffect(() => {
//     // Dữ liệu giả lập
//     const demoProduct = {
//       id: id,
//       name: 'Sample Product',
//       productPrice: '100',
//       salePrice: '80',
//       discount: '20',
//       weight: '500',
//       salePerMonth: '50',
//       dateImport: '2025-03-01',
//       supplier: '123',
//       description: 'This is a sample product description',
//       ingredient: 'Sample ingredients',
//       recipe: 'Sample recipe',
//       tags: ['Whole Spices'],
//       images: ['sample-image1.jpg', 'sample-image2.jpg'],
//       newImages: [],
//     };
//     setProduct(demoProduct);
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       newImages: files,
//     }));
//   };

//   const handleDeleteImage = (img) => {
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       images: prevProduct.images.filter((image) => image !== img),
//     }));
//     setImagesToDelete((prev) => [...prev, img]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Log dữ liệu để kiểm tra và điều hướng về trang khác
//     console.log('Updated product:', product);
//     console.log('Images to delete:', imagesToDelete);
//     navigate('/admin/allproduct');
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{ backgroundImage: 'url(https://obi.vn/wp-content/uploads/2023/02/top-50-y-tuong-hinh-nen-trang-dep-tinh-khoi-cuc-ky-doc-dao_1.jpg)', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
//         <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'rgba(227, 244, 251, 0.5)' }}></div>
//         <Box sx={{ flexGrow: 1, padding: 5 }}>
//           <form onSubmit={handleSubmit}>
//             <Typography variant="h4" component="h1" gutterBottom color="#0c4646">EDIT PRODUCT FORM</Typography>
//             <Button type="submit" variant="contained" color="success" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }}>CONFIRM</Button>
//             <Button variant="contained" color="error" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }} onClick={() => navigate('/admin/product')}>CANCEL</Button>

//             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center">
//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth label="Product Name"
//                   name="name"
//                   value={product.name}
//                   onChange={handleChange}
//                   required />
//               </Grid>
//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth
//                   label="Product Price"
//                   name="productPrice"
//                   value={product.productPrice}
//                   onChange={handleChange}
//                   type="number"
//                   required />
//               </Grid>
//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth
//                   label="Promotional Price"
//                   name="salePrice"
//                   value={product.salePrice}
//                   onChange={handleChange}
//                   type="number"
//                   required />
//               </Grid>

//               <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Discount"
//                   placeholder="Discount %"
//                   variant="outlined"
//                   type="number"
//                   margin="normal"
//                   name="discount"
//                   value={product.discount}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Weight"
//                   placeholder="Product Weight gram"
//                   type="number"
//                   variant="outlined"
//                   margin="normal"
//                   name="weight"
//                   value={product.weight}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Sales Per Month"
//                   placeholder="Sales Per Month"
//                   type="number"
//                   variant="outlined"
//                   margin="normal"
//                   name="salePerMonth"
//                   value={product.salePerMonth}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Date of import"
//                   margin="normal"
//                   placeholder="Date of import"
//                   variant="outlined"
//                   type="date"
//                   name="dateImport"
//                   value={product.dateImport}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>

//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth
//                   label="Supplier"
//                   placeholder="Supplier Code"
//                   type="number"
//                   variant="outlined"
//                   margin="normal"
//                   name="supplier"
//                   value={product.supplier}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   variant="outlined"
//                   margin="normal"
//                   placeholder="Enter Product Description"
//                   name="description"
//                   value={product.description}
//                   onChange={handleChange}
//                   required
//                   multiline
//                   rows={1}
//                 />
//               </Grid>
//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth
//                   label="Ingredient"
//                   variant="outlined"
//                   margin="normal"
//                   placeholder="Ingredient of Product"
//                   name="ingredient"
//                   value={product.ingredient}
//                   onChange={handleChange}
//                   required
//                   multiline
//                   rows={1}
//                 />
//               </Grid>
//               <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
//                 <TextField
//                   fullWidth
//                   label="Recipe"
//                   variant="outlined"
//                   margin="normal"
//                   placeholder="Recipe of Product"
//                   name="recipe"
//                   value={product.recipe}
//                   onChange={handleChange}
//                   required
//                   multiline
//                   rows={1}
//                 />
//               </Grid>
//             </Grid>

//             <Grid container spacing={{ xs: 5, md: 10 }}
//               columns={{ xs: 4, sm: 8, md: 12 }}
//               alignItems="stretch" justifyContent="center"
//               sx={{ padding: '30px' }} >

//               <Grid item xs={12}>
//                 <Autocomplete
//                   multiple
//                   options={availableTags}
//                   required
//                   value={product.tags}
//                   onChange={(event, newValue) => setProduct({ ...product, tags: newValue })}
//                   renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
//                   renderInput={(params) => <TextField {...params} label="Tags" />}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <input accept="image/*" style={{ display: 'none' }} id="upload-images" multiple type="file" onChange={handleImageChange} />
//                 <label htmlFor="upload-images">
//                   <Button variant="contained" color="primary" component="span">Upload Images</Button>
//                 </label>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//                   {product.images.map((img, index) => (
//                     <div key={index}>
//                       <img
//                         src={img} // Sử dụng trực tiếp tên file để demo
//                         alt={`Product ${index}`}
//                         style={{ width: 150, height: 150, objectFit: 'cover' }}
//                       />
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDeleteImage(img)}
//                       >
//                         x
//                       </Button>
//                     </div>
//                   ))}
//                   {product.newImages.length > 0 && product.newImages.map((file, index) => (
//                     <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: 150, height: 150, objectFit: 'cover' }} />
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default EditProduct;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#E1306C',
    },
  },
});

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    dateAdded: '',
    author: '',
    description: '',
    content: '',
    language: '',
    category: '',
    status: true,
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/api/products/${id}`);
        setProduct({
          name: response.data.name,
          price: response.data.price,
          quantity: response.data.quantity,
          dateAdded: response.data.dateAdded ? response.data.dateAdded.split('T')[0] : '',
          author: response.data.author,
          description: response.data.description,
          content: response.data.content,
          language: response.data.language,
          category: response.data.category,
          status: response.data.status,
          images: response.data.images.map(image => ({
            id: image.id,
            imagePath: image.imagePath,
          })),
        });
      } catch (err) {
        setError('Failed to fetch product.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'status' ? value === 'true' : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleDeleteImage = (image) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== image.id),
    }));
    setImagesToDelete((prev) => [...prev, image.id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const productData = {
        name: product.name,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
        dateAdded: product.dateAdded,
        author: product.author,
        description: product.description,
        content: product.content,
        language: product.language,
        category: product.category,
        status: product.status,
      };
      await axios.put(`http://localhost:6868/api/products/${id}`, productData);
      for (const imageId of imagesToDelete) {
        await axios.delete(`http://localhost:6868/api/products/${imageId}/images`);
      }
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((image) => formData.append('images', image));
        formData.append('productId', id);
        await axios.post(`http://localhost:6868/api/products/${id}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/admin/productlist'), 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to update product.');
    }
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:6868/api/products/${id}`);
      navigate('/admin/productlist');
    } catch (err) {
      setError('Failed to delete product.');
    }
    setOpenDeleteModal(false);
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: 'url(https://obi.vn/wp-content/uploads/2023/02/top-50-y-tuong-hinh-nen-trang-dep-tinh-khoi-cuc-ky-doc-dao_1.jpg)', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'rgba(227, 244, 251, 0.5)' }}></div>
        <Box sx={{ flexGrow: 1, padding: 5 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom color="#0c4646">EDIT PRODUCT FORM</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <Button type="submit" variant="contained" color="success" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }}>CONFIRM</Button>
            <Button variant="contained" color="primary" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }} onClick={() => navigate('/admin/productlist')}>CANCEL</Button>
            <Button variant="contained" color="error" sx={{ paddingY: 1.5, fontSize: '16px', margin: 3 }} onClick={handleDelete}>DELETE</Button>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center">
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Product Name" name="name" value={product.name} onChange={handleChange} required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Price" name="price" value={product.price} onChange={handleChange} type="number" required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Quantity" name="quantity" value={product.quantity} onChange={handleChange} type="number" required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Date Added"
                  name="dateAdded"
                  value={product.dateAdded}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Author" name="author" value={product.author} onChange={handleChange} required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Description" name="description" value={product.description} onChange={handleChange} multiline rows={2} required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Content" name="content" value={product.content} onChange={handleChange} multiline rows={2} required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Language" name="language" value={product.language} onChange={handleChange} required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField fullWidth label="Category" name="category" value={product.category} onChange={handleChange} required />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 5, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center" sx={{ padding: '30px' }}>
              <Grid item xs={12}>
                <input accept="image/*" style={{ display: 'none' }} id="upload-images" multiple type="file" onChange={handleImageChange} />
                <label htmlFor="upload-images">
                  <Button variant="contained" color="primary" component="span">Upload New Images</Button>
                </label>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  {product.images.map((img, index) => (
                    <div key={img.id}>
                      <img
                        src={`http://localhost:6868${img.imagePath}`}
                        alt={`Product ${index}`}
                        style={{ width: 150, height: 150, objectFit: 'cover' }}
                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteImage(img)}
                      >
                        x
                      </Button>
                    </div>
                  ))}
                  {newImages.length > 0 &&
                    newImages.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        style={{ width: 150, height: 150, objectFit: 'cover' }}
                      />
                    ))}
                </Box>
              </Grid>
            </Grid>
          </form>
          <ConfirmDeleteModal
            open={openDeleteModal}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            productName={product.name}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default EditProduct;