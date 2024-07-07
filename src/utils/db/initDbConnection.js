import path from 'path';
import mongoose from 'mongoose';
import { UUID, ClientEncryption } from 'mongodb';
import { getKMSProviderCredentials } from './encryptionHelpers.js';

/*--------------------*/
async function setClientEncryptionData() {
    try {
        const kmsProviders = await getKMSProviderCredentials();
        const keyVaultNamespace = 'mongo_enc_app_db.encryption_key';
        const __dirname = path.resolve();

        const mongoCryptPath = (process.env.ENC_ENV === 'dev') ? './src/utils/db/mongo_crypt_v1.dylib' : './src/utils/db/mongo_crypt_v1.so';
        const extraOptions = {
            cryptSharedLibPath: path.resolve(__dirname, mongoCryptPath),
        };

        await mongoose.createConnection(process.env.DB_URL, {
            autoEncryption: {
                keyVaultNamespace,
                kmsProviders,
                extraOptions
            }
        }).asPromise();

        // const dbConn = await mongoose.createConnection(process.env.DB_URL, {
        //     autoEncryption: {
        //         keyVaultNamespace,
        //         kmsProviders,
        //         extraOptions
        //     }
        // }).asPromise();

        // const encryption = new ClientEncryption(dbConn.client, {
        //     keyVaultNamespace,
        //     kmsProviders
        // });

        // const _key = await encryption.createDataKey('local');
        return { success: true, kmsProviders, keyVaultNamespace, _key: 'NA' };
    } catch (error) {
        console.log(error);
        return error;
    }
}



export default async function initDbConnection() {
    try {
        const uuidKeyId = '82efc362-f63f-46e8-aacf-b2a9f5bc3c0b';
        const encDetails = await setClientEncryptionData();

        await mongoose.connect(process.env.DB_URL, {
            autoEncryption: {
                keyVaultNamespace: encDetails.keyVaultNamespace,
                kmsProviders: encDetails.kmsProviders,
                schemaMap: {
                    'mongo_enc_app_db.user_datas': {
                        bsonType: 'object',
                        encryptMetadata: {
                            keyId: [new UUID(uuidKeyId)]
                        },
                        properties: {
                            userEmail: {
                                encrypt: {
                                    bsonType: 'string',
                                    algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
                                }
                            },
                            userMobile: {
                                encrypt: {
                                    bsonType: 'string',
                                    algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
                                }
                            },
                        }
                    },
                    'mongo_enc_app_db.user_address_datas': {
                        bsonType: 'object',
                        encryptMetadata: {
                            keyId: [new UUID(uuidKeyId)]
                        },
                        properties: {
                            addressMobile: {
                                encrypt: {
                                    bsonType: 'string',
                                    algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
                                }
                            }
                        }
                    },

                }
            }
        });
        return true;
    } catch (error) {
        return error;
    }
}

mongoose.connection.on('connected', () => {
    console.log('DB Connected On:', Math.floor(Date.now() / 1000));
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB Disconnected On:', Math.floor(Date.now() / 1000));
    console.log('Mongoose default connection disconnected');
});

process.on('exit', () => {
    mongoose.disconnect();
    console.log('Mongoose default connection disconnected through app termination');
});
