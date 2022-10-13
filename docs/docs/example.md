# METHOD url

Route description `field`.

This route requires a token that has the `Admin` role.
This route requires a token that has the `user_id` = :id.
This route requires a token that has the `Admin` role or that has the `user_id` = :id.
This route requires a token that has the `Admin` role or that the user is the owner of the requested resource.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
METHOD url
```
Request parameters:
```json
No required parameters.
OR
id: has to be a `int` being the id of the requested resource.
```
Header:
```json
No required header.
OR
Header Name: Header Content
```
Body:
```json
No required body.
OR
{
  "int_field": 0,
  "string_field": "String"
}
```

## Header description

The **Authorization** must match the following regexp :
```regexp
/^(Bearer) ([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+\w$/
```

## Body fields description

- `field` : field_type, (required)

## Response

### Here you go

Status: **200**
```json
[
	{
		"int_field": 0,
		"string_field": "String"
	},
  ...
]
```

### Response fields description

- "int_field": int
- "string_field": String
- "bool_field": (boolean) 1.
- "type_id": int -> referencing the `Types` table.

### You fucked up

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
Status: **404**
```json
{
  "message": "Requested resource not found."
}
```

### I fucked up

Status: **500**
```json
{
  "message": "Unable to get data from the database."
}
OR
{
  "message": "Unable to insert data in the database."
}
OR
{
  "message": "Unable to update data from the database."
}
OR
{
  "message": "Unable to delete data from the database."
}
```