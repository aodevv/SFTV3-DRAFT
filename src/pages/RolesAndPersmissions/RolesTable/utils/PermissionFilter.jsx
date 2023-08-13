import { CiSearch } from 'react-icons/ci';

import './styles.scss';

const PermissionFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="permission-filter">
      <span>
        <CiSearch />
      </span>
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Seach permissions ..."
      />
    </div>
  );
};

export default PermissionFilter;
