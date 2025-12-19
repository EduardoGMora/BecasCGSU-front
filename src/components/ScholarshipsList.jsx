import { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import { ScholarshipCard } from './ScholarshipCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ERROR_MESSAGES } from '../constants';
import PropTypes from 'prop-types';

/**
 * Scholarships List Component
 * Displays a list of scholarships with pagination
 * @param {Object} props
 * @param {string} props.viewType - Display type ('list' or 'grid')
 * @param {Object} props.filters - Active filters
 * @param {Function} props.handleApply - Callback when apply button is clicked
 */
export const ScholarshipsList = ({ viewType, filters, handleApply }) => {
    const [scholarships, setScholarships] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentOffset, setCurrentOffset] = useState(0);

    // Helper function to build query parameters
    const buildQueryParams = useCallback((offset = 0) => {
        const params = new URLSearchParams();
        
        if (filters?.status) {
            params.append('status', filters.status);
        }
        if (filters?.scholarship_type_id) {
            params.append('scholarship_type_id', filters.scholarship_type_id);
        }
        if (filters?.university_center_id) {
            params.append('university_center_id', filters.university_center_id);
        }
        if (filters?.search) {
            params.append('search', filters.search);
        }
        if (filters?.limit) {
            params.append('limit', filters.limit);
        }
        params.append('offset', offset);
        
        return params.toString();
    }, [filters]);

    useEffect(() => {
        const fetchScholarships = async() => {
            try{
                setLoading(true);
                setCurrentOffset(0); // Reset offset when filters change
                
                const queryString = buildQueryParams(0);
                const url = queryString ? `/scholarships?${queryString}` : '/scholarships';
                
                console.log('Fetching URL:', url);
                const response = await api.get(url);
                console.log('Response:', response.data);
                
                // Ensure we have an array
                const scholarshipsData = response.data?.data;
                if (!Array.isArray(scholarshipsData)) {
                    console.error('Expected array but got:', typeof scholarshipsData, scholarshipsData);
                    setScholarships([]);
                    setError('Formato de datos incorrecto');
                    return;
                }
                
                setScholarships(scholarshipsData);
                setTotalCount(response.data.total || response.data.count || scholarshipsData.length);
                setError(null);
            } catch (err) {
                console.error("Error conectando al backend -> ", err);
                const errorMessage = err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR;
                setError(errorMessage);
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        }
        fetchScholarships();
    }, [filters, buildQueryParams]);

    const loadMore = async () => {
        try {
            setLoadingMore(true);
            const newOffset = currentOffset + (filters?.limit || 9);
            
            const queryString = buildQueryParams(newOffset);
            const url = `/scholarships?${queryString}`;
            
            const response = await api.get(url);
            setScholarships(prev => [...prev, ...response.data.data]); // Append new scholarships
            setCurrentOffset(newOffset);
            setTotalCount(response.data.total || response.data.count);
        } catch (err) {
            console.error("Error loading more scholarships -> ", err);
        } finally {
            setLoadingMore(false);
        }
    };

    const hasMore = scholarships.length < totalCount;

    if (loading && scholarships.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando becas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" className="text-red-500 text-3xl mb-3" />
                <p className="text-red-700 font-semibold mb-2">{ERROR_MESSAGES.LOAD_ERROR}</p>
                <p className="text-red-600 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Mostrando {scholarships.length} de {totalCount} becas
            </div>
            <div className={` ${viewType === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}`}>
                {scholarships.length > 0 ? (
                    scholarships.map((scholarship) => (
                        <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={handleApply}  />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No se encontraron becas con los filtros seleccionados
                    </div>
                )}
            </div>
            
            {hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loadingMore ? (
                            <>
                                <FontAwesomeIcon icon="fa-solid fa-spinner" className="mr-2 animate-spin" />
                                Cargando...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-down" className="mr-2" />
                                Cargar más becas
                            </>
                        )}
                    </button>
                </div>
            )}
        </>
    );
}

ScholarshipsList.propTypes = {
    scholarships: PropTypes.array.isRequired,
    filters: PropTypes.shape({
        status: PropTypes.string,
        category: PropTypes.string,
        search: PropTypes.string,
    }).isRequired,
};
