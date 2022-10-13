# GET /api/v1/users/

Get all users from the database.

## Request example

```
GET https://www.artistfinder.world/api/v1/users/
```
Request Parameters
```
No required parameters.
```
Header:
```
No required header.
```
Body:
```
No required body.
```

## Response

### "Here you go"

Status: **200**
```json
[
	{
		"user_id": 1,
		"user_username": "Username"
	},
  ...
]
```

### "You fucked up"

Status: **400**
```json
{
  "message": "Validation error: error description."
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