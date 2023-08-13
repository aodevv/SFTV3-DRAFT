import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../../common/@core/Search/Search';
import ClientCards from './ClientCards/ClientCards';
import CardSkeleton from '../../common/Card/CardSkeleton';
import { toggleCards } from '../../redux/layoutSlice/layoutSlice';
import { SlMenu } from 'react-icons/sl';
import { BsGrid } from 'react-icons/bs';
import ClientsTable from '../../common/Tables/Clients/ClientsTable';
import DateRangePicker from '../../common/@core/DateRangePicker/DateRangePicker';
import { customStyles } from '../../common/@core/Select/selectStyles';
import ClientModal from './ClientModal/ClientModal';
import { countriesOptions } from '../../common/@core/utils/objects';
import { filterClients } from './Client.utils';
import { useAllowScroll } from '../../common/Hooks/useAllowScroll';
import ToastContext from '@common/Contexts/ToastContext';

import './Client.scss';
import { clearError, fetchClients } from '../../redux/clientSlice/clientSlice';

const tempSubOptions = [
  { value: 1, label: 'Monthly' },
  { value: 2, label: 'Annually' },
];

const tempStatusOptions = [
  { value: true, label: 'Active' },
  { value: false, label: 'Innactive' },
];

const Client = () => {
  const dispatch = useDispatch();
  const toast = useContext(ToastContext);

  const [clientToEdit, setClientToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [subType, setSubType] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const [tableRef, setAllowScroll] = useAllowScroll();

  const [clientsData, setClientsData] = useState([]);
  const client = useSelector((state) => state.client);
  const [modal, setModal] = useState({
    show: false,
    edit: false,
    client: null,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const closeModal = () => {
    setModal({ edit: false, client: null, show: false });
    setClientToEdit(null);
  };

  const showCards = useSelector((state) => state.layout.showCards);

  useEffect(() => {
    if (showCards) {
      !client.fetched && dispatch(fetchClients());
      (client.fetched || client.deleting || client.posting) &&
        setClientsData(client.clients);
    }
  }, [client.fetched, showCards, client.deleting, client.posting]);

  useEffect(() => {
    setClientsData(
      client.clients.filter((cl) =>
        cl.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    filterClients({
      setClientsData,
      search,
      statusValue,
      dateRange,
      subType,
      clients: client.clients,
    });
    // setClientsData(
    //   client.clients.filter((cl) =>
    //     cl.name.toLowerCase().includes(search.toLowerCase())
    //   )
    // );
  }, [search, dateRange, statusValue, subType]);

  useEffect(() => {
    filterClients({
      setClientsData,
      search,
      statusValue,
      dateRange,
      subType,
      clients: client.clients,
    });
  }, []);

  useEffect(() => {
    if (clientToEdit) {
      setModal({
        show: true,
        edit: true,
        client: clientToEdit,
      });
    }
  }, [clientToEdit]);

  useEffect(() => {
    setSubType('');
    setSearch('');
    setDateRange([]);
    setStatusValue('');
  }, [showCards]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <div className="client">
      <div className="client__header">
        <div style={{ display: 'flex', gap: '10px' }}>
          <p>Clients Info</p>
        </div>
        <div className="client__header-controls">
          <Search
            value={search}
            handleChange={handleSearch}
            placeholder="Search clients"
          />
          {!showCards && (
            <>
              <DateRangePicker
                workers
                placeholder="Filter by dates"
                setDateRange={setDateRange}
              />
              <Select
                isClearable
                maxMenuHeight={200}
                options={tempSubOptions}
                placeholder="Select Subscription"
                value={subType}
                onChange={(selectedOptions) => setSubType(selectedOptions)}
                className="table-select"
                classNamePrefix="react-select"
                styles={customStyles}
                getOptionValue={(option) => option}
              />
              <Select
                isClearable
                maxMenuHeight={200}
                options={tempStatusOptions}
                placeholder="Status"
                value={statusValue}
                onChange={(selectedOptions) => setStatusValue(selectedOptions)}
                className="table-select"
                classNamePrefix="react-select"
                styles={customStyles}
                getOptionValue={(option) => option}
              />
            </>
          )}
          <div
            onClick={() => !showCards && dispatch(toggleCards(true))}
            className={`client__header-controls-icon grid-icon ${
              showCards && 'active'
            }`}
          >
            <BsGrid />
          </div>
          <div
            onClick={() => showCards && dispatch(toggleCards(false))}
            className={`client__header-controls-icon ${!showCards && 'active'}`}
          >
            <SlMenu />
          </div>
        </div>
      </div>

      <div className="client__header-content">
        {client.loading && !client.error && (
          <div className="client__cards">
            <CardSkeleton />
          </div>
        )}
        {!client.loading && (
          <>
            {showCards && (
              <ClientCards
                clients={clientsData}
                setModal={setModal}
                toast={toast}
              />
            )}
            <div ref={tableRef} className="client__table">
              {!showCards && (
                <ClientsTable
                  setModal={setModal}
                  setAllowScroll={setAllowScroll}
                  clients_data={clientsData}
                  toast={toast}
                />
              )}
            </div>
          </>
        )}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <ClientModal
            client={client.clients}
            toast={toast}
            closeModal={closeModal}
            countries={countriesOptions}
            modal={modal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Client;
