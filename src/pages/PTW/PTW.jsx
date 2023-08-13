import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import PtwSubheader from './PtwSubheader/PtwSubheader';
import PtwContent from './content/PtwContent/PtwContent';
import './PTW.scss';
import { tabs } from './PtwSubheader/PtwSubheader.utils';
import { fetchTopCategories } from '../../redux/ptwSlice/ptwSlice';

const PTW = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const ptw = useSelector((state) => state.ptw);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topCat, cat } = useParams();

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    if (ptw.fetched) {
      if (!topCat) {
        navigate(`${ptw.topCategories[0]?.id}`, { replace: true });
        setActiveTab({
          label: ptw.topCategories[0]?.name,
          id: ptw.topCategories[0]?.id,
          ...ptw.topCategories[0],
        });
      } else {
        const id = parseInt(topCat);
        const findTab = ptw.topCategories.find((el) => el.id === id);
        if (findTab) {
          setActiveTab({
            label: findTab.name,
            id: findTab.id,
            ...findTab,
          });
        } else {
          setActiveTab({
            label: ptw.topCategories[0]?.name,
            id: ptw.topCategories[0]?.id,
            ...ptw.topCategories[0],
          });
          navigate(`/ptw/${ptw.topCategories[0]?.id}`, { replace: true });
        }
      }
    } else {
      dispatch(fetchTopCategories());
    }
  }, [ptw.fetched, topCat]);

  useEffect(() => {
    if (ptw.fetched) {
      if (!cat) {
        setActiveSubCategory(null);
      }
    }
  }, [cat]);

  useEffect(() => {
    if (ptw.fetched && ptw.categoriesFetched && cat) {
      const id = parseInt(cat);
      console.log(ptw.categories);
      const findCat = ptw.categories.find((el) => el.id == id);
      console.log(findCat);
      if (findCat) {
        setActiveSubCategory({
          label: findCat.name,
          value: findCat.id,
          ...findCat,
        });
      } else {
        navigate(`/ptw/${ptw.topCategories[0]?.id}`, { replace: true });
      }
    }
  }, [ptw.fetched, ptw.categoriesFetched]);

  return (
    <div className="ptw">
      <PtwSubheader
        ptw={ptw}
        activeTab={activeTab}
        setActiveSubCategory={setActiveSubCategory}
        setActiveTab={setActiveTab}
      />
      <div className="ptw-content">
        {activeTab && (
          <PtwContent
            activeSubCategory={activeSubCategory}
            setActiveSubCategory={setActiveSubCategory}
            activeTab={activeTab}
            ptw={ptw}
          />
        )}
      </div>
    </div>
  );
};

export default PTW;
