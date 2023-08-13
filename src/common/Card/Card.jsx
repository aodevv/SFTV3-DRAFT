import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdModeEdit, MdOutlineImageNotSupported } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';
import { BsFillGearFill } from 'react-icons/bs';

import Toggle from '../@core/Toggle/Toggle';
import Dropdown from '../Dropdown/Dropdown';
import { useCloseOutside } from '../Hooks/useCloseOutside';

import DeleteModal from '../DeleteModal/DeleteModal';
import ActionsBtn from '@core/ActionsBtn/ActionBtn';
import siteIcon from '@assets/icons/site.svg';
import { countries } from '@core/utils/objects';
import { clientEditStatus } from '../../redux/clientSlice/clientSlice';
// import { siteEditStatus } from '../../redux/siteSlice/siteSlice';

// import {
//   deleteContractor,
//   toggleStatus,
// } from "../../redux/contractorSlice/contractorSlice";

import './Card.scss';
import { siteEditStatus } from '../../redux/siteSlice/siteSlice';

const Card = ({
  toast,
  data,
  setModal,
  type,
  loader,
  deleteHandler,
  clientLogo,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const clientPosting = useSelector((state) => state.client.posting);
  const sitePosting = useSelector((state) => state.site.posting);

  // const contractorSlice = useSelector((state) => state.contractor);
  const [toggleSpin, setToggleSpin] = useState(
    type === 'client' ? clientPosting : sitePosting
  );
  const [toggeled, setToggeled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImgError = () => {
    setImgError(true);
  };

  const {
    id,
    address,
    name,
    status,
    logo,
    country,
    city,
    sites_count,
    person_sites_count,
    preference,
    n_address,
    box,
    zip_code,
  } = data;

  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);

  const handleEdit = () => {
    setModal({
      show: true,
      edit: true,
      data,
    });
    setIsClose(true);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
    setIsClose(true);
  };

  // const handleToggle = () => {
  //   toast.showWarningToast(
  //     "You can't activate this client unless you set a subscription first"
  //   );
  // };

  const handleToggle = () => {
    if (type === 'client') {
      if (true) {
        setToggeled(true);
        dispatch(
          clientEditStatus({
            clientId: data.id,
            id: status === 1 ? 2 : 1,
          })
        );
      } else {
        // toast.shoWarningToast('You can't activate this client unless you set a subscription first')
      }
    }
    if (type === 'site') {
      setToggeled(true);
      dispatch(
        siteEditStatus({
          siteId: data.id,
          id: status === 1 ? 2 : 1,
        })
      );
    }
  };

  // const toggleActive = () => {
  //   const old_status = status.bool_status;
  //   setToggeled(true);

  //   dispatch(
  //     toggleStatus({ contractor_id: id, status_id: old_status ? 2 : 1 })
  //   );
  // };

  // const openWorkers = () => {
  //   navigate(`/workersFiltered/${id}`);
  // };
  useEffect(() => {
    if (type === 'client') {
      if (toggeled) setToggleSpin(clientPosting);
    } else {
      if (toggeled) setToggleSpin(sitePosting);
    }
  }, [clientPosting, toggeled, sitePosting]);

  useEffect(() => {
    if (type === 'client') {
      if (!clientPosting) setToggeled(false);
    } else {
      if (!sitePosting) setToggeled(false);
    }
  }, [clientPosting, sitePosting]);

  return (
    <div className="card">
      <div className="card__header">
        {type === 'client' ? (
          <>
            {logo && !imgError ? (
              <img src={logo} alt="company_logo" onError={handleImgError} />
            ) : (
              <i>
                <MdOutlineImageNotSupported />
              </i>
            )}
          </>
        ) : (
          <>
            {clientLogo && !imgError ? (
              <img
                src={clientLogo}
                alt="company_logo"
                onError={handleImgError}
              />
            ) : (
              <i>
                <MdOutlineImageNotSupported />
              </i>
            )}
          </>
        )}

        <ActionsBtn
          openRef={openRef}
          onClick={() => setIsClose(!isClose)}
          className="card__header-ref"
          sites={type === 'site'}
        >
          <Dropdown
            right="0px"
            isClose={isClose}
            menuRef={menuRef}
            className="dropdown"
          >
            <li className="title">
              <p>Actions</p>
            </li>

            {/* {type === 'client' && (
              <li
                onClick={() => navigate(`/clients/${id}/preferences`)}
                className="preference"
              >
                <i>
                  <BsFillGearFill />
                </i>
                <p>Preferences</p>
              </li>
            )} */}

            <li onClick={openDeleteModal} className="delete">
              <i>
                <IoClose />
              </i>
              <p>Delete</p>
            </li>
            <li onClick={handleEdit} className="edit">
              <i>
                <MdModeEdit />
              </i>
              <p>Edit</p>
            </li>
          </Dropdown>
        </ActionsBtn>
      </div>
      <div className={`card__body ${type === 'site' && 'site-card'}`}>
        <div className="card__body-content">
          <p className="title">Name: </p>
          <p className="content">{name}</p>
        </div>
        <div className="card__body-content">
          <p className="title">Address: </p>
          {address ? (
            <p className="content">{`${address}${
              n_address ? ', ' + n_address : ''
            }${box ? ', ' + box : ''}${zip_code ? ', ' + zip_code : ''}${
              city ? ', ' + city : ''
            }${country ? ', ' + countries[country] : ''}`}</p>
          ) : (
            <p className="content">----</p>
          )}
        </div>
        {type !== 'site' && (
          <div className="card__body-content">
            <p className="title">Next Bill: </p>
            <p className="content">
              {preference?.next_bill && preference?.next_bill !== 'N/A'
                ? dayjs(preference?.next_bill).format('DD/MM/YYYY')
                : 'N/A'}{' '}
              {preference?.subscription && (
                <span className="type">{`( ${
                  preference?.subscription?.type_subscription === 'Annually'
                    ? 'Annual'
                    : 'Monthly'
                } Subscription )`}</span>
              )}
              -
            </p>
          </div>
        )}
      </div>
      <div className="card__footer">
        <div
          onClick={() => {
            if (type === 'client') navigate(`/clients/${id}/sites`);
          }}
          className="workers"
        >
          <i>
            {type === 'site' ? (
              <FaUser />
            ) : (
              <img src={siteIcon} alt="siteIcon" />
            )}
          </i>
          <span>
            {type === 'client' ? (
              <>
                {sites_count}
                {sites_count > 1 ? ' sites' : ' site'}
              </>
            ) : (
              <>
                {person_sites_count}
                {person_sites_count > 1 ? ' workers' : ' worker'}
              </>
            )}

            {/* {type === "site" ? "Workers" : "sites"} */}
          </span>
        </div>
        <div className="toggle-active">
          <Toggle handleClick={handleToggle} isActive={status} />
          {toggleSpin && (
            <div className="toggle-active__spinner">
              <i>
                <ImSpinner2 />
              </i>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {deleteModal && (
          <DeleteModal
            entity={name}
            modal={deleteModal}
            loader={loader}
            type={type}
            toast={toast}
            closeModal={() => setDeleteModal(false)}
            deleteHandler={deleteHandler}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
