import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const Filter = () => {
    return (
        <div style={{marginBottom: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', padding: '1rem 0', zIndex: 10, color: '#333'}}>
            <label htmlFor="filter" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                <FilterAltIcon />
                Filter Employees
            </label>
            <select id="filter" name="filter" style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff'}}>
                <option value="all">All Teams</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
            </select>
        </div>
    )
}