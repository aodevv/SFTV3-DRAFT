import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import SitesHeader from './SitesHeader/SitesHeader';
import ContactPersonModal from '@common/Modals/ContactPersonModal/ContactPersonModal';
import ClientModal from '../Client/ClientModal/ClientModal';
import { countriesOptions } from '@core/utils/objects';
import { fetchClients } from '../../redux/clientSlice/clientSlice';
import { resetSite } from '../../redux/siteSlice/siteSlice';
import ToastContext from '@common/Contexts/ToastContext';
import './ClientManagment.scss';

const ClientManagment = () => {
  const toast = useContext(ToastContext);
  const { clientId } = useParams();
  const client = useSelector((state) => state.client);
  const site = useSelector((state) => state.site);
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    show: false,
    edit: false,
    persons: null,
  });

  const [clientModal, setClientModal] = useState({
    show: false,
    edit: false,
    data: null,
  });

  useEffect(() => {
    if (!client.fetched) {
      dispatch(fetchClients());
    }
  }, [client.fetched]);

  useEffect(() => {
    return () => {
      dispatch(resetSite());
    };
  }, []);

  return (
    <div className={classNames('cm-page', { 'h-full': site.loading })}>
      <div className="cm-page__header">
        <SitesHeader
          toast={toast}
          setModal={setModal}
          setClientModal={setClientModal}
        />
      </div>
      <Outlet context={{ toast, clientId }} />
      {/* <div className="cm-page__cards">
            <p className="title">Sites Info</p>
            <SiteCards />
          </div> */}

      <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <ContactPersonModal
            readOnly
            modal={modal}
            toast={toast}
            clientId={clientId}
            closeModal={() =>
              setModal({ edit: false, persons: null, show: false })
            }
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        {clientModal.show && (
          <ClientModal
            client={client}
            toast={toast}
            closeModal={() =>
              setClientModal({ edit: false, data: null, show: false })
            }
            countries={countriesOptions}
            modal={clientModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientManagment;
