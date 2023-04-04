import React, {
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from 'components/button';
import { Input } from 'components/input';
import { useEditUserModal } from './edit-user-modal.state';
import './edit-user-modal.scss';

interface IProps {
  setSuccess: Dispatch<SetStateAction<boolean>>,
}

export const EditUserModal = (props: IProps) => {
  const { setSuccess } = props;
  const navigate = useNavigate();

  const {
    formik,
    avatar,
    isError,
    avatarOnEdit,
    setAvatarOnEdit,
  } = useEditUserModal({ setSuccess });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
  } = formik;

  const handleClose = useCallback(() => {
    navigate('/profile');
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setAvatarOnEdit(files[0]);
    }
  };

  return (
    <div className="edit-user">
      <form
        className="edit-user__form"
        onSubmit={handleSubmit}
      >
        <div className="edit-user__fields">
          <div className="edit-user__photo-block">
            <img
              src={avatarOnEdit
                ? URL.createObjectURL(avatarOnEdit)
                : `data:image/png;base64,${avatar}`
              }
              alt="profile photo"
              className="edit-user__photo"
            />

            <label className="edit-user__photo-button">
              Change
              <input
                type="file"
                className="edit-user__photo-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="edit-user__info-block">
            <label className="edit-user__form-label">
              Name
              <Input
                id="name"
                name="name"
                type="text"
                placeholder=""
                isPass={false}
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </label>

            <label className="edit-user__form-label">
              Email
              <Input
                id="email"
                name="email"
                type="email"
                placeholder=""
                isPass={false}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </label>

            <label className="edit-user__form-label">
              Phone
              <Input
                id="phone"
                name="phone"
                type="phone"
                placeholder=""
                isPass={false}
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </label>

            {isError && <p>User with this email is already exists</p>}

          </div>
        </div>

        <div className="edit-user__form-submit">
          <MainButton
            type="button"
            text="skip"
            isSecondary={true}
            onHandleClick={handleClose}
          />

          <MainButton
            type="submit"
            text="Create"
          />
        </div>
      </form>
    </div>
  );
};
