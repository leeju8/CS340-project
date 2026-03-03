function Navigation({ backendURL }) {
  const resetTables = async () => {
      try {
          const response = await fetch(`${backendURL}/reset`, {
              method: 'POST',
          });

          if (response.ok) {
              alert('Tables reset successfully.');
              // Optional: force reload so all pages re-fetch data
              window.location.reload();
          } else {
              alert('Reset failed.');
          }
      } catch (err) {
          alert('Error resetting tables.');
      }
  };

  return (
      <nav>
          Navigation:
          <button onClick={resetTables}>
              RESET TABLES
          </button>
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/invoices">Invoices</a>
          <a href="/subscriptions">Subscriptions and Features</a>
          <a href="/preferences">Preferences</a>
      </nav>
  );
}

export default Navigation;