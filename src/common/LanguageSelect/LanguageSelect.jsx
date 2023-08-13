import { useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';

import { useCloseOutside } from '../Hooks/useCloseOutside';

import './LanguageSelect.scss';

const languagePath = '/flags/flag';
const languages = [
  { id: 'EN', language: 'English', icon: `${languagePath}-en.png` },
  { id: 'FR', language: 'Français', icon: `${languagePath}-fr.png` },
  { id: 'NL', language: 'Nederlands', icon: `${languagePath}-nl.png` },
  { id: 'ES', language: 'Espanol', icon: `${languagePath}-es.png` },
  { id: 'DE', language: 'Deutsch', icon: `${languagePath}-de.png` },
];

const LanguageSelect = () => {
  const [isClose, setIsClose] = useState(true);
  const [selectedLan, setSelectedLan] = useState('EN');

  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);

  const handleLanguageSelect = (id) => {
    setSelectedLan(id);
  };

  return (
    <div className="ls">
      <div
        ref={openRef}
        onClick={() => setIsClose(!isClose)}
        className="ls__selected"
      >
        <img
          className="header-img"
          src={`${languagePath}-${selectedLan.toLowerCase()}.png`}
          alt="lan"
        />
      </div>

      <Dropdown
        isClose={isClose}
        menuRef={menuRef}
        className="ls-dropdown"
        right="-55px"
        top={150}
      >
        <div className="ls-backdrop">Not yet available</div>
        {languages.map((el) => {
          const { id, language, icon } = el;
          return (
            <li
              key={`lg-${id}`}
              className={`${id !== 'EN' && 'disabled'}`}
              onClick={() => handleLanguageSelect(id)}
            >
              <img
                src={icon}
                alt="ln-icon"
                className={`dropdown__icon header-img`}
              />
              <p
                className={`dropdown__language ${
                  id !== selectedLan ? 'muted' : ''
                }`}
              >{`${language}(${id.toUpperCase()})`}</p>
            </li>
          );
        })}
      </Dropdown>
    </div>
  );
};

export default LanguageSelect;
