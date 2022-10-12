# GET /api/v1/places/capacity/is/:capacity

Get all places with `capacity` = :capacity.

## Request example

```
GET https://www.artistfinder.world/api/v1/places/capacity/is/:capacity
```
Request Parameters
```
capacity: must be an Int, the capacity of the place.
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
		"place_id": 1,
		"place_name": "Place name.",
		"place_capacity": :capacity,
		"place_address": "Place address",
		"place_postCode": place_postCode,
		"place_city": "Place city",
		"place_validated": 0
	},
  ...
]
```

### Response fields description

- "place_id": int.
-	"place_name": String.
-	"place_capacity": int.
-	"place_address": String.
-	"place_postCode": int.
-	"place_city": String.
- "place_validated": (boolean) 1 or 0.

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