const Third = ({ formData }) => {
  return (
    <div>
      <h1>Verify Your Details</h1>
      <p>name: {formData.name}</p>
      <br />
      <p>Email: {formData.email}</p>
      <br />
      <p>Employment: {formData.employment_status}</p>
      <br />
    </div>
  );
};

export default Third;
