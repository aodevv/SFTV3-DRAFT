import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import PtwContentContainer from '../../PtwContentContainer/PtwContentContainer';
import './DangerSubCategories.scss';
import Card from '../../../components/Card/Card';
import { breadcrumbPaths } from '../utils';
import { tempDate } from './tempDate';
import PtwFormModal from '../../../components/PtwFormModal/PtwFormModal';

const DangerSubCategories = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modal, setModal] = useState({
    show: false,
    edit: false,
    data: null,
  });

  const openModal = () => {
    setModal({
      show: true,
      edit: false,
      data: null,
    });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const newPaths = [
    ...breadcrumbPaths,
    { label: 'Danger', route: '/ptw/danger-categories/22' },
  ];
  return (
    <PtwContentContainer
      openModal={openModal}
      handleSearch={handleSearch}
      searchValue={searchValue}
      paths={newPaths}
      btnTitle="Add Danger"
    >
      <div className="ptw-content-container__small-cards">
        {tempDate.map((item, id) => (
          <Card key={id} width={'173px'} data={item} noLink />
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <PtwFormModal
            closeModal={() =>
              setModal({ edit: false, data: null, show: false })
            }
            edit={modal.edit}
            entity="Danger"
            inputName="danger"
          />
        )}
      </AnimatePresence>
    </PtwContentContainer>
  );
};

export default DangerSubCategories;
