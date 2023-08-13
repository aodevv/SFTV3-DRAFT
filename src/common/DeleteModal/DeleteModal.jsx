import { useEffect, useState } from 'react';

import Modal from '../@core/Modal/Modal';

import { IoClose } from 'react-icons/io5';
import { ImSpinner2 } from 'react-icons/im';

import './DeleteModal.scss';
import classNames from 'classnames';

const DeleteModal = ({
  closeModal,
  entity,
  deleteHandler,
  type,
  loader,
  customWarning,
  customInfo,
  confirmationMessages,
  toast,
}) => {
  const [deleted, setDeleted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [doubleConfirmation, setDoubleConfirmation] = useState([false, false]);
  const handleDelete = () => {
    if (
      confirmationMessages &&
      doubleConfirmation[0] &&
      doubleConfirmation[1]
    ) {
      deleteHandler();
      setDeleted(true);
    } else if (confirmed) {
      deleteHandler();
      setDeleted(true);
    }
  };

  useEffect(() => {
    if (!loader && deleted) {
      if (toast) {
        const text = (
          <>
            The {type.toLowerCase()} &quot;<b>{entity}</b>&quot; has been
            deleted successfully!
          </>
        );
        toast.showSuccessToast(text);
      }

      closeModal();
    }
  }, [loader, deleted]);

  return (
    <Modal centered rounded>
      <div className="delete-modal">
        <div className="delete-modal__header">
          <div className="delete-modal__header-text">
            <i className="delete-modal__header-icon" onClick={closeModal}>
              <IoClose />
            </i>
            <p>
              {type !== 'desactivate' ? 'Delete' : 'Desactivate'} Confirmation
            </p>
          </div>

          <i className="close-modal" onClick={closeModal}>
            <IoClose />
          </i>
        </div>
        <div className="delete-modal__content">
          <p className="delete-warning">
            {customWarning ? (
              customWarning
            ) : (
              <>
                You are about to delete the {type}
                {entity && <span>{` "${entity}"`}</span>}. Are you sure you want
                to delete it?
              </>
            )}
          </p>
          <div className="delete-info">
            {customInfo ? (
              customInfo
            ) : (
              <>
                <div className="delete-info__default">
                  <span>I understand that the following might be deleted:</span>
                  {confirmationMessages ? (
                    confirmationMessages.map((message, id) => (
                      <div
                        key={id}
                        className="delete-info__default-confirmation"
                      >
                        <input
                          type="checkbox"
                          id={`delete-confirmation-${id}`}
                          onChange={() =>
                            setDoubleConfirmation((prev) => {
                              const arr = [...prev];
                              arr[id] = true;
                              return arr;
                            })
                          }
                          checked={doubleConfirmation[id]}
                        />
                        <label htmlFor={`delete-confirmation-${id}`}>
                          {message}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="delete-info__default-confirmation">
                      <input
                        type="checkbox"
                        id="delete-confirmation"
                        onChange={() => setConfirmed((prev) => !prev)}
                        checked={confirmed}
                      />
                      <label htmlFor="delete-confirmation">
                        All informations belonging to the {type.toLowerCase()}!
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="delete-btn">
            <button
              onClick={closeModal}
              type="button"
              className="delete-btn__cancel"
            >
              cancel
            </button>
            <button
              onClick={handleDelete}
              className={classNames('delete-btn__cta', {
                disabled:
                  !confirmed &&
                  (!doubleConfirmation[0] || !doubleConfirmation[1]),
              })}
            >
              {loader ? (
                <i className="spinner">
                  <ImSpinner2 />
                </i>
              ) : (
                `${type !== 'desactivate' ? 'Delete' : 'Desactivate'}`
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
