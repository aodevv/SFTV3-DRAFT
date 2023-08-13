import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import './DangerCategories.scss';
import Card from '../../components/Card/Card';
import PtwFormModal from '../../components/PtwFormModal/PtwFormModal';
import PtwContentContainer from '../PtwContentContainer/PtwContentContainer';
import { breadcrumbPaths } from './utils';
import { tempDate } from './tempDate';

const DangerCategories = () => {
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
  return (
    <PtwContentContainer
      openModal={openModal}
      handleSearch={handleSearch}
      searchValue={searchValue}
      btnTitle="Add Category"
      paths={breadcrumbPaths}
    >
      <div className="ptw-content-container__big-cards">
        {tempDate.map((item, id) => (
          <Card key={id} width={'369px'} data={item} />
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <PtwFormModal
            closeModal={() =>
              setModal({ edit: false, data: null, show: false })
            }
            edit={modal.edit}
            entity="Category"
            inputName="category"
          />
        )}
      </AnimatePresence>
    </PtwContentContainer>
  );
};

export default DangerCategories;
