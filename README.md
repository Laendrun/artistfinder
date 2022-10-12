# Artistfinder

## Documentation (Work in Progress)

[docs.artistfinder.world](https://docs.artistfinder.world)

### To-do

- [x] Artists
- [x] Auth
- [x] Categories
- [x] Places
- [x] Reservations
- [x] Reviews
- [ ] Roles
- [ ] Styles
- [ ] Types
- [ ] Users

## Description

> Hello Simon,
> 
> alors voilà mon projet, je pense que ça peut bien marcher, je te présente le truc :
>
> Je voudrais mettre en place une plateforme qui relie les artistes (Dj, groupe, peintre, photographe) aux professionnels et amateurs (bars, club, salle, particulier, resto, etc etc)
>
> idéalement référencer le monde entier (je sais c'est voir très grand, mais je veux du volume et du passage)
>
> En gros, je suis un bar et je cherche un DJ hip hop pour ma soirée de mardi, je poste une annonce ou alors je vais chercher un dj dispo dans le coin ou ailleurs
>
> 2eme exemple, je cherche un groupe de rock irlandais pour samedi après-midi pour ma pool party, hop, recherche sur le site
>
> 3eme exemple, je cherche un restaurant à Lausanne pour exposer mes peintures sur toiles, hop, recherche sur le site
>
> et tout ça vice et versa aussi, en fonction recherche inversée
>
> Tu vois le concept ?
> 
> Il faudrait que chaque artiste puisse avoir une page perso sur le site pour mettre une démo, une présentation, des liens, la fourchette de prix, les dispos, etc etc
> 
> j'ai déjà pas mal d'idées sur la présentation, comme la page d'accueil avec une carte du monde a cliquer dessus
> ensuite une barre de recherche du genre : je suis ..... je recherche ..... à ..... pour le .......

## Think about

- [ ] Find a way to add multiple roles to a user.
  - I will have a "matrix" of roles, each role having the access of all the roles before it plus some others
  - I think the roles will be these ones :
    - User -> standard user, basic access to everything needed to use the website
    - Moderator -> All the user access + access to force a user to change his password at next logon or things like that
    - Admin -> Full access, this access will only be given to a really limited number of user

Some errors could be more descriptive.

- Unauthorized (when updating or deleting an artist) could become _Unauthorized, not the artist owner_ or something like that.

- [ ] before publishing, artists have to be validated by an admin / moderator
  - -> see To-Do Database section
- [ ] GET /api/v1/artists/verified
  - returns only verified artists
- [ ] GET /api/v1/artists/unverified
  - returns only unverified artists
- [x] Modify the Artists route to add a way for admin and moderator to approve artists.

## Approving before publishing

 Basically, for the reservations, only the system will be able to post new reservations, before saving them, it has to be
 accepted by both parties (place + artist). If one of both doesn't accept the reservation, the reservation will not be 
 published.
 PUT /api/v1/reservations/:id
 To update a reservation, it will work like inserting a new one, only the system will be able to do it and updates to the 
 reservations have to be accepted by both parties.
 - admins can update any reservations
 POST /api/v1/types
 To insert new reservation, it will be done as said before, only the system will be able to do it and it has to be
 accepted by both parties
 - admins can insert new reservations manually
 DELETE /api/v1/types/:id
 To delete a reservation, only the system will be able to do it as well. 
 The cancellation of the event has not to be accepted by both parties but when one of the parties cancels, it has to leave
 a message explaining why it was cancelled
 - admins can cancel any reservation they want if they need to.

## Improvements / ideas

- [ ] Send correct HTTP status code depending on the request sent to the API
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- [ ] Moderator role
  - [ ] Ability to block a user
  - [ ] Ability to unblock a user
  - [ ] Ability to force password change for a user
- [ ] Option to block a user
- [ ] Option to unlock a user
- [ ] Option to force a user to change password
  - User has to change password at next login (must first insert current pass)
- [ ] Cancel a soft_delete