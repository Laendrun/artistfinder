# POST /api/v1/auth/signup

Signup route.

## Request example

```
POST https://www.artistfinder.world/api/v1/signup
```
Header:
```
No required header
```
Body:
```json
{
  "user_fname": "First Name",
  "user_lname": "Last Name",
  "user_username": "laendrun",
  "user_email": "example@example.com",
  "user_password": "password",
  "confirm_password": "password"
}
```

### Body fields description

- **user_fname**: Must be a string of length 2 - 64 characters. (Required)
- **user_lname**: Must be a string of length 2 - 64 characters. (Required)
- **user_username**: Must be a string of length 2 - 64 characters. (Required)
- **user_email**: Must match the email regexp (see below). (Required)
- **user_password**: For now, no complexity is required. (Required)
- **confirm_password**: For now, no complexity is required. (Required)

Email regexp:
```regexp
/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
```

## Response

### "Here you go"

Status: **200**
```json
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA"
}
```

### "You fucked up"

Status: **400**
```json
{
  "message": "ValidationError: error description"
}
OR
{
  "message": "Passwords must match."
}
OR
{
  "message": "Username already exists."
}
OR 
{
  "message": "Email already exists."
}
```

### "I fucked up"

Status: **500**
```json
{
  "message": "Unable to get data from the database."
}
OR
{
  "message": "Unable to update data in the database."
}
OR
{
  "message": "Unable to insert data in the database."
}
OR
{
  "message": "Unable to delete data from the database."
}
```