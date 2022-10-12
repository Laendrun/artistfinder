# POST /api/v1/reservations/

Insert a new reservation in the database.

## Request example

```
POST https://www.artistfinder.world/api/v1/reservations/
```
Request Parameters
```
No required parameters.
```
Header:
```
No required header.
There's no required header as the way to secure this route is not fully thought for now.
```
Body:
```json
	{
		"reservation_date": "2022-10-19",
		"reservation_time": "18:00",
		"place_id": 1,
		"artist_id": 1,
		"category_id": 2
	},
```

## Body fields description

-	"reservation_date": String, must follow the date format (see below).
-	"reservation_time": String, must follow the time format (see below).
-	"place_id": int -> referencing the `Places` table.
-	"artist_id": int -> referencing the `Artists` table.
-	"category_id": int -> referencing the `Categories` table.

### Date format

`reservation_date` must match the following regexp :
```regexp
/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/
```

### Time format

`reservation_time` must match the following regexp :
```regexp
/^([0-9]{2})\:([0-9]{2})$/
```

## Response

### "Here you go"

Status: **200**
```json
{
  "message": "Resource created",
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

### "I fucked up"

Status: **500**
```json
{
  "message": "Unable to insert data in the database."
}
```