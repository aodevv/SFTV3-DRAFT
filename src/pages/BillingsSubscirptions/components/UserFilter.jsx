/* eslint-disable no-unused-vars */
import Select from 'react-select';
import { customStyles } from '@core/Select/selectStyles';
import Search from '@core/Search/Search';
import DateRangePicker from '@core/DateRangePicker/DateRangePicker';

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
    isClearable,
    isMulti,
    placeholder,
    options,
    defaultValue
  }) => {
    const handleRoleSelect = (selectedOptions) => {
      setSelectedRole(selectedOptions);
    };

    const customStyles = {
      control: (provided) => ({
        ...provided,
        width: 152, // set the desired width here
      }),
    };
    


    return (
        
        <div>
             <Select
                  isMulti={isMulti}
                 defaultValue={defaultValue}
                 isClearable={isClearable}
                 maxMenuHeight={207}
                 options={options}
                 placeholder={placeholder}
                 value={selectedRole}
                 onChange={onchange}
                 className="table-select"
                 classNamePrefix="react-select"
                 styles={customStyles}
                 getOptionValue={(option) => option.value}
             />
        </div>
    )
  }
export default UsersFilter;