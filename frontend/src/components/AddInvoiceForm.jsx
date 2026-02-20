const AddInvoiceForm = ({ users, subscriptions, refreshInvoices }) => {

    return (
        <>
        <h2>Add an Invoice</h2>

        <form className='addInvoiceForm'>
            <label htmlFor="add_invoice_date">Invoice Date: </label>
            <input
                type="date"
                name="add_invoice_date"
                id="add_invoice_date"
            />

            <label htmlFor="add_invoice_billing_address">Billing Address: </label>
            <input
                type="text"
                name="add_invoice_billing_address"
                id="add_invoice_billing_address"
            />

            <label htmlFor="add_invoice_user_id">User: </label>
            <select
                name="add_invoice_user_id"
                id="add_invoice_user_id"
            >
                <option value="">Select a User</option>
                {users.map((users, index) => (
                    <option value={users["User ID"]} key={index}>{users["User ID"]}</option>
                ))}
            </select>

            <label htmlFor="add_invoice_subscription_id">Subscription: </label>
            <select
                name="add_invoice_subscription_id"
                id="add_invoice_subscription_id"
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions, index) => (
                    <option value={subscriptions["Subscription ID"]} key={index}>{subscriptions["Subscription Name"]}</option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );
};

export default AddInvoiceForm;