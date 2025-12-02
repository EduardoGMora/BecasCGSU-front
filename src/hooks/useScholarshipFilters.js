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
        // Fetch scholarship types
        const typesResponse = await api.get('/scholarship-types');
        if (typesResponse.data?.data) {
          setScholarshipTypes(typesResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching scholarship types:', error);
        setScholarshipTypes([]);
      }

      try {
        // Fetch university centers
        const centersResponse = await api.get('/university-centers');
        if (centersResponse.data?.data) {
          setUniversityCenters(centersResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching university centers:', error);
        setUniversityCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { scholarshipTypes, universityCenters, loading };
};
