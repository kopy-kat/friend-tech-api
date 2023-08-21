# friend.tech API deep-dive

This is a brief deep-dive on the friend.tech frontend/API that aims to list out all the available endpoints that I have found so far. I'm not affiliated with the project in any way, I just like to poke around and see what I can find.

I hope this is useful to people trying to learn more about friend.tech or building on top of it. I'll keep updating the list as I find more endpoints and if you would like to contribute, please open an issue/PR.

The root API URL is <https://prod-api.kosetto.com/>.

## Endpoints

### User

Get details about a user by address.

**URL** : `/users/[ADDRESS]`

**Method** : `GET`

**Auth required** : NO

**Response example**

```json
{
  "id": 903,
  "address": "0x4e5f7e4a774bd30b9bdca7eb84ce3681a71676e1",
  "twitterUsername": "cobie",
  "twitterName": "Cobie",
  "twitterPfpUrl": "https://pbs.twimg.com/profile_images/1688496375707701248/WwWz33DI.jpg",
  "twitterUserId": "2259434528",
  "lastOnline": 1691761722180,
  "holderCount": 158,
  "holdingCount": 17,
  "shareSupply": 197,
  "displayPrice": "2328062500000000000",
  "lifetimeFeesCollectedInWei": "0"
}
```

### Holdings Activity

Gets a history of trades for a user.

**URL** : `/holdings-activity/[ADDRESS]`

**Method** : `GET`

**Auth required** : NO

**Response example**

```json
{
    {
     "events": [
        {
            "trader": {
            "address": "0xb9e7fa5d61a8ba3aaf4d0db02a34039fd6554d37",
            "pfpUrl": "https://pbs.twimg.com/profile_images/1612810393876930564/7toyk7Rp.jpg",
            "username": "hero_truck",
            "name": "𝙷𝚎𝚛𝚘 𝚃𝚛𝚞𝚌𝚔 🚚"
            },
            "subject": {
            "address": "0x3784bb094b17aab289872322dcb41aa675bafa74",
            "pfpUrl": "https://pbs.twimg.com/profile_images/1692694978969907200/LNuVZYWj.jpg",
            "username": "garrytan",
            "name": "Garry Tantacles 陈嘉兴 🛡️— e/acc"
            },
            "isBuy": false,
            "shareAmount": "1",
            "ethAmount": "517562500000000000",
            "createdAt": 1692651959442
        },
    ],
    "nextPageStart": 0
    }
}
```

### Friends Activity

Gets a history of friends-related activity for a user.

**URL** : `/friends-activity/[ADDRESS]`

**Method** : `GET`

**Auth required** : NO

**Response example**

```json
{
    {
     "events": [
        {
           "trader": {
            "address": "0x3c3985a23f12fac7023d134f8b4c131947ae1279",
            "pfpUrl": "https://pbs.twimg.com/profile_images/1611158476239036420/ih4HPw_W.jpg",
            "username": "icebergy_",
            "name": "icebergy ❄️"
            },
            "subject": {
            "address": "0x9394516df4eaf9eaa559659c48d6fc2eaae16967",
            "pfpUrl": "https://pbs.twimg.com/profile_images/1683898245431296000/WgXztXiV.jpg",
            "username": "d0unbug",
            "name": "dounbug"
            },
            "isBuy": false,
            "shareAmount": "1",
            "ethAmount": "232562500000000000",
            "createdAt": 1692650867283
        },
    ],
    "nextPageStart": 0
    }
}
```

### Points

Gets the points for a user (potentially used for an airdrop).

**URL** : `/points/[ADDRESS]`

**Method** : `GET`

**Auth required** : NO

**Response example**

```json
{
  "address": "0x4e5f7e4a774bd30b9bdca7eb84ce3681a71676e1",
  "totalPoints": 104815,
  "tier": "DIAMOND"
}
```

### Users by id

Gets a user by their id.

**URL** : `/users/by-id/[ID]`

**Method** : `GET`

**Auth required** : NO

**Response example**

