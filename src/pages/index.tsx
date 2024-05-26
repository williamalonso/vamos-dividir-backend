import { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { GetServerSideProps } from 'next';

interface DocsProps {
  spec: any; // Aqui tipamos explicitamente como any
}

const DocsPage = ({ spec }: DocsProps) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/swagger.json'); // Altere o URL conforme necessário
    const spec = await res.json();
    return { props: { spec } };
  } catch (error) {
    console.error('Error fetching Swagger spec:', error);
    return { props: { spec: null } };
  }
};

export default DocsPage;
