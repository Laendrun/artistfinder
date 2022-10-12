# GET /api/v1/reservations/date/after/:date

Get all reservations where `date` >= :date.

## Request example

```
GET https://www.artistfinder.world/api/v1/reservations/date/after/:date
```
Request Parameters
```
date: must respect the date format (see below).
```
Header:
```
No required header.
```
Body:
```
No required body.
```
### Date format
```regexp
/^([0-9]{4})-([0-1][0-9])-([0-3][0-9])$/
```

## Response

### "Here you go"

Status: **200**
```json
[
	{
		"reservation_id": 1,
		"reservation_date": :date,
		"reservation_time": "18:00:00",
		"place_id": 1,
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