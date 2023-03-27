const Contacts = ({ contacts }) => {
  return (
    <ul className="contacts">
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
