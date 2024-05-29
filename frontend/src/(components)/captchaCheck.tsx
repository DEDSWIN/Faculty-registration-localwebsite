import https from 'https';


const secret = process.env.Recaptcha_Private_Key;


function verifyRecaptcha(response: string | null| undefined) {
    return new Promise((resolve, reject) => {
        // Data to send in the POST request
        const data = JSON.stringify({
            secret: secret,
            response: response,
        });

        // Options for the HTTPS request
        const options = {
            hostname: 'www.google.com',
            path: '/recaptcha/api/siteverify',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        // Making the POST request
        const req = https.request(options, (res) => {
            let responseData = '';

            // Collecting response data
            res.on('data', (chunk) => {
                responseData += chunk;
            });

            // Processing response data
            res.on('end', () => {
                try {
                    const { success } = JSON.parse(responseData);
                    resolve(success === true);
                } catch (error) {
                    reject(error);
                }
            });
        });

        // Handling errors
        req.on('error', (error) => {
            reject(error);
        });

        // Sending the data in the request
        req.write(data);
        req.end();
        console.log(secret);
    });
}

export default verifyRecaptcha;