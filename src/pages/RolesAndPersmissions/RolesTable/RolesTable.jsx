/* eslint-disable react/jsx-key */
import { useRef, useEffect, useState, useMemo, useContext } from 'react';
import { useExpanded, useGroupBy, useTable, useFilters } from 'react-table';
import { BiChevronDown } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

// import { mockData } from './data';
import { columnsDefinition } from './columns';
import AddColumnContainer from './utils/AddColumnContainer';
import DeleteModal from '@common/DeleteModal/DeleteModal';
import {
  addColumnWrapper,
  removeColumnWrapper,
  updateColumnNameWrapper,
  duplicateColumnWrapper,
} from './utilityFunctions';
import './RolesTable.scss';
import TableContext from './RolesTableContext';
import ToolTip from '../../../common/@core/ToolTip/ToolTip';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole } from '../../../redux/rolesSlice/rolesSlice';

const RolesTable = ({
  permissionsData,
  scrollToRight,
  setTableState,
  tableState,
  multiDelete,
  setMultiDelete,
}) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(permissionsData);
  const [deleteModal, setDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const { setCheckedRoles, checkedRoles } = useContext(TableContext);

  const [addPending, setAddPending] = useState(false);
  const data = useMemo(() => tableData, [tableData]);
  const [tableHeight, setTableHeight] = useState(0);
  const [activeHeader, setActiveHeader] = useState({
    id: null,
    active: false,
  });

  const deleting = useSelector((state) => state.role.deleting);

  const tableRef = useRef(null);

  const removeColumn = removeColumnWrapper(
    tableData,
    setTableData,
    setAddPending
  );

  const updateColumnName = updateColumnNameWrapper(
    tableData,
    setTableData,
    setAddPending
  );

  const duplicateColumn = duplicateColumnWrapper(
    tableData,
    setTableData,
    setActiveHeader
  );

  const [tableColumns, setTableColumns] = useState(
    columnsDefinition(
      permissionsData[0],
      removeColumn,
      updateColumnName,
      duplicateColumn,
      setRoleToDelete,
      setDeleteModal
    )
  );

  const columns = useMemo(() => tableColumns, [tableColumns]);

  // const defaultGroupBy = useMemo(
  //   () => ['main_group'], // Replace 'columnName' with the actual column you want to group by
  //   []
  // );
  // const [tableState, setTableState] = useState({ groupBy: defaultGroupBy });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: tableState,
    },
    useFilters,
    useGroupBy,
    useExpanded
  );

  const addColumn = addColumnWrapper(
    tableData,
    setTableData,
    setAddPending,
    scrollToRight
  );

  const handleHeaderHover = (id, event) => {
    if (
      event.target.classList.contains('add-column-container') ||
      event.target.classList.contains('column-header') ||
      event.target.tagName === 'TH'
    )
      setActiveHeader({
        id,
        active: true,
      });
  };

  const handleHeaderExit = () => {
    setActiveHeader({
      id: null,
      active: false,
    });
  };

  const deleteRoleHandler = () => {
    if (multiDelete) {
      const ids = checkedRoles
        .filter((role) => role.checked)
        .map((role) => role.id);
      dispatch(deleteRole(ids));
    } else {
      // removeColumn(roleToDelete.id);
      dispatch(deleteRole([roleToDelete.id]));
    }
    // setDeleteModal(false);
  };

  useEffect(() => {
    if (multiDelete) {
      setDeleteModal(true);
    }
  }, [multiDelete]);

  useEffect(() => {
    const tableCoords = tableRef.current.getBoundingClientRect();
    const { height } = tableCoords;
    setTableHeight(height);
    setTableState(state);
  }, [state]);

  useEffect(() => {
    setTableColumns(
      columnsDefinition(
        tableData[0],
        removeColumn,
        updateColumnName,
        duplicateColumn,
        setRoleToDelete,
        setDeleteModal
      )
    );
    const roles = tableData[0].roles;
    setCheckedRoles((prev) => {
      const existingRoles = prev.map((el) => el.id);
      if (roles.length < existingRoles.length) {
        console.log('deleting');
        const newRoles = roles.map((el) => el.id);
        const difference = [
          ...newRoles.filter((element) => !existingRoles.includes(element)),
          ...existingRoles.filter((element) => !newRoles.includes(element)),
        ];
        console.log(difference);
        return prev.filter((el) => !difference.includes(el.id));
      }
      const [newRole] = roles.filter(
        (role) => !existingRoles.includes(role.id)
      );
      return newRole ? [...prev, { id: newRole.id, checked: false }] : prev;
    });
  }, [tableData]);

  useEffect(() => {
    if (deleteModal || checkedRoles)
      setActiveHeader({
        id: null,
        active: false,
      });
  }, [deleteModal, checkedRoles]);

  useEffect(() => {
    const roles = permissionsData[0].roles;
    setCheckedRoles(roles.map((role) => ({ id: role.id, checked: false })));
  }, []);

  return (
    <>
      <table ref={tableRef} {...getTableProps()} className="roles-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <th
                  onMouseEnter={(event) => handleHeaderHover(id, event)}
                  onMouseLeave={handleHeaderExit}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}

                  {column.filterable ? (
                    column.render('Filter')
                  ) : (
                    <AddColumnContainer
                      id={id}
                      hide={addPending || deleteModal}
                      activeHeader={activeHeader}
                      tableHeight={tableHeight}
                      addColumn={() => {
                        addColumn(id, column.index);
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className={classNames({
                  isExpanded: row.isExpanded,
                  isRowGrouped: row.isGrouped,
                })}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className={classNames({
                      isGrouped: cell.isGrouped,

                      isPlaceholder: !cell.isAggregated && cell.isPlaceholder,
                      isData:
                        !cell.isAggregated &&
                        !cell.isPlaceholder &&
                        !cell.isGrouped,
                    })}
                    {...cell.getCellProps()}
                  >
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <div
                          className="left"
                          {...row.getToggleRowExpandedProps()}
                        >
                          <span
                            className={classNames('group', {
                              'not-expanded': !row.isExpanded,
                            })}
                          >
                            <BiChevronDown />
                          </span>{' '}
                          {cell.render('Cell')}
                        </div>
                        <div className="subwrows-length">
                          {row.subRows.length}
                        </div>
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? (
                      <div>
                        <span>{row.original.name}</span>
                        <ToolTip desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                      </div> // For cells with repeated values, render null
                    ) : (
                      // Otherwise, just render the regular cell
                      <>{cell.render('Cell')}</>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <AnimatePresence initial={false} mode="wait">
        {deleteModal && (
          <DeleteModal
            entity={`${multiDelete ? 'Selected Roles' : roleToDelete.name}`}
            type={multiDelete ? 'Roles' : 'Role'}
            modal={deleteModal}
            // setToast={setToast}
            confirmationMessages={[
              'Users currently assigned to this role will lose the access and permissions granted by this role. This may limit their ability to perform certain tasks or access certain sections of the application.',
              'Tasks previously performed by users with this role may need to be reassigned.',
            ]}
            loader={deleting}
            closeModal={() => {
              setMultiDelete(false);
              setDeleteModal(false);
            }}
            deleteHandler={deleteRoleHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RolesTable;
