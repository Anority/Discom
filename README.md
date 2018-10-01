## Setting up

1. Create a [Github](https://www.github.com) account and Fork Discom. (Button in the top right)

![Fork](https://cdn.discordapp.com/attachments/279289541070946304/496316781174980618/Fork.png)




2. Create a [Heroku](https://www.heroku.com) account and Create a New App. (Button in the top right)

![App](https://cdn.discordapp.com/attachments/279289541070946304/496316837198561280/App.png)




3. Go to your Heroku app Settings tab, click Add Buildpack and select NodeJS.

![Settings](https://cdn.discordapp.com/attachments/279289541070946304/496316887823810561/Settings.png)

![Buildpack](https://cdn.discordapp.com/attachments/279289541070946304/496316925790650388/Buildpack.png)



4. In the Settings tab, click Reveal Config Vars and enter the information for the features you'll want to use from **[here](https://github.com/Gravestorm/Discom/blob/master/config.js.example)**.

      4a. KEY is the name, VALUE is the ID or other required input.
  
      4b. TOKEN is required, everything else is optional. (Token is not Client Secret in the Discord Bot Website, it is near the bottom)
  
      4c. To get a Channel ID, you must right click on a Text Channel and select Copy ID. (Need to enable Developer Mode in User Settings -> Appearance)
      
      4d. To get a Server ID, you must right click on a Server and select Copy ID. (Need to enable Developer Mode in User Settings -> Appearance)
  
      4e. To get a Role ID, you must put \ before mentioning it (e.g. \@Streamer) and copy the number part. (Need to allow anyone to @mention the role in the Role's settings)

![Config](https://cdn.discordapp.com/attachments/279289541070946304/496316976885661696/Config.png)

![Channel ID](https://cdn.discordapp.com/attachments/279289541070946304/496317016613847061/Channel_ID.png)

![Server ID](https://cdn.discordapp.com/attachments/279289541070946304/496318050962898949/Server_ID.png)

![Role ID](https://cdn.discordapp.com/attachments/279289541070946304/496317422895235082/Role_ID.png)

![Mention](https://cdn.discordapp.com/attachments/279289541070946304/496319109051711498/Mention.png)

![User Settings](https://cdn.discordapp.com/attachments/279289541070946304/496318158928478208/User_Settings.png)

![Developer Mode](https://cdn.discordapp.com/attachments/279289541070946304/496318206378770432/Developer_Mode.png)



5. You need to invite your bot to your server, to do so you must go to the [Discord Bot Website](https://discordapp.com/developers/applications/me) and copypaste the Client ID at the top into this URL: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_HERE&scope=bot&permissions=268528640

      5a. You must enable [2 Factor Authentification](https://support.discordapp.com/hc/en-us/articles/219576828-Setting-up-Two-Factor-Authentication) to use the Streaming Role or Twitter features.
      
      5b. If you do not need to use the Streaming Role or Twitter features, then use this URL: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_HERE&scope=bot&permissions=84992
      
      5c. You must have **Manage Server** permission on the server you're inviting the bot to, or have someone who has the permission invite it.



6. In the Deploy tab, click on Github to connect your Github account, then search for Discom and click Connect.

![Deploy](https://cdn.discordapp.com/attachments/279289541070946304/496318339874947074/Deploy.png)

![Github](https://cdn.discordapp.com/attachments/279289541070946304/496318352805855242/Github.png)



7. Click on Deploy Branch.

![Branch](https://cdn.discordapp.com/attachments/279289541070946304/496318363769765913/Branch.png)
