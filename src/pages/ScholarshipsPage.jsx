import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeroCard } from '../components/HeroCard';
import { ScholarshipsList } from '../components/ScholarshipsList';
import { SearchBar } from '../components/SearchBar';
import { ScholarshipFilters } from '../components/ScholarshipFilters';
import { ViewToggle } from '../components/ViewToggle';
import { useScholarshipFilters } from '../hooks/useScholarshipFilters';

/**
 * ScholarshipsPage component to display and filter scholarships
 * @returns {JSX.Element} ScholarshipsPage component
 */
export function ScholarshipsPage() {
  const { handleApply } = useOutletContext();
  const [viewType, setViewType] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch filter options from custom hook
  const { scholarshipTypes, universityCenters, loading } = useScholarshipFilters();
  
  // Temporary filter state (before applying)
  const [tempFilterState, setTempFilterState] = useState({
    status: null,
    scholarship_type_id: null,
    university_center_id: null
  });
  
  // Applied filter state (sent to API)
  const [filterState, setFilterState] = useState({
    status: null,
    scholarship_type_id: null,
    university_center_id: null,
    search: null,
    limit: 9
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Update temp filter state (not applied yet)
    setTempFilterState((prev) => ({
      ...prev,
      [name]: value === "Todas" || value === "" ? null : value,
    }));
  };

  const handleSearch = () => {
    setFilterState((prev) => ({
      ...prev,
      search: searchTerm || null
    }));
  };

  const applyFilters = () => {
    // Apply the temporary filters to the actual filter state
    setFilterState((prev) => ({
      ...prev,
      status: tempFilterState.status,
      scholarship_type_id: tempFilterState.scholarship_type_id,
      university_center_id: tempFilterState.university_center_id
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    const clearedFilters = {
      status: null,
      scholarship_type_id: null,
      university_center_id: null
    };
    setTempFilterState(clearedFilters);
    setFilterState({
      ...clearedFilters,
      search: null,
      limit: 9
    });
  };

  return (
    <>
      <HeroCard 
        title="Becas Disponibles"
        subtitle="Explora todas las oportunidades de financiamiento disponibles para tu educación."
      >
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </HeroCard>

      <ScholarshipFilters
        filterState={tempFilterState}
        scholarshipTypes={scholarshipTypes}
        universityCenters={universityCenters}
        onFilterChange={handleFilterChange}
        onApply={applyFilters}
        onClear={clearFilters}
        loading={loading}
      />

      <ViewToggle 
        viewType={viewType}
        onViewChange={setViewType}
      />

      <ScholarshipsList 
        viewType={viewType} 
        filters={filterState} 
        handleApply={handleApply} 
      />
    </>
  );
}
