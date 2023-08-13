import { IoMdBriefcase } from 'react-icons/io';

// import { deleteClient } from "../../redux/clientSlice/clientSlice";
import Add from '@assets/add.svg';
import Card from '@common/Card/Card';

import './ClientCards.scss';
import { deleteClient } from '../../../redux/clientSlice/clientSlice';
import { useDispatch, useSelector } from 'react-redux';

const ClientCards = ({ setModal, clients, toast }) => {
  const deleting = useSelector((state) => state.client.deleting);
  const loading = useSelector((state) => state.client.loading);
  const fetched = useSelector((state) => state.client.fetched);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`client__cards ${clients.length <= 4 && 'flexed-cards'} ${
          clients.length <= 3 && 'flexed-cards-hd'
        }`}
      >
        {' '}
        <div
          onClick={() => setModal({ show: true, edit: false, client: null })}
          className="client__cards-add"
        >
          <i className="add-outer">
            <IoMdBriefcase />
            <i className="add-inner">
              <img src={Add} alt="Your SVG" />
            </i>
          </i>
          <p>Add a new client</p>
        </div>
        {clients.length > 0 &&
          fetched &&
          !loading &&
          clients.map((client, id) => (
            <Card
              loader={deleting}
              key={id}
              setModal={setModal}
              data={client}
              toast={toast}
              type="client"
              deleteHandler={() => dispatch(deleteClient(client.id))}
            />
          ))}
      </div>
      {/* <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <ClientModal
            countries={countriesOptions}
            modal={modal}
            // setToast={setToast}
            closeModal={() =>
              setModal({ edit: false, client: null, show: false })
            }
          />
        )}
      </AnimatePresence> */}
    </>
  );
};

export default ClientCards;
