import AWS from 'aws-sdk';

const region = process.env.NEXT_PUBLIC_AWS_REGION;
const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET

if (!region) {
  console.error('AWS_REGION must be set in environment variables.');
}
if (!bucketName) {
  console.error('Bucket Name must be set in environment variables.');
}

const s3 = new AWS.S3({
  region,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

if (!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) {
  console.error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set in environment variables.');
}


export { s3, bucketName };
