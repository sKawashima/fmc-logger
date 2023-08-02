```mermaid
erDiagram

  "Account" {
    String id "🗝️"
    String type
    String provider
    String providerAccountId
    String refresh_token "❓"
    String access_token "❓"
    Int expires_at "❓"
    String token_type "❓"
    String scope "❓"
    String id_token "❓"
    String session_state "❓"
    }


  "Session" {
    String id "🗝️"
    String sessionToken
    DateTime expires
    }


  "User" {
    String id "🗝️"
    String name "❓"
    String email "❓"
    DateTime emailVerified "❓"
    String image "❓"
    }


  "VerificationToken" {
    String identifier
    String token
    DateTime expires
    }

    "Account" o|--|| "User" : "user"
    "Session" o|--|| "User" : "user"
    "User" o{--}o "Account" : "accounts"
    "User" o{--}o "Session" : "sessions"
```
