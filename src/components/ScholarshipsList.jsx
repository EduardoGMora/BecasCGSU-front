import { useEffect, useState } from 'react';
import api from '../api/axios';
import { ScholarshipCard } from './ScholarshipCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ScholarshipsList = ({ viewType, filters, handleApply }) => {
    const [scholarships, setScholarships] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentOffset, setCurrentOffset] = useState(0);

    useEffect(() => {
        const fetchScholarships = async() => {
            try{
                setLoading(true);
                setCurrentOffset(0); // Reset offset when filters change
                
                // Build query parameters
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
                // Always start from offset 0 when filters change
                params.append('offset', 0);
                
                const queryString = params.toString();
                const url = queryString ? `/scholarships?${queryString}` : '/scholarships';
                
                const response = await api.get(url);
                setScholarships(response.data.data); // Replace scholarships
                setTotalCount(response.data.total || response.data.count);
            } catch (err) {
                console.error("Error conectando al backend -> ", err);
                setError("No se pudo cargar las becas");
            } finally {
                setLoading(false);
            }
        }
        fetchScholarships();
    }, [filters]);

    const loadMore = async () => {
        try {
            setLoadingMore(true);
            const newOffset = currentOffset + (filters?.limit || 9);
            
            // Build query parameters
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
            params.append('offset', newOffset);
            
            const queryString = params.toString();
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

    if (loading) return <p className="text-center py-8 text-gray-600">Cargando becas de la UDG...</p>;
    if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

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