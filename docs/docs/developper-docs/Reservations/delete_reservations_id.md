# DELETE /api/v1/reservations/:id

Delete a reservation in the database.

## Request example

```
DELETE https://www.artistfinder.world/api/v1/reservations/:id
```
Request Parameters
```
id: must be an int being the id of the reservation.
```
Header:
```
No required header.
There's no required header as the way to secure this route is not fully thought for now.
```
Body:
```
No required body.
```

## Response

### "Here you go"

Status: **200**
```json
{
  "message": "Resource deleted.",
  "id": updateId
}
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
  "message": "Unable to delete data from the database."
}
```