# Field Level Encryption in Mongodb With Node and Express Js

This repo is the Implementation of MongoDB Client-Side Field Level Encryption.

# About

MongoDB’s Client-Side Field Level Encryption (FLE) provides amongst the strongest levels of data privacy and security for regulated workloads. It protects your data without:

- Developers needing to write additional, highly complex encryption logic.
- Compromising your ability to query encrypted data.
- Significantly impacting database performance.

## Getting started

To get the application running locally:

- Clone this repo
- To download the Mongo Crypto File visit the Url ```https://www.mongodb.com/try/download/enterprise``` and Select Your Development OS to download Crypto Library
- Start Docker desktop
- Place the crypto file inside `src/utils/db/` to build the docker Image.

### Mongo Crypto Library OS Wise Extension 

|  OD           | File Extension|
| ------------- |:-------------:|
| macOS         | .dylib        |
| Linux         | .so           |
| Windows       | .dill         |

- Run `docker build -t mongoencapp:latest .` to build the docker Image.
- Run `docker run -p 3000:3000 mongoencapp:latest` to start the local Development Server.
- The App will start on port ```3000```
