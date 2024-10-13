# DevBoxServer

DevBoxServer is a Node.js backend application that provides an API for code compilation across various programming languages.

The official backend application to [DevBox](https://github.com/Exclusiveideas/DevBox) code editor.

![Screenshot (208)](https://github.com/user-attachments/assets/832af665-b770-4404-aa36-a914558f4cbd)

## Features

- Supports over 20 popular programming languages, including:
  - JavaScript
  - TypeScript
  - Python
  - Java
  - C#
  - C++
  - PHP
  - Go
  - Ruby
  - Swift
  - Rust
  - HTML
  - CSS
  - JSON
  - YAML
  - Markdown
  - SQL
  - Shell scripting (bash)
  - XML
  - R
  - CoffeeScript
  - GraphQL
  - LESS
  - SCSS

- Compiles code in these languages and provides results.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- Docker (optional, for containerization)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/devboxserver.git
   cd devboxserver
2. Install dependencies:
 ```bash
   npm install
```

### Running the App
To run the app locally, use the following command:

```bash
npm start
```
Open your browser and navigate to http://localhost:8080 to start using DevBoxServer.


## Using Docker

### Build the Docker Image

To build the Docker image, use the following command:

```bash
docker build -t yourusername/devboxserver:1.0 .
```

### Run the Docker Container
To run the Docker container, use the following command:

```bash
docker run -p 5000:8080 yourusername/devboxserver:1.0
```


## Contributing

We welcome contributions to DevBoxServer! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.


## License

DevBoxServer is open source and distributed under the MIT License. 

## Contact

For any questions or feedback, please open an issue on GitHub or reach out to me on [Linkedln](https://www.linkedin.com/in/muftau/).
