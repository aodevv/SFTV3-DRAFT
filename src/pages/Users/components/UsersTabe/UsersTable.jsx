import { useMemo, useState } from 'react';
import { ImArrowDown2, ImArrowUp2 } from 'react-icons/im';
import { useSortBy, useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';

import { columnsDefinition } from './columns';
import DeleteModal from '@common/DeleteModal/DeleteModal';
import './UsersTable.scss';
import { AnimatePresence } from 'framer-motion';
import { deleteUser } from '../../../../redux/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const UsersTable = ({ setUserToEdit, users_data, setAllowScroll }) => {
  const data = useMemo(() => users_data, [users_data]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState('');
  const deleting = useSelector((state) => state.user.deleting);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCellClick = (cell) => {
    const {
      column: { id },
      row: { original },
    } = cell;
    if (id !== 'status' && id !== 'control') {
      navigate(`/users/${original.id}`);
    }
  };

  const deleteUserHandler = () => {
    const { id } = userToDelete;
    var formdata = new FormData();
    formdata.append('ids[0]', id);
    dispatch(deleteUser(formdata));
  };

  const columnsArray = columnsDefinition(
    setAllowScroll,
    setUserToDelete,
    setDeleteModal,
    setUserToEdit
  );

  const columns = useMemo(() => columnsArray, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { sortBy: [{ id: 'subscription', desc: true }] },
      },
      useSortBy
    );
  return (
    <>
      <table {...getTableProps()} className={`users-table `}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                //className={`th-${id}`}

                // eslint-disable-next-line react/jsx-key
                <th
                  {...column.getHeaderProps(
                    column.canSort && column.getSortByToggleProps()
                  )}
                >
                  {column.render('Header')}{' '}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="table-arrow">
                          <ImArrowUp2 />
                        </i>
                      ) : (
                        <i className="table-arrow">
                          <ImArrowDown2 />
                        </i>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const {
                    column: { id },
                  } = cell;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      onClick={() => handleCellClick(cell)}
                      className={id.toLowerCase()}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <AnimatePresence initial={false} mode="wait">
        {deleteModal && (
          <DeleteModal
            entity={`${userToDelete.first_name}`}
            type="User"
            modal={deleteModal}
            // setToast={setToast}
            loader={deleting}
            closeModal={() => setDeleteModal(false)}
            deleteHandler={deleteUserHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UsersTable;
