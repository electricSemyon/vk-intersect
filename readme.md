# VK Intersect
This service lets you find friends by interest on the basis of a list of VK groups list.

### How it works?
To start searching, we have to feed our service with list of VK groups. Jquery gathers group names from all input fields into an array, and sends it to the server within http request. The server will find members of each group, find intersections and send responce back.

### Ongoing work
- [x] Make service a vk application
- [x] Speed up intersection algorithm
- [x] Move vk API credentials to .env file 
- [x] Update vk sdk module