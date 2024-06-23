# Enigma

Enigma is an onchain mystery game blending captivating stories with AI-generated art. Decipher clues, guess the hidden objects, and race against time to secure your place on the leaderboard and claim NFTs powered by Starknet, Llama3 and Dojo!

## Project Description

Enigma is an immersive mystery-solving game that blends story-driven clues with AI-generated art, challenging players to guess objects or items. Each game session presents players with narrative hints and corresponding AI-generated images that indirectly represent the target object.

Enigma's scoring system and leaderboard are managed through Dojo, with Starknet smart contracts ensuring fair play and accurate tracking of player interactions with the AI Game agent. Scores are determined by the speed and the number of guesses made, rewarding players who solve mysteries quickly and with fewer attempts.

## How it's Made

Enigma leverages a combination of modern web technologies and blockchain mechanisms to deliver a seamless and fair gaming experience:

**Next.js:** The frontend of Enigma is built using Next.js, providing a responsive and efficient user interface that enhances player interaction and engagement.

**Llama 3:** Serving as the game agent, Llama 3 generates the story-driven hints. By analyzing player performance, Llama 3 adjusts the difficulty level of each challenge, ensuring a personalized gaming experience.

**Astria API:** AI-generated images are created using the Astria Stability Diffusion API. These images act as indirect visual hints, adding depth and challenge to the guessing game.

**Dojo:**

**Argent Wallet SDK :** Argent web wallet SDK provides seamless authentication and transaction capabilities for players, enhancing the overall user experience and ensuring secure management of player data and game-related transactions.

**Dojo Engine :** The Dojo Engine in this project facilitates the management of player scores on-chain within a game environment by enabling player spawning, score updating, and leaderboard management. This is achieved through the use of models and systems in the Dojo back-end.

**dojo.js :** This is the JavaScript package that connects the Next.js app with the Dojo back-end allowing seamless interaction between the JavaScript front-end and Cairo back-end through the use of hooks and generators, keeping everything live and up-to-date.

## Running it Locally

### Setting Up Dojo Engine

To get Dojo working, follow the steps below:

### Prerequisites

- Ensure you have the necessary dependencies installed, including `cargo`, `sozo`, `katana`, and `torii`.

### Steps

1. Clone the repository.
2. Go to `/dojo/Scarb.toml` and set `rpc_url` to `http://localhost:5050/`
3. Open three terminals and perform the following steps:

**Terminal 1:**

```bash
cd dojo
sozo build
katana --disable-fee --allowed-origins "*"
```

**Terminal 2:**

```bash
cd dojo
sozo migrate apply
torii --world 0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18 --allowed-origins "*"
```

After running this, copy the contract address from the output of `sozo migrate apply` and run the following command:

```bash
sozo auth grant writer Leaderboard,[CONTRACT_ADDRESS]
```

**Terminal 3:**

```bash
npm install
npm run create-components
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
