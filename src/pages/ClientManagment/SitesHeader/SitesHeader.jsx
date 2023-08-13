import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { MdModeEdit, MdOutlineImageNotSupported } from 'react-icons/md';

import siteIcon from '@assets/icons/site.svg';
import avatar from '@assets/avatar.png';
import { useCloseOutside } from '@common/Hooks/useCloseOutside';
import Toggle from '@common/@core/Toggle/Toggle';
import Dropdown from '@common/Dropdown/Dropdown';
import ActionsBtn from '@common/@core/ActionsBtn/ActionBtn';
import SiteHeaderSkeleton from './SiteHeaderSkeleton';
import { countries } from '@common/@core/utils/objects';
import { fetchSites } from '@redux/siteSlice/siteSlice';
// import { clientEditStatus } from '../../redux/clientSlice/clientSlice';
import './SitesHeader.scss';
import { clientEditStatus } from '../../../redux/clientSlice/clientSlice';

// import { tempClient } from '../../Sites/site/utils';

const SitesHeader = ({ setModal, setClientModal, toast }) => {
  const { clientId } = useParams();
  const [isClose, setIsClose] = useState(true);
  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);
  const [imgError, setImgError] = useState(false);

  const dispatch = useDispatch();
  const fethced = useSelector((state) => state.site.fetched);
  const loading = useSelector((state) => state.site.loading);
  const client = useSelector((state) => state.site.client);
  const posting = useSelector((state) => state.client.posting);

  const handleError = () => {
    setImgError(true);
  };

  const handleToggle = () => {
    if (true)
      dispatch(
        clientEditStatus({
          clientId: client.id,
          id: client.status === 1 ? 2 : 1,
          fromSite: true,
        })
      );
    else {
      // toast.showWarningToast("You can't activate this client unless you set a subscription first!")
    }
  };

  useEffect(() => {
    if (!fethced) {
      dispatch(fetchSites(clientId));
    }
  }, [fethced]);

  return (
    <>
      {loading && (
        <div className="sites-skeleton">
          <SiteHeaderSkeleton />
        </div>
      )}
      {!loading && fethced && client && (
        <div className="sites-header">
          <>
            <div className="sites-header__img">
              {client.logo && !imgError ? (
                <img src={client.logo} alt="client" onError={handleError} />
              ) : (
                <i>
                  <MdOutlineImageNotSupported />
                </i>
              )}
            </div>
            <p className="sites-header__name">{client.name}</p>
            <p className="sites-header__desc">{client.desc}</p>
            <p className="sites-header__address">{`${client.address}${
              client.n_address ? ', ' + client.n_address : ''
            }${client.box ? ', ' + client.box : ''}${
              client.zip_code ? ', ' + client.zip_code : ''
            }${client.city ? ', ' + client.city : ''}${
              client.country ? ', ' + countries[client.country] : ''
            }`}</p>
            <div className="sites-header__count">
              <span>
                <img src={siteIcon} alt="site-icon" />
              </span>
              {` ${client.sites_count} Sites`}
            </div>
            <div className="sites-header__contact-persons">
              <div className="image-stack">
                {client.contacts?.slice(0, 2).map((person) =>
                  person.profile_photo ? (
                    <div key={person.id}>
                      <img src={person.profile_photo} alt="person" />
                      {person.first_name && person.last_name && (
                        <p>{`${
                          person.first_name
                        } ${person.last_name?.toUpperCase()}`}</p>
                      )}
                    </div>
                  ) : (
                    <div key={person.id}>
                      <img src={avatar} alt="person" />
                      {person.first_name && person.last_name && (
                        <p>{`${
                          person.first_name
                        } ${person.last_name?.toUpperCase()}`}</p>
                      )}
                    </div>
                  )
                )}
                {/* <img src={human1} alt="person" />
              <img src={human2} alt="person" /> */}
              </div>
              <p
                onClick={() =>
                  setModal({
                    show: true,
                    edit: true,
                    persons: client.contacts,
                  })
                }
              >
                Contact persons
              </p>
            </div>
            <div className="sites-header__toggle">
              <Toggle handleClick={handleToggle} isActive={client.status} />
              {posting && (
                <div className="sites-header__toggle-spinner">
                  <i>
                    <ImSpinner2 />
                  </i>
                </div>
              )}
            </div>
            <div className="sites-header__actions">
              <ActionsBtn
                openRef={openRef}
                onClick={() => setIsClose(!isClose)}
                className="sites-header__actions-ref"
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

                  <li className="delete">
                    <i>
                      <IoClose />
                    </i>
                    <p>Delete</p>
                  </li>
                  <li
                    className="edit"
                    onClick={() => {
                      setClientModal({
                        show: true,
                        edit: true,
                        data: client,
                      });
                      setIsClose(true);
                    }}
                  >
                    <i>
                      <MdModeEdit />
                    </i>
                    <p>Edit</p>
                  </li>
                </Dropdown>
              </ActionsBtn>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default SitesHeader;
