import { useContext, useEffect, useRef, useState } from 'react';

import UsersFilter from './components/UsersFIlter/UsersFilter';
import UsersTable from './components/UsersTabe/UsersTable';
import './styles.scss';
import UserModal from './components/UserModal/UserModal';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/userSlice/userSlice';
import { fetchFunctions } from '../../redux/functionSlice/functionSlice';
import dayjs from 'dayjs';
import ToastContext from '@common/Contexts/ToastContext';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fetchRoles } from '../../redux/rolesSlice/rolesSlice';
dayjs.extend(relativeTime);

const Users = () => {
  const dispatch = useDispatch();
  const toast = useContext(ToastContext);
  // toast.showSuccessToast();
  // toast.showSuccessToast();
  const [allowScroll, setAllowScroll] = useState(false);
  const fct = useSelector((state) => state.function);
  const role = useSelector((state) => state.role);
  const [userToEdit, setUserToEdit] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const tableRef = useRef();

  // filters
  const [userName, setUserName] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [dateRange, setDateRange] = useState([]);

  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState({
    show: false,
    edit: false,
    user: null,
  });

  useEffect(() => {
    if (userToEdit) {
      setModal({
        show: true,
        edit: true,
        user: userToEdit,
      });
    }
  }, [userToEdit]);

  useEffect(() => {
    const container = tableRef.current;

    const handleWheel = (event) => {
      if (allowScroll) {
        event.preventDefault();
      }
    };

    if (container) {
      if (allowScroll) {
        container.addEventListener('wheel', handleWheel);
      } else {
        container.removeEventListener('wheel', handleWheel);
      }
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [allowScroll, tableRef]);

  useEffect(() => {
    if (!user.fetched) {
      dispatch(fetchUsers());
    } else {
      filterUsers();
    }
  }, [user.fetched]);

  // useEffect(() => {
  //   if (!user.error) {
  //     dispatch(fetchUsers());
  //   }
  // }, [user.posted, user.deleted]);

  // useEffect(() => {
  //   if (user.error) {
  //     toast.showErrorToast(user.error);
  //     dispatch(clearUserError());
  //   }

  //   if (user.message) {
  //     toast.showSuccessToast(user.message);
  //     dispatch(clearUserMessage());
  //   }
  // }, [user.error, user.message]);

  // useEffect(() => {
  //   if (user.users.length > 0) {
  //     const all = [...user.users];
  //     setFilteredUsers(all);
  //     filterUsers();
  //   }
  // }, [user]);

  const filterUsers = () => {
    if (user.users.length > 0) {
      setFilteredUsers(
        user.users
          .filter((usr) =>
            usr.name.toLowerCase().includes(userName.toLowerCase())
          )
          .filter((usr) => {
            if (!dateRange[0]) return usr;
            if (dayjs(dateRange[0]).isSame(dayjs(dateRange[1]))) {
              return dayjs(usr.created_at_normal).isSame(
                dayjs(dateRange[0]),
                'day'
              );
            } else
              return dateRange.length === 0
                ? usr
                : dayjs(usr.created_at_normal).isBetween(
                    dateRange[0],
                    dateRange[1]
                  );
          })
          .filter((usr) =>
            selectedRole ? usr.role.id === selectedRole.value : true
          )
      );
    }
  };

  useEffect(() => {
    if (!fct.fetched) {
      dispatch(fetchFunctions());
    }
  }, [fct.fetched]);

  useEffect(() => {
    if (!role.rolesFetched) {
      dispatch(fetchRoles());
    } else {
      setRoles(
        role.roles.map((el) => ({
          label: el.name,
          value: el.id,
        }))
      );
    }
  }, [role.rolesFetched]);

  const functions = useSelector((state) => state.function.functions);
  const [functionOptions, setFunctionOptions] = useState(
    functions.map((el) => ({
      label: el.name,
      value: el.id,
    }))
  );
  const [existingFunction, setExistingFunction] = useState(null);

  useEffect(() => {
    const functionsToAdd = functions
      .filter((el) => !el.hidden)
      .map((el) => ({
        label: el.name,
        value: el.id,
      }));
    if (existingFunction) {
      const findFunction = functions.find((el) => el.id === existingFunction);
      if (findFunction) {
        const alreadyExisting = functionsToAdd.find(
          (el) => el.value === findFunction.id
        );
        if (!alreadyExisting) {
          functionsToAdd.unshift({
            label: findFunction.name,
            value: findFunction.id,
          });
        }
      }
    }
    setFunctionOptions(functionsToAdd);
  }, [functions, existingFunction]);

  return (
    <div className="users-page">
      {user.loading && <h1>Loading ...</h1>}
      {!user.loading && user.users.length > 0 && (
        <>
          <div className="users-page__header">
            <p>Users infos</p>
            <UsersFilter
              setUserName={setUserName}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
              userName={userName}
              setDateRange={setDateRange}
              dateRange={dateRange}
              roles={roles}
              filterUsers={filterUsers}
              setModal={setModal}
            />
          </div>
          <div className="users-page__table custom-scrollbar">
            <UsersTable
              setUserToEdit={setUserToEdit}
              users_data={filteredUsers}
              // users_data={tempData}
              setAllowScroll={setAllowScroll}
            />
          </div>
        </>
      )}

      <AnimatePresence initial={false} mode="wait">
        {modal.show && (
          <UserModal
            modal={modal}
            toast={toast}
            roles={roles}
            setExistingFunction={setExistingFunction}
            functions={functionOptions}
            closeModal={() => {
              setModal({ edit: false, user: null, show: false });
              setExistingFunction(null);
              setUserToEdit(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
