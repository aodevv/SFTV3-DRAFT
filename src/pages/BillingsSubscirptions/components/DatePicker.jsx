import DateRangePicker from '@core/DateRangePicker/DateRangePicker';


const DatePicker = ({
    setDateRange,
    setSelectedRole
  }) => {
    // eslint-disable-next-line no-unused-vars
    const handleRoleSelect = (selectedOptions) => {
      setSelectedRole(selectedOptions);
    };

    return (
        <div className="users-page__header-controls">
          <DateRangePicker
            placeholder="Select Date"
            setDateRange={setDateRange}
          />
          </div>
    )}

    export default DatePicker;