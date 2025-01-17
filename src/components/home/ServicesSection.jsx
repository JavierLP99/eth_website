import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';


const ServicesSection = () => {
  const [servicesData, setServicesData] = useState([]);
  const [sectionContent, setSectionContent] = useState({ title: '', description: '' });
  const [visibleServices, setVisibleServices] = useState(6);

  useEffect(() => {
    // Fetch services data
    fetch('/services.json')
      .then((response) => response.json())
      .then((data) => setServicesData(data.services))
      .catch((error) => console.error('Error loading services:', error));

    // Fetch section content from home.json
    fetch('/home.json')
      .then((response) => response.json())
      .then((data) => setSectionContent(data.servicesSection))
      .catch((error) => console.error('Error loading home content:', error));
  }, []);

  const loadMoreServices = () => {
    setVisibleServices((prev) => prev + 6);
  };

  if (!servicesData.length || !sectionContent.title) return <div>Loading...</div>;

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4 text-primary" id='services'>{sectionContent.title}</h2>
        <p className="mb-5">{sectionContent.description}</p>
        <div className="row">
          {servicesData.slice(0, visibleServices).map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              name={service.name}
              description={service.description}
              link={service.link}
              details={sectionContent.detailsLabel}
            />
          ))}
        </div>
        {visibleServices < servicesData.length && (
          <button className="btn btn-primary mt-4 px-6 rounded-0 text-light" onClick={loadMoreServices}>
            {sectionContent.moreLabel}
          </button>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
