# The Password Game: Reversed Engineered

This project was cretated with the objective of creating an open source replica of [The Password Game by Neal Agarwal](https://neal.fun/password-game/). It was meant as a fun project to learn. It is not hosted anywhere, but it can be cloned and self-hosted.

## Overview

The project consists of a Docker Compose that deploys two containers: the frontend made with **ReactJS** and the backend proxy made with **Node.js Express**. It tries its best to simulate the original game, but with some limitations (see the [Issues](https://github.com/i-penr/password-game/issues) tab to see more about these).

Each rule has its own class/React Component that are located at `/src/utils/rules`. They all follow the same structure, inherited from `GenericRule`, where the `checkRule()` function sets the `fullfilled` attribute of the class in order to check if the rule is fullfilled whenever the password changes. Also, for rules that need to render additional HTML, these classes can implement the React Component method `render()` to accomplish this. There are also other required values like the `number` that represents a unique id for each rule. They also have tests located at `src/rules` that follow [Bun's](https://bun.sh/) test schema. Highlighting is also managed in the class, with the `getHighlightString()` method, that returns the highlighted HTML text.

All the text editing and rich text implementation has been done with [TipTap](https://tiptap.dev/), following a very close implementation of the original game (that probably also uses Tiptap or ProseMirror).

The **proxy backend** is used to manage external API requests, more specifically, to the **Wordle API** and the **YouTube API** (a token is needed for this).

There is also a **TextController** class at `src/utils/TextController.js` to manage text sanitizing, clearText, and other more specific text operations.

*Paul*, the funny chicken from the game, is managed from the **Paul** class at `src/utils/Paul.js`. It is a singleton, that can be altered by rules (change state, trigger death, etc).

As far as the React Components go, the main component is **GameZone.js** (`src/Components/GameZone.js`) that controls the whole game and includes the rest of the components (**Rule.js**, which is a template for each rule, **HighlightedText.js**, **TipTap.js** and **Toolbar.js**).

There is a **Ruleset.js** class that implements a list of rules.

## Deployment

To run the project in local, you will need to follow these steps:

1. Clone the project.
2. Create 2 `.env` files, one at the root of the project, and the other inside the `proxy` folder:
    - `.env`
        ```
        REACT_APP_BACKEND_HOST='localhost' # Change these to your needed values
        REACT_APP_BACKEND_PORT='3001'
        ```
    - `src/proxy/.env`
        ```
        YOUTUBE_API_KEY="YOUR_YOUTUBE_API_KEY" # For rule 24
        HOST="localhost" # Change these to your needed values
        PORT=3001
        ```
3. Run the **production** or **development** Docker Compose. The production one should create a build folder that includes the game, which can be then hosted with NGINX or similar (the Dockerfile.prod itself does this).
4. See The Password Game in the browser at the port and host you specified.

## Special Thanks

Thanks to Neal Agarwal for creating the original Password Game and inspiring me to learn more about React and JavaScript.