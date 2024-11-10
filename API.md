# API Specification

Base URL: `http://localhost:3333`

## Authentication

Most endpoints require authentication via a JWT token in the authorization header:

```http
Authorization: Bearer <token>
```

## User Endpoints

### Create User

Create a new user account.

**URL**: `POST /v1/user/create`

**Auth required**: No

#### Request Body

```ts
{
  name: string;    // max 50 characters
  email: string;   // valid email format
  password: string;
}
```

#### Response

```ts
{
  user: {
    id: string;        // UUID
    name: string;
    email: string;
    created_at: Date;
  };
  token: string;     // JWT token
}
```

**Status Codes**:

- 201: User created successfully
- 400: Failed to create user

### Authenticate User

Authenticate user and get JWT token.

**URL**: `POST /v1/user/auth`

**Auth required**: No

#### Request Body

```typescript
{
  name?: string;    // max 50 characters
  email?: string;   // valid email format
  password: string;
}
```

Note: Either name or email must be provided

#### Response

```typescript
{
  user: {
    id: string;        // UUID
    name: string;
    email: string;
    created_at: Date;
  };
  token: string;     // JWT token
}
```

**Status Codes**:

- 200: Authentication successful
- 400: Invalid credentials or missing identifier
- 409: User does not exist

### Edit User

Update user details.

**URL**: `PUT /v1/user/edit`

**Auth required**: Yes

#### Request Body

```ts
{
  name?: string;    // max 50 characters
  email?: string;   // valid email format
}
```

#### Response

```ts
{
  id: string;        // UUID
  name: string;
  email: string;
  created_at: Date;
}
```

**Status Codes**:

- 200: User updated successfully
- 409: User does not exist
- 500: Failed to edit user details

### Delete User

Delete user account.

**URL**: `DELETE /v1/user/delete`

**Auth required**: Yes

**Status Codes**:

- 204: User deleted successfully
- 409: User does not exist
- 500: Failed to delete user

---

## List Endpoints

### Get All Lists

Get all lists for authenticated user.

**URL**: `GET /v1/lists`

**Auth required**: Yes

#### Response

```ts
Array<{
  id: string;          // UUID
  name: string;        // max 255 characters
  content: string;
  description?: string;
  type: 'bullet' | 'check' | 'numbered';
  user_id: string;     // UUID
  created_at: Date;
}>
```

### Create List

Create a new list.

**URL**: `POST /v1/list/create`

**Auth required**: Yes

#### Request Body

```ts
{
  name: string;        // max 255 characters
  content: string;
  description?: string;
  type: 'bullet' | 'check' | 'numbered';
}
```

#### Response

```ts
{
  id: string;          // UUID
  name: string;
  content: string;
  description?: string;
  type: 'bullet' | 'check' | 'numbered';
  user_id: string;     // UUID
  created_at: Date;
}
```

**Status Codes**:

- 201: List created successfully
- 409: List with same name already exists

### Edit List

Update list details.

**URL**: `PUT /v1/list/edit`

**Auth required**: Yes

#### Request Body

```ts
{
  id: string;          // UUID
  name?: string;       // max 255 characters
  content?: string;
  description?: string;
  type?: 'bullet' | 'check' | 'numbered';
}
```

#### Response

```ts
{
  id: string;          // UUID
  name: string;
  content: string;
  description?: string;
  type: 'bullet' | 'check' | 'numbered';
  user_id: string;     // UUID
  created_at: Date;
}
```

**Status Codes**:

- 200: List updated successfully
- 409: List does not exist
- 500: Failed to edit list details

### Delete List

Delete a list.

**URL**: `DELETE /v1/list/delete`

**Auth required**: Yes

#### Request Body

```ts
{
  id: string;    // UUID
}
```

**Status Codes**:

- 204: List deleted successfully
- 409: List does not exist
- 500: Failed to delete list

---

## Tag Endpoints

### Get All Tags

Get all tags for authenticated user.

**URL**: `GET /v1/tags`

**Auth required**: Yes

#### Response

```ts
Array<{
  id: string;          // UUID
  name: string;        // max 50 characters
  user_id: string;     // UUID
  created_at: Date;
}>
```

### Get List Tags

Get all tags for a specific list.

**URL**: `GET /v1/list/:list_id/tags`

**Auth required**: Yes

#### URL Parameters

- `list_id`: UUID of the list

#### Response

```ts
Array<{
  id: string;          // UUID
  name: string;        // max 50 characters
  user_id: string;     // UUID
  created_at: Date;
}>
```

### Create Tag

Create a new tag.

**URL**: `POST /v1/tag/create`

**Auth required**: Yes

#### Request Body

```ts
{
  name: string;    // max 50 characters
}
```

#### Response

```ts
{
  id: string;          // UUID
  name: string;
  user_id: string;     // UUID
  created_at: Date;
}
```

**Status Codes**:

- 201: Tag created successfully
- 409: Tag with same name already exists

### Edit Tag

Update tag details.

**URL**: `PUT /v1/tag/edit`

**Auth required**: Yes

#### Request Body

```ts
{
  id: string;      // UUID
  name: string;    // max 50 characters
}
```

#### Response

```ts
{
  id: string;          // UUID
  name: string;
  user_id: string;     // UUID
  created_at: Date;
}
```

**Status Codes**:

- 200: Tag updated successfully
- 409: Tag does not exist
- 500: Failed to edit tag details

### Delete Tag

Delete a tag.

**URL**: `DELETE /v1/tag/delete`

**Auth required**: Yes

#### Request Body

```ts
{
  id: string;    // UUID
}
```

**Status Codes**:

- 204: Tag deleted successfully
- 409: Tag does not exist
- 500: Failed to delete tag

### Remove Tag from List

Remove a tag from a specific list.

**URL**: `DELETE /v1/list/:list_id/tag/:tag_id`

**Auth required**: Yes

#### URL Parameters

- `list_id`: UUID of the list
- `tag_id`: UUID of the tag

**Status Codes**:

- 204: Tag removed from list successfully
- 404: Tag not found
- 409: Failed to remove tag from list

## Schemas

### Request Schemas (Zod)

```ts
// User Schemas
const CreateUserSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  password: z.string(),
});

const AuthUserSchema = z.object({
  name: z.string().max(50).optional(),
  email: z.string().email().optional(),
  password: z.string(),
});

const EditUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(50).optional(),
  email: z.string().email().optional(),
});

// List Schemas
const CreateListSchema = z.object({
  name: z.string().max(255),
  content: z.string(),
  description: z.string().optional(),
  type: z.enum(['bullet', 'check', 'numbered']),
});

const EditListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255).optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['bullet', 'check', 'numbered']).optional(),
});

const DeleteListSchema = z.object({
  id: z.string().uuid(),
});

// Tag Schemas
const CreateTagSchema = z.object({
  name: z.string().max(50),
});

const EditTagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(50),
});

const DeleteTagSchema = z.object({
  id: z.string().uuid(),
});

const ListIdParamSchema = z.object({
  list_id: z.string().uuid(),
});

const ListTagParamsSchema = z.object({
  list_id: z.string().uuid(),
  tag_id: z.string().uuid(),
});
```

### Response Types (TypeScript)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface List {
  id: string;
  name: string;
  content: string;
  description?: string;
  type: 'bullet' | 'check' | 'numbered';
  user_id: string;
  created_at: Date;
}

interface Tag {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
}

interface ErrorResponse {
  message: string;
}
```
