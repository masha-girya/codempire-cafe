import React, { ChangeEventHandler } from 'react';
import {
  InputLabel,
  TextField,
} from '@mui/material';
import './comment.scss';

interface IProps {
  comment: string,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

export const OrderComment = (props: IProps) => {
  const {
    comment,
    handleChange,
  } = props;

  return (
    <div className="comment">
      <InputLabel id="comment">
        Add a comment
      </InputLabel>

      <TextField
        id="comment"
        name="comment"
        value={comment}
        onChange={handleChange}
        label="Your comment"
        multiline
        rows={4}
      />
    </div>
  );
};
