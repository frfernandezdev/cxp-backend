export const v1 = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'ConeXperto - API Restful v1',
    description: 'Conexperto API Restful v1',
    //termsOfService: 'https://mysite.com/terms',
    contact: {
      name: 'Fernando',
      email: 'frfernandez@mindstartups.com',
      url: 'https://mindstartups.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local Server',
    },
    {
      url: 'http://api-dev.conexperto.com/',
      description: 'Dev Server',
    },
    {
      url: 'https://api-qa.conexperto.com',
      description: 'QA Server',
    },
    {
      url: 'https://api-uat.conexperto.com',
      description: 'UAT Server',
    },
    {
      url: 'https://api.conexperto.com',
      description: 'Production Server',
    },
  ],
  tags: [
    {
      name: 'Users',
    },
  ],
};
