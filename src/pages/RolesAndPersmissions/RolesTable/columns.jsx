import Checkbox from './utils/Checkbox';
import ColumnHeader from './utils/ColumnHeader';
import ColumnHeaderInput from './utils/ColumnHeaderInput';
import PermissionFilter from './utils/PermissionFilter';

export const columnsDefinition = (
  firstElement,
  removeColumn,
  updateColumnName,
  duplicateColumn,
  setRoleToDelete,
  setDeleteModal
) => {
  const { roles } = firstElement;

  const rolesHeaders = roles.map((role, idx) => {
    const { id, name, deletable, index } = role;
    return {
      Header: () =>
        name !== 'pending' ? (
          <ColumnHeader
            updateColumnName={updateColumnName}
            // duplicateColumn={() => duplicateColumn(idx, name)}
            duplicateColumn={() => console.log('To be implemented')}
            name={name}
            columnId={id}
            setRoleToDelete={setRoleToDelete}
            setDeleteModal={setDeleteModal}
            deletable={deletable}
          />
        ) : (
          <ColumnHeaderInput
            columnId={id}
            removeColumn={removeColumn}
            updateColumnName={updateColumnName}
            oldName={name}
            index={index}
          />
        ),
      filterable: false,
      accessor: `roles[${idx}]`,
      id: id,
      index: index,
      disableGroupBy: true,
      Cell: ({ row, value }) =>
        !row.isExpanded &&
        !row.isGrouped && (
          <Checkbox
            key={`${row.id},${value.id}`}
            permissionId={row.original.id}
            roleId={value.id}
            value={value?.status}
          />
        ), // Render checkmark if true
    };
  });

  return [
    {
      Header: '',
      accessor: 'main_group',
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} Names`,
      Filter: PermissionFilter,
      filterable: true,
      filter: (rows, columnIds, filterValue) => {
        return rows.filter((row) => {
          // Retrieve the value from the desired fields in the data
          const permissionName = row.original['name'].toLowerCase();
          const main_group = row.original['main_group'].toLowerCase();

          // Perform the filtering based on the custom condition
          return (
            permissionName.includes(filterValue.toLowerCase()) ||
            main_group.includes(filterValue.toLowerCase())
          );
        });
      },
    },

    ...rolesHeaders,
  ];
};
