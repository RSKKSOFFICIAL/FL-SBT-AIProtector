# 🧠 FL-SBT-AIProtector

A blockchain-powered federated learning system that protects artist rights and tracks AI model training with encrypted images, SBTs, and on-chain reward logging.

---

## 🔐 What This Project Does

This research system:

- Encrypts each artist image with AES-256
- Uploads it to IPFS without public visibility
- Mints a non-transferable **Soulbound Token (SBT)** per image
- Records usage of each SBT image in AI model training
- Logs training contribution and rewards the artist using an ERC20 token
- Ensures only approved nodes can decrypt & train on protected images

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Blockchain | Hardhat + Solidity + OpenZeppelin |
| Off-chain Storage | IPFS Desktop |
| Encryption | AES-256-CBC (Node.js `crypto`) |
| AI Training | TensorFlow Federated (TFF) |
| Smart Contracts | SBT, RewardLogger, AccessControlFL, MyToken |
| Token Type | Soulbound NFT + ERC20 Reward |

---

## 📦 Prerequisites

- Node.js v18+
- Python 3.10+
- IPFS Desktop (daemon must be running)
- Ganache GUI or CLI
- `PRIVATE_KEY` of a Ganache account (for .env)
- Git installed

---

## ⚙️ Project Setup

```bash
# 1. Clone this repo
git clone https://github.com/RSKKSOFFICIAL/FL-SBT-AIProtector.git
cd FL-SBT-AIProtector

# 2. Install dependencies
npm install

# 3. Start Ganache + IPFS Desktop

# 4. Create .env file
echo "PRIVATE_KEY=<your_ganache_private_key>" > .env

# 5. Compile contracts
npx hardhat compile

# 6. Deploy contracts to Ganache
npx hardhat run scripts/deploy.js --network ganache
````

---

## 🖼 Minting an Encrypted SBT

1. Place a `.jpg` image in `/images/test-image.jpg`
2. Run the mint script:

```bash
npx hardhat run scripts/mintSBT.js --network ganache
```

✅ Output includes:

* IPFS URI of encrypted image
* AES encryption key + IV
* Minted SBT token ID
* Metadata stored in `/minted/token-<id>.json`

---

## 🔐 Approving a Federated Node

To allow a node to decrypt images and train:

```bash
npx hardhat run scripts/approveNode.js --network ganache
```

Set the node address inside the script (`scripts/approveNode.js`).

---

## 🔓 Decrypting an Image (For Approved Node)

Decrypts encrypted `.jpg.enc` image using metadata file:

```bash
npx hardhat run scripts/decryptSBTImage.js
```

Saves result as `/images/decrypted-test-image.jpg`

---

## 💸 Smart Contract Overview

| Contract            | Role                                                |
| ------------------- | --------------------------------------------------- |
| **SBT**             | ERC721 soulbound token with encrypted IPFS metadata |
| **RewardLogger**    | Records usage of tokens + issues ERC20 reward       |
| **AccessControlFL** | Grants decryption access to federated nodes         |
| **MyToken**         | ERC20 reward token used to pay contributors         |

---

## 📁 Folder Structure

```
├── contracts/
├── scripts/
├── utils/
├── images/
├── minted/
├── deployed.json
├── .env
├── hardhat.config.js
```

---

## 🧠 Federated Learning (Planned)

> Simulate federated training with TensorFlow Federated (Python)

Steps:

* Simulate multiple nodes (clients)
* Only approved nodes fetch keys to decrypt data
* Train locally and send model update
* Upload model to IPFS
* Call `RewardLogger.logContributionAndReward()`

---

## 🔐 Security Practices

* AES keys stored offline (encrypted `.json`)
* No image is stored publicly
* Decryption allowed only if:

  * Address is owner or approved node
* Smart contracts follow OpenZeppelin standards

---

## 📚 Useful Scripts

| Script                       | Description                                |
| ---------------------------- | ------------------------------------------ |
| `scripts/deploy.js`          | Deploys all smart contracts                |
| `scripts/mintSBT.js`         | Encrypts image, uploads to IPFS, mints SBT |
| `scripts/approveNode.js`     | Grants FL node access to decrypt           |
| `scripts/decryptSBTImage.js` | Simulates node decrypting protected image  |

---

## ✍️ Research Focus

* Data privacy in decentralized AI
* Blockchain-based attribution for model contributions
* IPFS + Federated Learning integration
* Token economics for fair model training

---

## 🙌 Credits

Built with:

* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
* [Hardhat](https://hardhat.org/)
* [IPFS](https://ipfs.tech/)
* [TFF](https://www.tensorflow.org/federated)

---

## 💬 Questions?

Open an issue or ping me.