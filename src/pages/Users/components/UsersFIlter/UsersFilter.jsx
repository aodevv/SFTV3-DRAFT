import { useEffect } from 'react';
import Select from 'react-select';

import Search from '@core/Search/Search';
import { customStyles } from '@core/Select/selectStyles';
import DateRangePicker from '@core/DateRangePicker/DateRangePicker';
import AddBtn from '@core/AddBtn/AddBtn';

const UsersFilter = ({
  setUserName,
  setSelectedRole,
  selectedRole,
  setDateRange,
  userName,
  dateRange,
  setModal,
  filterUsers,
  roles,
}) => {
  const handleRoleSelect = (selectedOptions) => {
    setSelectedRole(selectedOptions);
  };

  useEffect(() => {
    filterUsers();
  }, [dateRange, userName, selectedRole]);

  return (
    <div className="users-page__header-controls">
      <Search
        placeholder="Search users..."
        value={userName}
        handleChange={(e) => setUserName(e.target.value)}
      />
      <DateRangePicker
        placeholder="Filter by dates"
        setDateRange={setDateRange}
      />
      <Select
        isClearable
        maxMenuHeight={200}
        options={roles}
        placeholder="Select role"
        value={selectedRole}
        onChange={(selectedOptions) => handleRoleSelect(selectedOptions)}
        className="table-select"
        classNamePrefix="react-select"
        styles={customStyles}
        getOptionValue={(option) => option.value}
      />
      <AddBtn
        title="Add new"
        handleClick={() =>
          setModal({
            show: true,
            edit: false,
            user: null,
          })
        }
      />
    </div>
  );
};

export default UsersFilter;
