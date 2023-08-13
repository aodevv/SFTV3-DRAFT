import { useOutletContext } from 'react-router-dom';

import SiteCards from './SiteCards/SiteCards';
import CardSkeleton from '@common/Card/CardSkeleton';

import './Sites.scss';
import { useSelector } from 'react-redux';

const Sites = () => {
  // const { clientId } = useParams();
  // const dispatch = useDispatch();

  const { toast } = useOutletContext();

  const site = useSelector((state) => state.site);

  // useEffect(() => {
  //   dispatch(fetchSites(clientId));
  // }, []);

  return (
    <div className="cm-page__cards">
      <p className="title">Sites Info</p>
      {site.loading && (
        <div className="client__cards">
          <CardSkeleton />
        </div>
      )}
      {site.fetched && (
        <SiteCards toast={toast} client={site.client} sites={site.sites} />
      )}
    </div>
  );
};

export default Sites;
