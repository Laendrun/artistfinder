# GET /api/v1/styles/:id

Get style from the database where `style_id` = :id.

## Request example

```
GET https://www.artistfinder.world/api/v1/styles/:id
```
Request Parameters
```
id: must be an Int being the id of the role.
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
		"style_id": 1,
		"style_name": "Style name."
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