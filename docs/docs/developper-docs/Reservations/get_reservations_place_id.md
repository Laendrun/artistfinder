# GET /api/v1/reservations/place/:id

Get all reservations where `place_id` = :id.

## Request example

```
GET https://www.artistfinder.world/api/v1/reservations/place/:id
```
Request Parameters
```
id: must be an Int, representing the place_id.
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
		"reservation_id": 1,
		"reservation_date": "2022-08-19T22:00:00.000Z",
		"reservation_time": "18:00:00",
		"place_id": :id,
		"artist_id": 1,
		"category_id": 2
	},
  ...
]
```

### Response fields description

-	"reservation_id": int,
-	"reservation_date": date,
-	"reservation_time": String,
-	"place_id": int,
-	"artist_id": int,
-	"category_id": int

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