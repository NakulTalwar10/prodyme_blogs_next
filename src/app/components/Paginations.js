import * as React from 'react';
import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


const CustomPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-icon': {
    color: theme.palette.primary.main, 
  },
}));

const Paginations = ({ postsPerPage, totalCategories, paginate }) => {
  const pageCount = Math.ceil(totalCategories / postsPerPage);

  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Pagination
      variant="outlined" color="primary"
        count={pageCount}
        
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default Paginations;
