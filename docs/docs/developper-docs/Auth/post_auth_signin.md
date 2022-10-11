# POST /api/v1/auth/signin

Signin route.

## Request example

```
POST https://www.artistfinder.world/api/v1/signin
```
Header:
```
No required header
```
Body:
```json
{
  "user_username": "laendrun",
  "user_password": "password",
}
OR
{
  "user_email": "example@example.com",
  "user_password": "password"
}
```

### Body fields description

- **user_username**: Must be a string of length 2 - 64 characters. (Required)
- **user_email**: Must match the email regexp (see below). (Required)
- **user_password**: For now, no complexity is required. (Required)

You can either signin using username/password pair or email/password pair.

**Note**: for now, you can't send both *user_username* AND *user_email* fields in the same request.

## Response

### "Here you go"

Status: **200**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA"
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
  "message": "Unable to login."
}
OR
{
  "message": "User blocked by an administrator."
}
```

### "I fucked up"

Status: **500**
```json
{
  "message": "Unable to get data from the database."
}
```