import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import siteBig from '@assets/icons/site-big.svg';
import Add from '@assets/add.svg';
import Card from '@common/Card/Card';
import { countries } from '@common/@core/utils/objects';
import SiteModal from '../SiteModal/SiteModal';
import '../../Client/ClientCards/ClientCards.scss';
import { deleteSite } from '../../../redux/siteSlice/siteSlice';

const SiteCards = ({ sites, client, toast }) => {
  const countriesOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: countries[code],
  }));
  const emails = sites.map((st) => st.email).filter((value) => value !== null);

  const deleting = useSelector((state) => state.site.deleting);
  const dispatch = useDispatch();

  const [modal, setModal] = useState({
    show: false,
    edit: false,
    site: null,
  });

  return (
    <>
      <div
        className={`client__cards ${sites.length <= 4 && 'flexed-cards'} ${
          sites.length <= 3 && 'flexed-cards-hd'
        }`}
      >
        {' '}
        <div
          className="client__cards-add"
          onClick={() => setModal({ show: true, edit: false, site: null })}
        >
          <i className="add-outer">
            <img src={siteBig} alt="siteicon" />
            <i className="add-inner">
              <img src={Add} alt="Your SVG" />
            </i>
          </i>
          <p>Add a new site</p>
        </div>
        {sites.length > 0 &&
          sites.map((site) => {
            return (
              <Card
                key={site.id}
                data={site}
                type="site"
                loader={deleting}
                setModal={setModal}
                clientLogo={client?.logo}
                deleteHandler={() =>
                  dispatch(deleteSite({ id: site.id, clientId: client.id }))
                }
                // deleteHandler={() => dispatch(deleteClient(client.id))}
              />
            );
          })}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <SiteModal
            countries={countriesOptions}
            modal={modal}
            clientLogo={client?.logo}
            client={client}
            toast={toast}
            sitesEmails={emails}
            closeModal={() =>
              setModal({ edit: false, site: null, show: false })
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteCards;
