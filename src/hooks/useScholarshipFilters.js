import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useScholarshipFilters = () => {
  const [scholarshipTypes, setScholarshipTypes] = useState([]);
  const [universityCenters, setUniversityCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      
      try {
        // Fetch both in parallel using Promise.all
        const [typesResponse, centersResponse] = await Promise.all([
          api.get('/scholarship-types').catch(err => {
            console.error('Error fetching scholarship types:', err);
            return { data: { data: [] } };
          }),
          api.get('/university-centers').catch(err => {
            console.error('Error fetching university centers:', err);
            return { data: { data: [] } };
          })
        ]);

        setScholarshipTypes(typesResponse.data?.data || []);
        setUniversityCenters(centersResponse.data?.data || []);
      } catch (error) {
        console.error('Unexpected error fetching filter options:', error);
        setScholarshipTypes([]);
        setUniversityCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { scholarshipTypes, universityCenters, loading };
};
