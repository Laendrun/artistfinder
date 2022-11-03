# Artistfinder

## Documentation (Work in Progress)

[docs.artistfinder.world](https://docs.artistfinder.world)

## Description

### Qu'est-ce que Artistfinder ?

Artistfinder est une plateforme en ligne qui permet aux artistes de trouver un endroit où se produire, un endroit où exposer leurs photos, scultpures, peintures, tout.
Notre plateforme s'adresse à tous les artistes.
> Pourquoi faire encore une plateforme ? Il en existe déjà énormément qui fonctionnent très bien.
Nous savons que toutes ces plateformes existent, mais nous avons remarqué que la plupart d'entre elles sont destinées aux musiciens.
Nous voulons offrir une plateforme globale pour **tous** les artistes.

### Où en est le projet ?
Actuellement, le projet n'en est qu'à sa phase de développement.
Nous faisons tout notre possible pour atteindre un MVP (Minimum Viable Product) pour le début de l'année 2023.
Nous essaierons de vous tenir au courant de l'avancement du projet.
    
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
