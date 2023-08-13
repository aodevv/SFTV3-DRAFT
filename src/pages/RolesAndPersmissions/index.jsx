import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';

import RolesTable from './RolesTable/RolesTable';
import RolesRequest from './RolesRequest/RolesRequest';
import { TableContextProvider } from './RolesTable/RolesTableContext';
import './styles.scss';
import { fetchPermissions } from '../../redux/rolesSlice/rolesSlice';

const RolesAndPermissions = () => {
  const [multiDelete, setMultiDelete] = useState(false);

  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const tableContainer = useRef(null);

  const defaultGroupBy = useMemo(
    () => ['main_group'], // Replace 'columnName' with the actual column you want to group by
    []
  );
  const [tableState, setTableState] = useState({ groupBy: defaultGroupBy });

  const scrollToRight = () => {
    if (tableContainer.current) {
      // tableContainer.current.scrollLeft += 1000; // Adjust the scroll distance as needed
    }
  };

  useEffect(() => {
    if (!role.fetched) {
      dispatch(fetchPermissions());
    }
  }, [role.fetched]);

  return (
    <TableContextProvider>
      <div className="roles-permissions">
        <div className="roles-permissions__header">
          <p>Roles infos</p>
          <RolesRequest
            name="Oussama AIMARAH"
            role="Admin"
            date="2023-07-02T14:25:06+0000"
            setMultiDelete={setMultiDelete}
          />
        </div>
        {role.loading && <h1>Loading ...</h1>}
        {!role.loading && role.permissions.length > 0 && (
          <div
            ref={tableContainer}
            className="roles-permissions__table custom-scrollbar"
          >
            <RolesTable
              scrollToRight={scrollToRight}
              permissionsData={role.permissions}
              tableState={tableState}
              setTableState={setTableState}
              defaultGroupBy={defaultGroupBy}
              multiDelete={multiDelete}
              setMultiDelete={setMultiDelete}
            />
          </div>
        )}
      </div>
    </TableContextProvider>
  );
};

export default RolesAndPermissions;
