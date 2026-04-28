import { useEffect, useState, useCallback, useMemo } from 'react';
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

    const parseListResponse = useCallback((payload) => {
        if (Array.isArray(payload)) {
            return { items: payload, total: payload.length };
        }

        const items =
            (Array.isArray(payload?.data) && payload.data) ||
            (Array.isArray(payload?.items) && payload.items) ||
            (Array.isArray(payload?.results) && payload.results) ||
            (Array.isArray(payload?.scholarships) && payload.scholarships) ||
            null;

        const total =
            payload?.total ??
            payload?.count ??
            payload?.total_count ??
            payload?.totalCount ??
            (Array.isArray(items) ? items.length : 0);

        return { items, total };
    }, []);

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

    const filterKey = useMemo(() => {
        const status = filters?.status ?? '';
        const scholarshipTypeId = filters?.scholarship_type_id ?? '';
        const universityCenterId = filters?.university_center_id ?? '';
        const search = filters?.search ?? '';
        const limit = filters?.limit ?? '';
        return [status, scholarshipTypeId, universityCenterId, search, limit].join('|');
    }, [
        filters?.status,
        filters?.scholarship_type_id,
        filters?.university_center_id,
        filters?.search,
        filters?.limit,
    ]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchScholarships = async () => {
            try{
                setLoading(true);
                setCurrentOffset(0); // Reset offset when filters change
                
                const queryString = buildQueryParams(0);
                const url = queryString ? `/scholarships?${queryString}` : '/scholarships';
                
                console.log('Fetching URL:', url);
                const response = await api.get(url, { signal: controller.signal });
                console.log('Response:', response.data);
                
                const { items, total } = parseListResponse(response.data);
                if (!Array.isArray(items)) {
                    console.error('Unexpected scholarships payload:', response.data);
                    setScholarships([]);
                    setTotalCount(0);
                    setError('Formato de datos incorrecto');
                    return;
                }
                
                setScholarships(items);
                setTotalCount(total);
                setError(null);
            } catch (err) {
                if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') {
                    return;
                }
                console.error("Error conectando al backend -> ", err);
                const errorMessage = err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR;
                setError(errorMessage);
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        }
        fetchScholarships();

        return () => controller.abort();
    }, [filterKey, buildQueryParams, parseListResponse]);

    const loadMore = async () => {
        try {
            setLoadingMore(true);
            const newOffset = currentOffset + (filters?.limit || 9);
            
            const queryString = buildQueryParams(newOffset);
            const url = `/scholarships?${queryString}`;
            
            const response = await api.get(url);
            const { items, total } = parseListResponse(response.data);
            if (!Array.isArray(items)) {
                console.error('Unexpected scholarships payload (loadMore):', response.data);
                return;
            }
            setScholarships(prev => [...prev, ...items]); // Append new scholarships
            setCurrentOffset(newOffset);
            setTotalCount(total);
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
                    <p className="text-gray-800">Cargando becas...</p>
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
            <div className="mb-4 text-sm text-gray-800">
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
                        className="px-6 py-3 bg-primary-slate text-white rounded-lg font-semibold hover:bg-primary-slate2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
    viewType: PropTypes.oneOf(['list', 'grid']),
    filters: PropTypes.object,
    handleApply: PropTypes.func.isRequired,
}