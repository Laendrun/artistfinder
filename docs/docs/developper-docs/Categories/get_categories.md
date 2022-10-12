# GET /api/v1/categories

Get all `categories`.

## Request example

```
GET https://www.artistfinder.world/api/v1/categories
```
Request Parameters
```
No required request parameters.
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
		"category_id": 1,
		"category_name": "Category name"
	},
  ...
]
```

### Response fields description

- "category_id": int
- "category_name": String

### "You fucked up"

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