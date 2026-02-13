function Home() {
    return (
        <>
            <h1>Home page</h1>
            <div className="homepageDescription">
                <p>A software-as-a-service (SaaS) company needs to manage thousands of user accounts, user subscription tiers, and their account preferences. Their product has over 100,000 daily active users, and they offer different subscription tiers for access to more features at levels of Free tier ($0/month), Pro tier ($5/month), and Max tier ($10/month). A website with a backend database will allow the SaaS administrators to view and record Users to Preferences and Users to Subscriptions to Features. This would allow administrators to easily manage, add, and update new users, subscription tiers, software features, and account setting options. This database design also allows for transactions such as the creation of a new user, a user upgrading their subscription, or a user changing their account preferences, while keeping data consistent and easy to query for customer support and billing.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{display: "flex"}}>
                        <a href="/">Home</a>{" "}: Dashboard overview
                    </div>
                    <div style={{display: "flex"}}> 
                        <a href="/users">Users</a>{" "}: Add, update, or delete users
                    </div>
                    <div style={{display: "flex"}}> 
                        <a href="/invoices">Invoices</a>{" "}: Add, update, or delete invoices
                    </div>
                    <div style={{display: "flex"}}> 
                        <a href="/subscriptions">Subscriptions and Features</a>{" "}: Add, modify, or delete subscription tiers
                    </div>
                    <div style={{display: "flex"}}> 
                        <a href="/preferences">Preferences</a>{" "}: Add, modify, or delete user preferences
                    </div>
                </div>
            </div>
        </>
    )
} export default Home;