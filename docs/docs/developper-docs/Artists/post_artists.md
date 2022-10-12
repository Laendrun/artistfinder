# POST /api/v1/artists/

Inserts a new artist in the database.

This route requires the token of any logged in user.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
POST https://www.artistfinder.world/api/v1/artists/
```
Request Parameters
```
No required request parameters.
```
Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA
```
Body:
```json
{
  "artist_name": "Artist name",
  "artist_isGroup": 1,
  "type_id": 1,
  "style_id": 1
}
```

## Body fields description

- **artist_name**: Must be a string of length 4 - 40 characters. (Required)
- **artist_isGroup**: Must be a boolean (1 | 0). (Required)
- **type_id**: Must be an int -> referencing the `Types` table. (Required)
- **style_id**: Must be an Int -> referencing the `Styles` table. (Required)

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
    "message": "Resource created.",
    "id": insertId,
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
  "message": "Unable to insert data in the database."
}
```