import React, { Dispatch, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainButton } from 'components/button';
import { Input } from 'components/input';
import { useChangePass } from '../../profile';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './change-pass-modal.scss';

interface IProps {
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

export const ChangePassModal = (props: IProps) => {
  const { setSuccess } = props;
  const navigate = useNavigate();
  const { formik, isError } = useChangePass({ setSuccess });
  const { touched, errors, values, handleChange, handleSubmit } = formik;

  const handleClose = () => {
    navigate(ROUTE.PROFILE);
  };

  return (
    <div className="change-pass">
      <form method="post" className="change-pass__form" onSubmit={handleSubmit}>
        <div className="change-pass__fields">
          <label className="change-pass__form-label">
            Input your old password
            <Input
              id="oldPass"
              name="oldPass"
              type="password"
              placeholder="Password"
              isPass={false}
              value={values.oldPass}
              onChange={handleChange}
              error={touched.oldPass && Boolean(errors.oldPass)}
              helperText={touched.oldPass && errors.oldPass}
            />
          </label>

          <Link to="/" className="change-pass__forgot-pass">
            Forgot password?
          </Link>

          <label className="change-pass__form-label">
            Make up a new password
            <Input
              id="newPass"
              name="newPass"
              type="password"
              isPass={true}
              placeholder="Password"
              value={values.newPass}
              onChange={handleChange}
              error={touched.newPass && Boolean(errors.newPass)}
              helperText={touched.newPass && errors.newPass}
            />
          </label>
        </div>

        {isError && (
          <p className="change-pass__error">
            You have entered a wrong password
          </p>
        )}

        <div className="change-pass__form-submit">
          <MainButton
            type="button"
            text="skip"
            isSecondary={true}
            onHandleClick={handleClose}
          />

          <MainButton
            type="submit"
            text="Create"
            isDisabled={formik.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};
