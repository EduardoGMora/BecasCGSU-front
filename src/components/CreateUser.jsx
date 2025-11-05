import { EditUser } from './EditUser';

export const CreateUser = ({ onClose, onSave }) => {
  return (
    <EditUser
      onClose={onClose}
      onSave={onSave}
    />
  );
};