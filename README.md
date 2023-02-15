# PortfolioMaker

## Web application for creating your own portfolio site.

This is full stack project. Base idea is that
user can create his own account. Customize data,
links, pictures and upload his resume. Finish
result is a full portfolio website that user can
share with the world.

Project was created with React, MongoDB, Node,
Express.

Sone future features:

- changing style of website, different templates,
  colors etc.

## HOW TO RUN PROJECT

- download this repository to your local machine
- in both client and server folders run command
  <code>npm install</code>
- in server folder run code <code>node
  generateKeypairs.js</code> to crete your own RSA
  key for encryption.
- you need to have MongoDB on your local machine
  or account in a cloud. [MongoDB
  website](https://cloud.mongodb.com/)
- project also includes other third party
  technologies that we need to have accounts:
  [Sendgrid](https://app.sendgrid.com/),
  [Cloudinary](https://cloudinary.com/),
- After setting up your accounts create .env file
  inside of server folder. Update this file with
  your credentials from accounts:

```
NODE_ENV=development

DB_STRING= your local link to MongoDB

DB_STRING_PROD= your ling to MongoDB in cloud

SENDGRID_API_KEY= your API key from Sendgrid

CLOUD_NAME= cloud name from Cloudinary

API_KEY=API key from Cloudinary

API_SECRET= API SECRET key from Cloudinary
```

- after everything is set up run server and client
  folde commant <code>npm run dev</code>

  Enjoy your Portfolio Maker app!



Credits: Special thanks go to for Jen Kramer from
Frondendmasters for idea and design inspiration.
