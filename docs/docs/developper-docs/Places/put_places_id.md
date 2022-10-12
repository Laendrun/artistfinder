# PUT /api/v1/places/:id

Updates places where `id` = :id;

This route requires a token that has the Admin role, or the user is the owner of the place.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
PUT https://www.artistfinder.world/api/v1/places/:id
```
Request Parameters
```
id: must be an Int being the id of the place.
```
Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA
```
Body:
```json
{
  "place_name": "Place name",
  "place_capacity": 100,
  "place_address": "Place address",
  "place_postCode": place_postCode,
  "place_city": "Place city"
}
```
## Body fields description

-	"place_name": String,
-	"place_capacity": int,
-	"place_address": String,
-	"place_postCode": int,
-	"place_city": String

## Header description

The **Authorization** must match the following regexp :
```regexp
/^(Bearer) ([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+\w$/
```

## Response

### "Here you go"

Status: **200**
```json
{
    "message": "Resource updated.",
    "id": updateId,
}
```

### "You fucked up"

Status: **400**
```json
{
  "message": "ValidationError: error description"
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
  "message": "Unable to update data in the database."
}
```