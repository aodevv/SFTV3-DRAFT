import { RiDeleteBin6Line } from 'react-icons/ri';

import Search from '@core/Search/Search';
import AddBtn from '@core/AddBtn/AddBtn';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './PtwContentContainer.scss';
import { breadcrumbPaths } from '../DangerCategories/utils';

const PtwContentContainer = ({
  openModal,
  searchValue,
  handleSearch,
  children,
  activeTab,
  setActiveSubCategory,
  activeSubCategory,
  showDeleteBin,
  openDeleteModal,
}) => {
  const paths = [...breadcrumbPaths, activeTab];
  return (
    <div className="ptw-content-container">
      <div className="ptw-content-container__header">
        <Breadcrumb
          paths={paths}
          activeTab={activeTab}
          setActiveSubCategory={setActiveSubCategory}
          activeSubCategory={activeSubCategory}
        />
        <div className="ptw-content-container__header-controls">
          {showDeleteBin && (
            <div
              onClick={openDeleteModal}
              className="ptw-content-container__delete"
            >
              <span>
                <RiDeleteBin6Line />
              </span>
            </div>
          )}

          <Search
            value={searchValue}
            handleChange={handleSearch}
            placeholder="Search items..."
          />
          <AddBtn
            handleClick={openModal}
            title={`Add ${
              !activeSubCategory
                ? activeTab && activeTab.type
                : activeSubCategory.type
                ? activeSubCategory.type
                : 'new'
            }`}
          />
        </div>
      </div>

      {children}
    </div>
  );
};

export default PtwContentContainer;
