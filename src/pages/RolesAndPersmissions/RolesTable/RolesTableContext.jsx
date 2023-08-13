import { useState, createContext, useEffect } from 'react';

const TableContext = createContext();

export const TableContextProvider = ({ children }) => {
  const [checkedRoles, setCheckedRoles] = useState([]);
  const [allRolesUnchecked, setAllRolesUnchecked] = useState(false);

  useEffect(() => {
    const checkedCount = checkedRoles?.reduce((acc, item) => {
      if (item.checked) return acc + 1;
      else return acc + 0;
    }, 0);

    if (checkedCount > 0) {
      setAllRolesUnchecked(false);
    } else {
      setAllRolesUnchecked(true);
    }
  }, [checkedRoles]);

  return (
    <TableContext.Provider
      value={{ setCheckedRoles, checkedRoles, allRolesUnchecked }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
