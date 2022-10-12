# GET /api/v1/reviews/

Get all reviews.

## Request example

```
GET https://www.artistfinder.world/api/v1/reviews/
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
		"review_id": 3,
		"review_rating": 4,
		"review_text": "blabliblu",
		"user_id": 2,
		"place_id": 1,
		"artist_id": 1
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