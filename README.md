# Cloud Calculator App

Cloud Calculator App is an app to calculate the total cost of different instances from different regions. It has the functionality to add multiple resources and calculate the ttal cost or to calculate a single resource.
It also has the functionality to check the prices of each resources across different regions so users can refer them and prepare accordingly.
It also has an edit button at the end so the users can delete and resources before submitting or view the resources and/or its details that has been added.
Finally it has a bill button that shows the details of all the resources that has been added and its price per unit and how it all added to the total cost.

## Table of Contents

- [Installation](##installation)
- [Folder Structure](##folder_structure)

## Installation

Instructions on how to install and set up the project locally.

---

## 🧰 Requirements

| Tool            | Required For           | Install Link                          |
|-----------------|------------------------|---------------------------------------|
| Git             | Cloning the project    | https://git-scm.com/downloads         |
| Node.js(v18.20.2| Frontend & Node backend| https://nodejs.org (LTS recommended)  |
| Java 17         | Spring Boot backend    | https://adoptium.net/                 |
| Maven           | Spring Boot backend    | https://maven.apache.org/install.html |

---

```bash

## 🔽 Clone the Repository

# Clone the repo
git clone https://github.com/niranjana-a11y/assg1_cloudcalculator.git

# Navigate into the project folder
cd your-repo

# Navigate into frontend
cd frontend

# Install dependencies (example)
npm install

# start Vite dev server (default: http://localhost:5173)
npm run dev         

# Navigate into backend
cd ..
cd backend

#Install dependencies
mvn clean install
mvn spring-boot:run

```

### Database setup

#### PostgreSQL Database Setup

✅ Requirements:
PostgreSQL installed locally
DBeaver (optional, for easier GUI access)

🔹 Step 1: Create a Database
Use DBeaver or psql to create a database:
```
CREATE DATABASE cloud_calculator;
```
🔹 Step 2: Import SQL Data
In DBeaver:
Open your PostgreSQL connection.
Open SQL Editor.
Run the file: init_data.sql
This creates adds sample data into two tables: region_prices and resource_prices, and .
🔹 Step 3: Configure Spring Boot to Connect to DB
In backend/src/main/resources/application.properties :

```
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_pg_username
spring.datasource.password=your_pg_password
```
Replace your_pg_username and your_pg_password with your actual PostgreSQL credentials.

After creating the database and entering entries into table, change create into update backend/src/main/resources/application.properties :

```
spring.jpa.hibernate.ddl-auto=create 
```
## Folder Structure
```
my-project-repo/
├── backend/  ← contains a copy of BackendApp
    └── src/
        └── main/
            └── java/com/example/assg1
                └── DTO/
                └── config/
                └── Controllers/
                └── entities/
                └── repositories/
                └── services/
                └── Assg1Application.java
            └── resources
                └── pplication.properties
        └── pom.xml
└── frontend/  ← contains a copy of FrontendApp
    └── public/
    └── src/
        └── assets/
            └── App.jsx
            └── App.css
            └── FormPage.jsx
            └── FormPage.css
            └── CalculateBox.jsx
            └── CalculateBox.css
            └── main.jsx
└── init_data.sql/ 