```json
{
  "id": 260,
  "address": "0xc37fc40e16d50d287e9cd60fa5d6cbcf2d322afb",
  "twitterUsername": "xingGorilla",
  "twitterName": "xing",
  "twitterPfpUrl": "https://pbs.twimg.com/profile_images/1667533197998194688/wyCwlomw.jpg",
  "twitterUserId": "887084056516583424",
  "lastOnline": 1691755936186,
  "lifetimeFeesCollectedInWei": "0"
}
```

### Search

Search users by their twitter handle.

**URL** : `/search/users?username=[TWITTER_USERNAME]`

**Method** : `GET`

**Auth required** : YES (as of 21/08)

**Curl example**

```bash
curl 'https://prod-api.kosetto.com/search/users?username=d' \
  -H 'Authorization: [AUTH_TOKEN]' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Referer: https://www.friend.tech/' \
  --compressed
```

**Response example**

```json
{
  "users": [
    {
      "address": "0xcb7a5d0c1074cd79ec001290ddecada17c275045",
      "twitterUsername": "0xDCypher",
      "twitterName": "DC",
      "twitterPfpUrl": "https://pbs.twimg.com/profile_images/1670206316059537408/LhXGeWp9.jpg",
      "twitterUserId": "1389003409760600064"
    }
  ]
}
```

### Events

Gets a history of the 200 most recent trades.

**URL** : `/events`

**Method** : `GET`

**Auth required** : No

**Response example**

```json
{
  "events": [
    {
      "id": 40613,
      "blurredUrl": "https://mintcam.s3.us-east-1.amazonaws.com/next-s3-uploads/c13b1878-15ba-4cb6-bf67-913f102ade83/blurred.png",
      "isNSFW": false,
      "caption": null,
      "value": "0",
      "surplus": "0",
      "previousOwner": "0x9E876bC45B9efd1113823dB655A9e33c6dCfD5b4",
      "stealer": "0x9EA4039d038EF51C87774EC9197A3eD561A0Fb3F",
      "creator": "0x9E876bC45B9efd1113823dB655A9e33c6dCfD5b4",
      "previousOwnerPfpUrl": "https://pbs.twimg.com/profile_images/1652225412913586178/xF_r9KIW_normal.png",
      "previousOwnerUsername": "staszv08",
      "stealerPfpUrl": null,
      "stealerUsername": null,
      "creatorPfpUrl": "https://pbs.twimg.com/profile_images/1652225412913586178/xF_r9KIW_normal.png",
      "creatorUsername": "staszv08"
    }
  ]
}
```

### Top list by price

Gets a list of users by their token price

**URL** : `/lists/top-by-price`

**Method** : `GET`

**Auth required** : No

**Response example**

```json
{
  "users": [
    {
      "id": 11,
      "address": "0xfd7232e66a69e1ae01e1e0ea8fab4776e2d325a9",
      "twitterUsername": "0xRacerAlt",
      "twitterName": "Racer",
      "twitterPfpUrl": "https://pbs.twimg.com/profile_images/1688403387090673665/HOhwOdYd.jpg",
      "twitterUserId": "1455020265520435201",
      "lastOnline": 1691760917233,
      "displayPrice": "3025000000000000000",
      "holderCount": 149,
      "shareSupply": 219
    }
  ]
}
```

## Bonus endpoints

### Accounts

undetermined

**URL** : `/accounts/[???]`

**Method** : `GET`

**Auth required** : No

**Response example**

undetermined

**Error Response example**

```json
{ "message": "No account" }
```

### Kosetto config

Gets the contract config previously used for the Kosetto NFT (rugged).

**URL** : `/config`

**Method** : `GET`

**Auth required** : No

**Response example**

```json
{
  "minAppVersionIOS": "1.0.0",
  "minAppVersionAndroid": "1.0.0",
  "gachaCost": 700,
  "network": "ethereum",
  "contractAddress": "0x4822d507d32b520a217183ae4344e0cece873599",
  "gachaLaunchMs": 1674282060000
}
```
