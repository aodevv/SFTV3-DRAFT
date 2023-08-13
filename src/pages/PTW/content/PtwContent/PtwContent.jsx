import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Card from '../../components/Card/Card';
import PtwFormModal from '../../components/PtwFormModal/PtwFormModal';
import PtwContentContainer from '../PtwContentContainer/PtwContentContainer';
import DeleteModal from '../../../../common/DeleteModal/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategories,
  deleteSubCategories,
  fetchCategories,
  fetchSubCategories,
} from '../../../../redux/ptwSlice/ptwSlice';

const PtwContent = ({
  activeTab,
  activeSubCategory,
  setActiveSubCategory,
  ptw,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [cardData, setCardData] = useState([]);
  const [showDeleteBin, setShowDeleteBin] = useState(false);
  const [checkedCards, setCheckedCards] = useState([]);
  const deleting = useSelector((state) => state.ptw.deleting);
  const [modal, setModal] = useState({
    show: false,
    edit: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

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

  const deleteHandler = () => {
    const filterItemsToDelete = checkedCards.filter((item) => item.checked);
    if (!activeSubCategory && activeTab) {
      console.log('deleting category');
      const formdata = new FormData();
      const idsToDelete = filterItemsToDelete.map((el) => el.id);
      idsToDelete.forEach((el, idx) => formdata.append(`ids[${idx}]`, el));
      dispatch(deleteCategories({ data: formdata, ids: idsToDelete }));
    }
    if (activeSubCategory) {
      console.log('deleting sub category');
      const formdata = new FormData();
      const idsToDelete = filterItemsToDelete.map((el) => el.id);
      idsToDelete.forEach((el, idx) => formdata.append(`ids[${idx}]`, el));
      dispatch(deleteSubCategories({ data: formdata, ids: idsToDelete }));
    }
    console.log(filterItemsToDelete);
  };

  useEffect(() => {
    setSearchValue('');
    if (!activeSubCategory) {
      const data = ptw.categories;
      setCardData(data);
      setCheckedCards(data?.map((item) => ({ id: item.id, checked: false })));
    } else {
      setCardData([]);
      dispatch(fetchSubCategories(activeSubCategory.value));
    }
  }, [activeSubCategory]);

  useEffect(() => {
    if (ptw.subCategoriesFetched) {
      const subCategories = ptw.subCategories;
      setCardData(subCategories);
      setCheckedCards(
        subCategories?.map((item) => ({ id: item.id, checked: false }))
      );
    }
  }, [ptw.subCategoriesFetched, ptw.subCategories]);

  useEffect(() => {
    if (ptw.categoriesFetched && !activeSubCategory) {
      const categories = ptw.categories;
      setCardData(categories);
      setCheckedCards(
        categories?.map((item) => ({ id: item.id, checked: false }))
      );
    }
  }, [ptw.categoriesFetched, ptw.categories]);

  useEffect(() => {
    if (activeSubCategory) {
      const subCategories = [...ptw.subCategories];
      setCardData(
        subCategories.filter((el) =>
          el.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      const categories = [...ptw.categories];
      setCardData(
        categories.filter((el) =>
          el.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  useEffect(() => {
    const checkedCount = checkedCards?.reduce((acc, item) => {
      if (item.checked) return acc + 1;
      else return acc + 0;
    }, 0);

    if (checkedCount > 0) {
      setShowDeleteBin(true);
    } else {
      setShowDeleteBin(false);
    }
  }, [checkedCards]);

  useEffect(() => {
    if (activeTab) {
      dispatch(fetchCategories(activeTab.id));
    }
  }, [activeTab]);

  useEffect(() => {
    setCardData(ptw.categories);
  }, [ptw.categories]);

  useEffect(() => {
    console.log(checkedCards);
  }, [checkedCards]);

  return (
    <>
      {(ptw.categoriesLoading || ptw.subCategoriesLoading) && (
        <h1>Loading ...</h1>
      )}
      {!ptw.categoriesLoading &&
        !ptw.subCategoriesLoading &&
        (ptw.categoriesFetched || ptw.subCategoriesFetched) && (
          <PtwContentContainer
            openModal={openModal}
            handleSearch={handleSearch}
            searchValue={searchValue}
            activeTab={activeTab}
            activeSubCategory={activeSubCategory}
            setActiveSubCategory={setActiveSubCategory}
            showDeleteBin={showDeleteBin}
            openDeleteModal={() => setDeleteModal(true)}
          >
            <div
              className={`ptw-content-container__${
                !activeSubCategory && activeTab?.size === 'big'
                  ? 'big'
                  : 'small'
              }-cards ${
                !activeSubCategory &&
                activeTab?.size === 'big' &&
                cardData.length <= 3 &&
                'flexed-cards'
              }  ${
                (activeSubCategory || activeTab?.size === 'small') &&
                cardData.length <= 7 &&
                'flexed-cards'
              }`}
            >
              {cardData?.map((item) => (
                <Card
                  width={
                    !activeSubCategory && activeTab?.size === 'big'
                      ? '369px'
                      : '173px'
                  }
                  key={item.id}
                  data={item}
                  setModal={setModal}
                  activeTab={activeTab}
                  setCheckedCards={setCheckedCards}
                  activeSubCategory={activeSubCategory}
                  setSubCategory={setActiveSubCategory}
                />
              ))}
            </div>

            <AnimatePresence initial={false} mode="wait">
              {modal.show && (
                <PtwFormModal
                  closeModal={() =>
                    setModal({ edit: false, data: null, show: false })
                  }
                  modal={modal}
                  edit={modal.edit}
                  entity={
                    !activeSubCategory ? activeTab.type : activeSubCategory.type
                  }
                  activeTab={activeTab}
                  activeSubCategory={activeSubCategory}
                  // inputName={`ADD ${
                  //   !activeSubCategory ? activeTab.type : activeSubCategory.type
                  // }`}
                />
              )}
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait">
              {deleteModal && (
                <DeleteModal
                  entity={null}
                  modal={deleteModal}
                  loader={deleting}
                  // setToast={setToast}
                  type={'selected items'}
                  closeModal={() => setDeleteModal(false)}
                  deleteHandler={deleteHandler}
                />
              )}
            </AnimatePresence>
          </PtwContentContainer>
        )}
    </>
  );
};

export default PtwContent;
