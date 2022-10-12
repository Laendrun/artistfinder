# DELETE /api/v1/artists/:id

Deletes artist where `id` = :id.

This route requires a token that has the Admin role, or the user is the owner of the artist.

## Request example

```
DELETE https://www.artistfinder.world/api/v1/artists/:id
```
Request Parameters
```
id: must be an Int being the id of the user.
```
Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA
```
Body:
```
No required body.
```

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
    "message": "Resource deleted.",
    "id": deleteId,
}
```

### "You fucked up"

Status: **400**
```json
{
  "message": "ValidationError: error description"
}
```
Status: **404**
```json
{
  "message": "Requested resource not found."
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
  "message": "Unable to delete data from the database."
}
```