// pages/api-docs.tsx

import React from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const ApiDocs: React.FC = () => (
  <SwaggerUI url="/api/swagger" />
);

export default ApiDocs;
