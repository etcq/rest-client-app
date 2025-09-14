
<a id="readme-top"></a>
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/images/logo.svg" alt="Logo" width="80" height="80">
  </a>
  <h1 align="center">RESTful client app</h1>
</div>


<details>
  <summary><h2>Table of contents</h3></summary>
  <ol>
    <li>
      <a href="#about-project">About project</a>
      <ul>
        <li><a href="#description">Description</a></li>
        <li><a href="#application-structure">Application structure</a></li>
        <li><a href="#-key-benefits">Key benefits</a></li>
        <li><a href="#technologies-used">Technologies Used</a></li>
        <li><a href="#project-architecture">Project architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#setup-instructions">Setup Instructions</a></li>
        <li><a href="#scripts-in-project">Scripts in project</a></li>
      </ul>
    </li>
    <li>
      <a href="#the-following-people-were-involved-in-the-project">The following people were involved in the project</a>
    </li>
  </ol>
</details>

## About Project


### Description

This is the final project for the React course at Rsschool, a programming school. The aim of the project is to create a lightweight version of Postman within a single app.

### Application structure

1. Main page
2. User registration/authentication.
3. RESTful client, which includes:
   - method selector
   - text input for the endpoint URL
   - request editor
   - headers editor
   - response section
   - generated code section
4. Variables
5. History

### 🔥 Key Benefits

- 🧭 **Intuitive and friendly UI**
- ⚡ **Fast loading and responsive design**
- 🛠️ **Modern tech stack (SSR)**
- 🛍️ **Added a lot feature, like a variables**

### Technologies Used

##### Main language
<ul>
  <li>
    <a href="https://www.typescriptlang.org/">
      <img width="20" height="20" alt="ts" src="https://github.com/user-attachments/assets/ee98179c-3f48-4c1a-9ff8-149104908cc2" />   Typescript
    </a>
  </li>
</ul>

##### Main frameworks and libraries
<ul>
  <li>
    <a href="https://nextjs.org/">
      <img width="20" height="20" alt="nextjs" src="https://github.com/user-attachments/assets/32e78665-1097-48aa-a1df-fe7066f952fa" />     Nextjs
    </a>
  </li>
  <li>
    <a href="https://sass-lang.com/">
  <img width="20" height="20" alt="sass" src="https://github.com/user-attachments/assets/3377a403-5b34-4940-adb3-35b0a2d053f3" /> SCSS
    </a>
  </li>
    <li>
    <a href="https://mui.com/material-ui/">
       <img width="20" height="20" alt="mui" src="https://github.com/user-attachments/assets/f5559eba-6aac-409d-8879-51e27e922890" />
 Material UI
    </a>
  </li>
    <li>
    <a href="https://zustand.docs.pmnd.rs/">
      <img width="20" height="20" alt="zustand" src="https://github.com/user-attachments/assets/628b9872-0f57-487e-b8b1-03d2ed4a636b" />  Zustand
    </a>
  </li>
</ul>
  
##### Linters 
<ul>
  <li>
    <a href="https://eslint.org/">
       <img width="20" height="20" alt="eslint" src="https://github.com/user-attachments/assets/74d78cc4-ff18-4883-bdc2-5d80146fcfc5" /> ESLint
    </a>
  </li>
  <li>
    <a href="https://prettier.io/">
      <img width="20" height="20" alt="prettier" src="https://github.com/user-attachments/assets/da74e4d3-6e23-4f55-a671-62c5bab39eec" /> Prettier
    </a>
  </li>
  <li>
    <a href="https://github.com/lint-staged/lint-staged">
      <img width="20" height="20" alt="lint-staged" src="https://github.com/user-attachments/assets/e510e2e3-4ae0-4738-9826-5cb5f87ed8c4" /> Lint-staged
    </a>
  </li>
</ul>

##### Git hooks

<ul>
  <li>
    <a href="https://typicode.github.io/husky/">🐶 Husky</a>
  </li>
</ul>

##### Testing
<ul>
  <li>
    <a href="https://vitest.dev/">
        <img width="20" height="20" alt="vitest" src="https://github.com/user-attachments/assets/d2cee1fd-02ee-4dbb-bb31-816fe736d6d1" /> Vitest
    </a>
  </li>
  <li>
    <a href="https://testing-library.com/docs/react-testing-library/intro/">
     <img width="20" height="20" alt="rtl" src="https://github.com/user-attachments/assets/6696c50d-35e5-49d5-ae18-60d62ce8f7b4" /> React testing library
    </a>
  </li>
</ul>

### Project architecture

- styles - styles files (global, mixins, variables)
- components - React components for creating pages
- app - Next js app routing
- interfaces - interfaces for Project
- constants - reusable constants
- test - for testing files
- hooks - custom hooks
- providers - include components with all context providers
- services - include all services for interaction with the backend and other remote applications
- store - all zustand stores
- theme - material UI theme
- utils - helping utilities

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

### Setup Instructions

1. Install Node.js (Node version >= v22.13.1)

  ```sh
  npm install npm@latest -g
  ```

2. Obtain the Project Files: you have two options for obtaining the project files:

- Fork the Repository: If you plan to contribute to the project or make changes to the code, it's recommended to fork the repository. This will create a copy of the repository under your GitHub account. [Fork the repository](https://github.com/etcq/rest-client-app/fork) to create a copy under your account.

- Download the Repository: If you only intend to use the project locally and don't plan to contribute changes, you can simply download the repository as a ZIP file. [Download the repository](https://github.com/etcq/rest-client-app/archive/refs/heads/main.zip) as a ZIP file and extract it to your local machine.

3. Clone the Repository (if Forked): if you forked the repository, clone your newly created repo to your local machine using the following command:

```
git clone https://github.com/YOUR-USERNAME/rest-client-app.git
```

4. Navigate to the Project Directory: once you have obtained the project files (either by forking or downloading), navigate to the project directory:

```
cd rest-client-app
```

5. To install all dependencies use:

```
npm install
```

Create a .env file in the root directory of the project: refer to the .env.example file as a reference or template for configuring .env file and add the environment variables with your own values.

6. Run development version: 

```
npm run dev
```

7. Build the Project:

to build the project, use the following command:

```
npm run build
```

8. Preview the Project: to preview the project, use the following command:

```
npm run preview
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Scripts in project

1. `npm run dev` - to run develop mode
2. `npm run build` - to build project in `dist` folder
3. `npm run start` - to preview project
4. `prepare` - init husky in project
5. `lint` - to lint typescript and react components files with ESlint
8. `format:fix` - to fix linting issues TS and SCSS file with prettier and stylelint
9. `test` - to run vitest testing mode
10. `coverage` - to run vitest coverage


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## The following people were involved in the project

### Authors

- [aQafresca](https://github.com/aQafresca)
- [turik777](https://github.com/turik777)
- [etcq](https://github.com/etcq)

### Mentors

- [aleksey-drozdov](https://github.com/aleksey-drozdov)
- [micolka](https://github.com/micolka)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
