import path from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { randomBytes } from 'crypto';

/*----------------*/
export async function getKMSProviderCredentials() {
    const __dirname = path.resolve();
    if (!existsSync(path.resolve(__dirname, 'src/utils/db/user-master-key.txt'))) {
        try {
            console.log('---new customer master key written---');
            writeFileSync(path.resolve(__dirname, 'src/utils/db/user-master-key.txt'), randomBytes(96));
        } catch (err) {
            throw new Error(`Unable to write Customer Master Key to file due to the following error: ${err}`);
        }
    }
    console.log('---customer master key accessed---');
    const localMasterKey = readFileSync(path.resolve(__dirname, 'src/utils/db/user-master-key.txt'));
    if (localMasterKey.length !== 96) {
        throw new Error('Expected the customer master key file to be 96 bytes.');
    }

    const kmsProviders = {
        local: {
            key: localMasterKey,
        },
    };
    return kmsProviders;
}
