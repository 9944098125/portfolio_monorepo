import qs from 'qs';
import { Location } from 'react-router-dom';

// Get current query parameters
export const getCurrentParams = (search: string) => {
  return qs.parse(search, { ignoreQueryPrefix: true });
};

// Update query parameters and remove the 'handled' parameter if it exists
export const updateQueryParams = (
  search: string,
  newParams: Record<string, any>,
) => {
  const currentParams = getCurrentParams(search);

  // Remove the 'handled' parameter
  if (currentParams.hasOwnProperty('handled')) {
    delete currentParams['handled'];
  }

  // Merge the remaining parameters with the new parameters
  const updatedParams = { ...currentParams, ...newParams };

  // Return the updated query string
  return qs.stringify(updatedParams, {
    arrayFormat: 'brackets',
    encode: false,
  });
};
