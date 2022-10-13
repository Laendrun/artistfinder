# GET /api/v1/types/

Get all types from the database.

This route requires a token that has the Admin role.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
GET https://www.artistfinder.world/api/v1/types/
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
		"type_id": 1,
		"type_name": "Type name."
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