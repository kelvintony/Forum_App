const First = ({ formData, setFormData }) => {
  return (
    <div>
      <h1>Hi there</h1>
      <p>To start with, whats your beautiful name?</p>
      <br />
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            name: e.target.value,
          });
        }}
        type='text'
        placeholder='Enter Name'
      />
    </div>
  );
};

export default First;
