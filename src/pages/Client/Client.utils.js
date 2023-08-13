import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';

dayjs.extend(isBetween);

export const filterClients = ({
  setClientsData,
  dateRange,
  subType,
  statusValue,
  search,
  clients,
}) => {
  if (clients.length > 0) {
    setClientsData(
      clients
        .filter((cl) => {
          if (!dateRange[0]) return cl;
          if (dayjs(dateRange[0]).isSame(dayjs(dateRange[1]))) {
            return dayjs(cl.preference?.date_subscription).isSame(
              dayjs(dateRange[0]),
              'day'
            );
          } else
            return dateRange.length === 0
              ? cl
              : dayjs(cl.preference?.date_subscription).isBetween(
                  dateRange[0],
                  dateRange[1]
                );
        })
        .filter((cl) => cl.name.toLowerCase().includes(search.toLowerCase()))
        .filter((cl) => {
          if (statusValue) {
            console.log(cl.status === statusValue.value);
            return cl.status === statusValue.value;
          } else return true;
        })
        .filter((cl) =>
          subType ? cl.preference?.subscription_id === subType.value : true
        )
    );
  }
};
