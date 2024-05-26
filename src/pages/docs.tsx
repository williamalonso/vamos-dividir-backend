// src/pages/docs.tsx
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });

const DocsPage = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/swagger.json')
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-6">
      <section className="container">
        <SwaggerUI spec={spec} />
      </section>
    </div>
  );
};

export default DocsPage;