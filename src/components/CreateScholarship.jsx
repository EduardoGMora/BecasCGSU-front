import { EditScholarship } from './EditScholarship';

export const CreateScholarship = ({ onClose, onSave }) => {
  return (
    <EditScholarship
      onClose={onClose}
      onSave={onSave}
    />
  );
};