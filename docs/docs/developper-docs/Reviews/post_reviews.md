# POST /api/v1/reviews/

Insert a new review in the database.

This route requires the token of any logged in user.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
POST https://www.artistfinder.world/api/v1/reviews/
```
Request Parameters
```
No required parameters.
```
Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA
```
Body:
```json
	{
		"review_rating": 4,
		"review_text": "blabliblu",
		"user_id": 2,
		"place_id": 1,
		"artist_id": 1
	}
```

## Body fields description

-	"review_rating": int, 0 - 5.
-	"review_text": String.
-	"user_id": int, referencing the `Users` table.
-	"place_id": int, referencing the `Places` table.
-	"artist_id": int, referencing the `Artists` table.

## Response

### "Here you go"

Status: **200**
```json
{
  "message": "Resource created.",
  "id": insertId
}
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

### "I fucked up"

Status: **500**
```json
{
  "message": "Unable to insert data in the database."
}
```