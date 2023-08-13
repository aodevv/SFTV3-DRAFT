export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
    width: "183px",
    fontSize: "12px",
    cursor: "pointer",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "2px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: "8px 6px 8px 0px",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    padding: "8px 5px 8px 6px",
  }),

  menu: (provided, state) => ({
    ...provided,
    fontSize: "13px",
    zIndex: "20",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
  }),
};
