```mermaid
erDiagram

  "User" {
    Int id "🗝️"
    String email 
    String password 
    String name "❓"
    }
  

  "Playlist" {
    Int id "🗝️"
    Int userId 
    Int albumId 
    }
  

  "Album" {
    Int id "🗝️"
    String name 
    Int artistId 
    }
  

  "Artist" {
    Int id "🗝️"
    String name 
    }
  
    "User" o{--}o "Playlist" : "playlists"
    "Playlist" o|--|| "User" : "user"
    "Playlist" o|--|| "Album" : "albums"
    "Album" o{--}o "Playlist" : "playlists"
    "Album" o|--|| "Artist" : "artist"
    "Artist" o{--}o "Album" : "artist"
```
