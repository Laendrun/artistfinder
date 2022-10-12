# GET /api/v1/artists/unverified/notgroups/

Get all `unverified` not groups.

This route requires a token that has the Admin role.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
GET https://www.artistfinder.world/api/v1/artists/unverified/groups/
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
[
	{
		"artist_id": 0,
		"artist_name": "Artist name",
		"artist_isGroup": 0,
		"artist_validated": 0,
		"type_id": 1,
		"style_id": 1
	},
  ...
]
```

### Response fields description

- "artist_id": int
- "artist_name": String
- "artist_isGroup": (boolean) 0.
- "artist_validated": (boolean) 0.
- "type_id": int -> referencing the `Types` table.
- "style_id": int -> referencing the `Styles` table.

### "You fucked up"

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
  "message": "Unable to get data from the database."
}
```