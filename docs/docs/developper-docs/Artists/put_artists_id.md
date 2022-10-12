# PUT /api/v1/artists/:id

Updates artist where `id` = :id.

This route requires a token that has the Admin role, or the user is the owner of the artist.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
PUT https://www.artistfinder.world/api/v1/artists/:id
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
```json
{
  "artist_name": "Artist name",
  "artist_isGroup": 1,
  "type_id": 1,
  "style_id": 1
}
```

### Body fields description

- **artist_name**: Must be a string of length 4 - 40 characters. (Required)
- **artist_isGroup**: Must be a boolean (1 | 0). (Required)
- **type_id**: Must be an int -> referencing the `Types` table. (Required)
- **style_id**: Must be an Int -> referencing the `Styles` table. (Required)

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
  "message": "Unable to update data in the database."
}
```