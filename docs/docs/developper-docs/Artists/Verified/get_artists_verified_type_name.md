# GET /api/v1/artists/verified/type/name/:name

Get all `verified` artists where `name` is like :name.

## Request example

```
GET https://www.artistfinder.world/api/v1/artists/verified/type/name/:name
```
Request Parameters
```
name: must be a String.
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
		"artist_id": 0,
		"artist_name": "Artist name",
		"artist_isGroup": 1,
		"artist_validated": 0,
		"type_id": :type_id,
		"style_id": 1
	},
  ...
]
```

### Response fields description

- "artist_id": int
- "artist_name": String
- "artist_isGroup": (boolean) 1 or 0.
- "artist_validated": (boolean) 1.
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