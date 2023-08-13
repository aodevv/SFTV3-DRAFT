import Search from '@core/Search/Search';


const searchBox = ({
    setUserName,
    setSelectedRole,
    userName,
  }) => {
    // eslint-disable-next-line no-unused-vars
    const handleRoleSelect = (selectedOptions) => {
      setSelectedRole(selectedOptions);
    };


    return (
        <div className="users-page__header-controls">
          <Search
            placeholder="Search invoice..."
            value={userName}
            handleChange={(e) => setUserName(e.target.value)}
          />
          </div>
    )

}

export default searchBox