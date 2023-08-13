import dayjs from 'dayjs';
import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

import avatar from '@assets/avatar.png';
import ColumnToggle from '@common/ColumnToggle/ColumnToggle';
import UserActions from './utils/UserActions';
import UserToggle from './UserToggle';
import { allCountryPhoneCodes } from '@core/utils/objects';

export const columnsDefinition = (
  setAllowScroll,
  setUserToDelete,
  setDeleteModal,
  setUserToEdit
) => {
  return [
    {
      Header: 'ID',
      accessor: 'id',
      disableSortBy: true,
    },
    {
      Header: 'Date',
      accessor: 'created_at',
      Cell: ({ value }) => <p>{dayjs(value).format('MMMM D, HH:mm')}</p>,
    },
    {
      Header: 'User',
      accessor: (row) => {
        return {
          first_name: row.first_name,
          last_name: row.last_name,
          fct: row.super_admin_function,
          profile_photo: row.profile_photo,
        };
      },
      Cell: ({ value }) => {
        const { first_name, last_name, fct, profile_photo } = value;
        return (
          <div className="user-cell" style={{ justifyContent: 'flex-start' }}>
            <img
              src={profile_photo ? profile_photo : avatar}
              alt="user-image"
              // style={{ maxWidth: 34, maxHeight: 34 }}
            />
            {/* <img src={human} alt="user-image" /> */}

            <div className="user-cell__text">
              <p className="user-cell__name">
                {`${
                  first_name?.charAt(0).toUpperCase() + first_name?.slice(1)
                } ${last_name.toUpperCase()}`}
              </p>

              <p className="user-cell__function">
                {fct?.function ? fct.function?.name : '-'}
              </p>
            </div>
          </div>
        );
      },
      disableSortBy: true,
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => value.name,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      Cell: ({ value }) => {
        if (value) {
          const [phoneCode, phoneNum] = value.split(' ');
          let phoneObj, formattedNumber;
          try {
            phoneObj = phoneUtil.parse(phoneNum, phoneCode);
            formattedNumber = phoneUtil.format(
              phoneObj,
              PhoneNumberUtil.NATIONAL
            );
          } catch (error) {
            // console.log(error);
            // console.log(row);
            // console.log(value);
          }

          return phoneCode &&
            phoneNum &&
            phoneCode !== 'undefined' &&
            phoneNum !== 'undefined'
            ? `${allCountryPhoneCodes[phoneCode]} ${formattedNumber}`
            : '';
        } else {
          return '';
        }
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value, row }) => {
        return (
          <div>
            <UserToggle status={value} row={row} />
            {/* <Toggle
              isActive={value}
              handleClick={() => handleChangeStatus(value, row)}
            /> */}
          </div>
        );
      },
    },

    {
      Header: (obj) => (
        <ColumnToggle
          header
          exclude={['control', 'id']}
          obj={obj}
          // right={25}
          position="left"
        />
      ),
      // accessor: (d) => ({ id: d.id }),
      accessor: 'id',
      disableSortBy: true,
      id: 'control',
      Cell: ({ row }) => {
        const { original } = row;

        return (
          <UserActions
            setAllowScroll={setAllowScroll}
            setUserToDelete={setUserToDelete}
            row={original}
            setUserToEdit={setUserToEdit}
            setDeleteModal={setDeleteModal}
          />
        );
      },
    },
  ];
};
