const FormWrapper = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {children}
    </form>
  );
};

export default FormWrapper;
