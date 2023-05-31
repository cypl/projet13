const features = [
        {
            iconSource: "/assets/icon-chat.png",
            iconAlt: "Chat Icon",
            name: "You are our #1 priority",
            description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
            iconSource: "/assets/icon-money.png",
            iconAlt: "Money Icon",
            name: "More savings means higher rates",
            description: "The more you save with us, the higher your interest rate will be!"
        },
        {
            iconSource: "/assets/icon-security.png",
            iconAlt: "Security Icon",
            name: "Security you can trust",
            description: "We use top of the line encryption to make sure your data and money is always safe."
        }
    ];
    
function Features(){
    
    return(
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {features.map((f, index) => (
                <div className="feature-item" key={index}>
                    <img src={f.iconSource} alt={f.iconAlt} className="feature-icon" />
                    <h3 className="feature-item-title">{f.name}</h3>
                    <p>{f.description}</p>
                </div>
            ))}
        </section>
    )
}

export default Features