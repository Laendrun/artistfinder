# GET /api/v1/users/:id

Get user from the database where `user_id` = :id.

This route requires the token from the user you want to get information from.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
GET https://www.artistfinder.world/api/v1/users/:id
```
Request Parameters
```
id: must be an Int being the id of the user.
```
Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA
```
Body:
```
No required body.
```
## Header description

The **Authorization** must match the following regexp :
```regexp
/^(Bearer) ([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+\w$/
```

## Response

### "Here you go"

Status: **200**
```json
[
	{
		"user_id": 1,
		"user_fname": "Firstname",
		"user_lname": "Lastname",
		"user_username": "Username",
		"user_email": "example@email.com",
		"pass_id": 1,
		"type_id": 1,
		"role_id": 1,
		"artist_id": null,
		"place_id": null,
		"user_login_type": 0,
		"user_blocked": 0,
		"user_softDeleted": 0
	}
]
```

### "You fucked up"

Status: **400**
```json
{
  "message": "Validation error: error description."
}
```
Status: **401**
```json
{
	"message": "🚫 Unauthorized 🚫"
}
```
Status: **404**
```json
{
  "message": "Requested resource not found."
}
```

### "I fucked up"

Status: **500**
```json
{
  "message": "Unable to get data from the database."
}
```