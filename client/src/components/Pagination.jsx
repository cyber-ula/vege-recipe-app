import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom';

import { getRecipes } from '../actions/recipes';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();


  useEffect(() => {
    if (page) {
      dispatch(getRecipes(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/recipes?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;