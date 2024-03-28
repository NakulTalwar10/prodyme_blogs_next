import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Paginations = ({ postsPerPage, totalProducts, currentPage, paginate }) => {
  const [pageCount, setPageCount] = React.useState(1);
  React.useEffect(() => {
    let count = Math.ceil(totalProducts / postsPerPage);
    setPageCount(count);
  },[])
  

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      paginate(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleGoToPage = (event) => {
    let pageNumber = parseInt(event.target.value);

    if (!pageNumber || pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > pageCount) { 
      pageNumber = pageCount;
    }
    paginate(pageNumber);
  };

  const handleInputChange = (event) => {
    let pageNumber = parseInt(event.target.value);
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > pageCount) {
      pageNumber = pageCount;
    }
    paginate(pageNumber);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Button onClick={handlePreviousPage} className={`text-black text-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`} disabled={currentPage === 1}>
        <MdKeyboardArrowLeft />
      </Button>
      <Typography>
        <input type="number" min="1" max={pageCount} className='text-center' value={currentPage} onChange={handleInputChange} onBlur={handleGoToPage} />
        {' '} of {pageCount}
      </Typography>
      <Button onClick={handleNextPage} className={`text-black text-lg ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`} disabled={currentPage === pageCount}>
        <MdKeyboardArrowRight/>
      </Button>
    </Stack>
  );
};

export default Paginations;