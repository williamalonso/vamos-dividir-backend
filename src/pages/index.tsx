import { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { GetServerSideProps } from 'next';

interface DocsProps {
  spec: any; // Aqui tipamos explicitamente como any
}

const DocsPage = ({ spec }: DocsProps) => {

  console.log(spec)
  
  if (!spec) {
    return <div>Loading...teste</div>;
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
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'; // Obtemos o host dinamicamente
    const res = await fetch(`${baseUrl}/api/swagger.json`); // Usamos o caminho relativo
    const spec = await res.json();
    return { props: { spec } };
  } catch (error) {
    console.error('Error fetching Swagger spec:', error);
    return { props: { spec: null } };
  }
};

export default DocsPage;
