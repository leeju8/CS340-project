
const UpdateInvoiceForm = ({ invoices, users, subscriptions, backendURL, refreshInvoices }) => {

    return (
        <>
        <h2>Update an Invoice</h2>
        <form className='invoiceUpdateForm'>
            <label htmlFor="update_invoice_id">Invoice to Update: </label>
            <select
                name="update_invoice_id"
                id="update_invoice_id"
            >
                <option value="">Select an Invoice</option>
                {invoices.map((invoices) => (
                    <option key={invoices["Invoice ID"]} value={invoices["Invoice ID"]}>
                        {invoices["Invoice ID"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_invoice_date">Date: </label>
            <input
                type="date"
                name="add_invoice_date"
                id="add_invoice_date"
            />

            <label htmlFor="update_invoice_billing_address">Billing Address: </label>
            <input
                type="text"
                name="update_invoice_billing_address"
                id="update_invoice_billing_address"
            />

            
            <label htmlFor="update_invoice_user_id">User: </label>
            <select
                name="update_invoice_user_id"
                id="update_invoice_user_id"
            >
                <option value="">Select a User</option>
                {users.map((users, index) => (
                    <option value={users["User ID"]} key={index}>{users["User Name"]}</option>
                ))}
            </select>

            <label htmlFor="update_invoice_subscription_id">Subscription: </label>
            <select
                name="update_invoice_subscription_id"
                id="update_invoice_subscription_id"
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

export default UpdateInvoiceForm;