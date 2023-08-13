import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
// import { MdOutlineImageNotSupported } from "react-icons/md";
import { ImArrowUp2, ImArrowDown2 } from 'react-icons/im';
import dayjs from 'dayjs';
import { AnimatePresence } from 'framer-motion';

import Worker from '../../Worker/Worker';
import WTToggle from './WTToggle';
import ColumnToggle from '../../ColumnToggle/ColumnToggle';
import WorkerActions from './utils/WorkerActions';
import CompanyImg from './CompanyImg';
import { phoneFormatter } from '../../@core/utils/functions';
import siteIcon from '../../../assets/icons/site.svg';
import DeleteModal from '../../DeleteModal/DeleteModal';

//import { clients_data } from "./tableData";

import './ClientsTable.scss';
// import { deleteClient } from '../../../redux/clientSlice/clientSlice';

const ClientsTable = ({ setAllowScroll, clients_data, setModal, toast }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(false);

  const deleting = false;

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const deleteClientHandler = () => {
    const { id } = clientToDelete;
    // dispatch(deleteClient(id));
    console.log(id);
  };

  const data = useMemo(() => clients_data, [clients_data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: (row, index) => index,
        disableSortBy: true,
        id: 'id',
      },
      {
        Header: 'Subscription',
        accessor: 'subscription',
        id: 'subscription',
        canSort: true,
        Cell: ({ row }) => {
          const date = row.original.preference?.date_subscription;
          return <p>{date ? dayjs(date).format('DD/MM/YYYY') : 'N/A'}</p>;
        },
      },
      {
        Header: 'Client',
        accessor: 'client',
        disableSortBy: true,
        id: 'company',
        Cell: ({ row }) => {
          const { logo } = row.original;
          return <CompanyImg imgUrl={logo} />;
        },
      },
      {
        Header: 'Contact person',
        accessor: 'contact_person',
        id: 'contact_person',
        disableSortBy: true,
        Cell: ({ row }) => {
          //   const { original } = row;
          //   const { firstname, lastname, picture_url, function: fct } = original;
          // contactPerson: { name: "Sly", img: "blaise.png", position: "Manager" },
          const {
            first_name = null,
            last_name = null,
            profile_photo = null,
          } = row.original.contacts?.length ? row.original.contacts[0] : {};
          return (
            <Worker
              wideWorker
              worker={{
                name: `${first_name !== null ? first_name : ''} ${
                  last_name?.toUpperCase() !== undefined
                    ? last_name?.toUpperCase()
                    : ''
                }`,
                img: profile_photo,
                position: null,
              }}
              centered={false}
            />
          );
        },
      },
      {
        Header: 'Sites',
        accessor: 'sites',
        id: 'sites',
        disableSortBy: true,
        Cell: ({ row }) => {
          const { original } = row;
          return (
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className="table-sites"
              onClick={() => navigate(`/clients/${original.id}/sites`)}
            >
              <span
                style={{ marginRight: '10px' }}
                className="table-sites__icon"
              >
                <img src={siteIcon} alt="siteicon" />
              </span>
              {`${original?.sites_count} Sites`}
            </div>
          );
        },
      },
      {
        Header: 'Subscription Type',
        accessor: 'subscription_type',
        id: 'subscription_type',
        disableSortBy: true,
        Cell: ({ row }) => {
          const { original } = row;
          return (
            <div
              className={`subscription_type-text ${
                !original.preference?.subscription && 'missing_subscription'
              }`}
            >
              {original.preference?.subscription
                ? original.preference?.subscription?.type_subscription
                : 'N/A'}
            </div>
          );
        },
      },

      {
        Header: 'Next Bill',
        accessor: 'next_bill',
        id: 'next_bill',
        disableSortBy: true,
        Cell: ({ row }) => {
          const next_bill = row.original.preference?.next_bill;
          const date = dayjs(next_bill ? next_bill : undefined);
          const daysFromNow = date.diff(dayjs(), 'day');
          return (
            <div
              className={`next-bill-time ${
                daysFromNow >= 0
                  ? daysFromNow > 10
                    ? 'success'
                    : 'warning'
                  : 'danger'
              } ${(!next_bill || next_bill === 'N/A') && 'gray'}`}
            >
              {(!next_bill || next_bill === 'N/A') && <div>N/A</div>}
              {next_bill && next_bill !== 'N/A' && (
                <>
                  <div>{date.format('MMM D, YYYY')}</div>
                  <div>{`${Math.abs(daysFromNow)} ${
                    daysFromNow === 1 || daysFromNow === -1 ? 'Day' : 'Days'
                  } ${daysFromNow >= 0 ? 'Remaining' : 'Past due'}`}</div>
                </>
              )}
            </div>
          );
        },
      },

      {
        Header: 'Phone',
        disableSortBy: true,
        accessor: 'phone',
        id: 'phone',
        Cell: ({ value }) => {
          const [phoneCode, phoneNum] = value ? value.split(' ') : [null, null];

          return phoneFormatter(phoneCode, phoneNum);
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
        disableSortBy: true,
      },
      {
        Header: 'Status',
        disableSortBy: true,
        accessor: 'status',
        id: 'status',
        Cell: ({ row }) => {
          const { original } = row;
          return (
            <WTToggle
              disabled={!original.preference?.subscription}
              row={original}
              toast={toast}
              status={original.status}
            />
          );
        },
      },
      {
        Header: (obj) => (
          <ColumnToggle
            header
            exclude={['control', 'id']}
            obj={obj}
            // right={25}
            position="left"
          />
        ),
        // accessor: (d) => ({ id: d.id }),
        accessor: 'id',
        disableSortBy: true,
        id: 'control',
        Cell: ({ row }) => {
          const { original } = row;

          return (
            <WorkerActions
              setDeleteModal={setDeleteModal}
              row={original}
              workerId={original.id}
              setModal={setModal}
              setClientToDelete={setClientToDelete}
              setAllowScroll={setAllowScroll}
            />
          );
        },
      },
    ],
    []
  );

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
      <table {...getTableProps()} className={`clients-table `}>
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
                      //   onClick={() => handleClick(cell)}
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
            entity={clientToDelete.name}
            type="client"
            modal={deleteModal}
            loader={deleting}
            closeModal={() => setDeleteModal(false)}
            deleteHandler={deleteClientHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientsTable;
