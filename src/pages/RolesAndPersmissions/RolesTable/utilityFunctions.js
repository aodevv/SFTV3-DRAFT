export const addColumnWrapper = (
  tableData,
  setTableData,
  setAddPending,
  scrollToRight
) => {
  const addColumn = async (id, index) => {
    // const temp = [...tableData];
    console.log(index);
    const temp = Array.from(tableData);
    console.log(id);
    const newTableData = temp.map((el) => {
      const newRoles = Array.from(el.roles);
      const newRole = {
        id: `role${Math.random() * Math.random()}`,
        name: 'pending',
        status: false,
        index: index,
      };
      newRoles.splice(id, 0, newRole);
      return {
        ...el,
        roles: newRoles,
      };
    });
    await setTableData(newTableData);
    await setAddPending(true);
    scrollToRight();
  };

  return addColumn;
};

export const duplicateColumnWrapper = (
  tableData,
  setTableData,
  setActiveHeader
) => {
  const duplicateColumn = (id, name) => {
    const temp = [...tableData];
    const newTableData = temp.map((el) => {
      el.roles.splice(id + 1, 0, {
        id: `role${Math.random() * Math.random()}`,
        name: `${name} duplicated`,
        status: false,
      });
      return {
        ...el,
      };
    });
    setTableData(newTableData);
    setActiveHeader({
      id: null,
      active: false,
    });
  };

  return duplicateColumn;
};

export const removeColumnWrapper = (tableData, setTableData, setAddPending) => {
  const removeColumn = (id) => {
    const temp = [...tableData];
    const newTableData = temp.map((el) => {
      const filteredRoles = el.roles.filter((role) => role.id !== id);
      return {
        ...el,
        roles: filteredRoles,
      };
    });
    setTableData(newTableData);

    setTimeout(() => {
      setAddPending(false);
    }, 500);
  };

  return removeColumn;
};

export const updateColumnNameWrapper = (
  tableData,
  setTableData,
  setAddPending
) => {
  const updateColumnName = (id, name) => {
    const temp = [...tableData];
    const newTableData = temp.map((el) => {
      const updatedRoles = el.roles.map((role) =>
        role.id === id ? { ...role, name } : role
      );
      return {
        ...el,
        roles: updatedRoles,
      };
    });
    setTableData(newTableData);

    setTimeout(() => {
      setAddPending(false);
    }, 500);
  };

  return updateColumnName;
};
