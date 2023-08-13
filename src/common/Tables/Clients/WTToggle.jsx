import { useState } from 'react';

// import { ImSpinner2 } from 'react-icons/im';

// import { useSelector, useDispatch } from 'react-redux';
// import { toggleWorkerStatus } from "../../../redux/workerSlice/workerSlice";

import Toggle from '../../@core/Toggle/Toggle';
// import { clientEditStatus } from "../../../redux/clientSlice/clientSlice";

import './ClientsTable.scss';

const WTToggle = ({ status, row, disabled, toast }) => {
  const [toggle, setToggle] = useState(status);

  // const worker = useSelector((state) => state.worker);
  // const client = useSelector((state) => state.client);

  // const [toggleSpin, setToggleSpin] = useState(client.posting);
  // const [toggeled, setToggeled] = useState(false);

  const handleClick = () => {
    // setToggle(!toggle);

    if (disabled) {
      toast.showWarningToast(
        "You can't activate this client unless you set a subscription first: ",
        { link: `/clients/${row.id}/preferences` }
      );
    } else {
      // dispatch(
      //   clientEditStatus({ id: status === 1 ? 2 : 1, clientId: row.id })
      // );
      // setToggle(!toggle);
    }
  };

  // const handleToggle = () => {
  //   // setToggle(!toggle);

  //   dispatch(
  //     toggleWorkerStatus({
  //       role: row.role.toLowerCase(),
  //       worker_id: row.id,
  //       company: row.type_worker.toLowerCase(),
  //       status_id: status === 1 ? 2 : 1,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   if (toggeled) setToggleSpin(client.posting);
  // }, [client.posting, toggeled]);

  // useEffect(() => {
  //   if (!client.posting) setToggeled(false);
  // }, [client.posting]);

  // useEffect(() => {
  //   setToggle(status === 1);
  // }, [status]);

  return (
    <div className="clients-table__toggle">
      {/* <span className="clients-table__toggle-spinner">
        {toggleSpin && <ImSpinner2 />}
      </span> */}
      <Toggle isActive={toggle} handleClick={handleClick} />
    </div>
  );
};

export default WTToggle;
