# VK Intersect
This service lets you find friends by interest on the basis of a list of communities VKontakte.

### How it works?
To start searching, we have to feed our service with list VKontakte groups. Jquery gather group names from all input fields into an array, and send it to the server within http request. The server will find members of each group, find intersections and send responce back.

### Ongoing work
- [ ] Make service a vk application
- [x] Speed up intersection algorithm
- [x] Move vk API credentials to .env file 
- [x] Update vk sdk module