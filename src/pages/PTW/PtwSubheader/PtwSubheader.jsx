import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import './PtwSubheader.scss';

function PtwSubheader({ activeTab, setActiveTab, setActiveSubCategory, ptw }) {
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab({
      label: tab.name,
      id: tab.id,
      ...tab,
    });
    setActiveSubCategory(null);
    navigate(`/ptw/${tab.id}`);
  };

  return (
    <div className="ptw-subheader">
      {ptw.loading && <h1 className="loading">Loading...</h1>}
      {!ptw.loading &&
        ptw.fetched &&
        ptw.topCategories.map((tab) => (
          <div
            className={classNames('ptw-subheader__tab', {
              active: activeTab?.id === tab.id,
            })}
            onClick={() => handleTabClick(tab)}
            key={tab.id}
          >
            {tab.name}
          </div>
        ))}
    </div>
  );
}

export default PtwSubheader;
