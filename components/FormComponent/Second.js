const Second = ({ formData, setFormData }) => {
  return (
    <div>
      <h1>Hi there</h1>
      <p>Testing the second page</p>
      <br />
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
        placeholder='Enter email'
        type='email'
      />
      <br />
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            employment_status: e.target.value,
          });
        }}
        type='text'
        placeholder='Enter employment status'
      />
    </div>
  );
};

export default Second;
