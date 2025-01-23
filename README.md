# WriteVerse

WriteVerse is a modern blogging platform that allows users to create, publish, and manage their blog content. With a robust authentication system and user profiles, WriteVerse provides a seamless experience for both writers and readers.

## Features

- User authentication system
- Create and publish blog posts
- View published blog posts
- User profiles with customizable bio
- Responsive design for various devices

## Technology Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with TypeScript
- **API**: GraphQL
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)

## Database Schema

### Post

- id: Int (Primary Key)
- title: String
- content: String
- authorId: Int (Foreign Key to User)
- createdAt: DateTime
- updatedAt: DateTime
- published: Boolean

### User

- id: Int (Primary Key)
- name: String
- email: String (Unique)
- password: String (Hashed)
- createdAt: DateTime
- updatedAt: DateTime
- profile: Profile (One-to-One relation)

### Profile

- id: Int (Primary Key)
- bio: String
- createdAt: DateTime
- updatedAt: DateTime
- userId: Int (Foreign Key to User)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
