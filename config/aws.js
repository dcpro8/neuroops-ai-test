const AWS_CONFIG = {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
};

export const s3Client = new AWS.S3(AWS_CONFIG);