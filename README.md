# Popnailscz - Next.js Project

Popnailscz is a web application built with [Next.js](https://nextjs.org/) for a nail salon based in Prague. This project is designed to provide a dynamic, multilingual website to display services, gallery, booking options, and more for customers in Czech, English, and Russian languages.

## Features

- **Multilingual Support:** The site supports Czech, English, and Russian languages.
- **Dynamic Content:** Uses Strapi as a headless CMS to manage content.
- **SEO Optimization:** Configured for SEO with Open Graph and Twitter metadata.
- **TailwindCSS Styling:** Custom responsive design with TailwindCSS.
- **Caching and Revalidation:** Uses Next.js ISR (Incremental Static Regeneration) to cache and revalidate content.
- **Styled Components:** Uses custom fonts for a polished, professional look.

## Project Structure

```
popnailscz-nextjs-main/
├── public/                     # Public assets such as favicon, robots.txt, and sitemaps
├── src/                        # Source code for the project
│   ├── components/             # Reusable components
│   ├── pages/                  # Next.js pages
│   ├── styles/                 # Custom stylesheets and Tailwind configuration
├── next.config.js              # Next.js configuration file
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **Yarn** or **npm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/popnailscz-nextjs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd popnailscz-nextjs
   ```
3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

4. Create a `.env.local` file and add your environment variables, such as `STRAPI_BASE_URL`, `NEXT_REVALIDATE_TOKEN`, etc.

### Running the Development Server

To start the development server, run:

```bash
yarn dev
# or
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the project for production, run:

```bash
yarn build
# or
npm run build
```

After the build, start the production server:

```bash
yarn start
# or
npm start
```

### Deployment

The project can be deployed to platforms like Vercel, Netlify, or other services that support Next.js. Make sure to configure environment variables for your deployment.

## License

This project is licensed under a customized version of the MIT License specifically for Popnail CZ. The client has full rights to use, modify, and distribute the code as needed for internal purposes. See the [LICENSE](LICENSE) file for details.

## Contributing

This project was developed for Popnail CZ by АСУРСОФТ and is intended solely for the client's internal use. External contributions are not being accepted at this time.

## Contact

For any inquiries, please reach out to Popnailscz or developer company АСУРСОФТ.

