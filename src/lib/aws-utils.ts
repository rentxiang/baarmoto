import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const region = process.env.NEXT_PUBLIC_AWS_REGION;

if (!bucketName || !accessKeyId || !secretAccessKey || !region) {
  throw new Error('AWS S3 configuration is incomplete. Check environment variables.');
}

const client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export const deleteS3Objects = async (keys: string[]) => {
  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: keys.map((key) => ({ Key: key })),
      Quiet: false,
    },
  });

  try {
    const { Deleted } = await client.send(command);
    console.log(`Deleted ${Deleted?.length} objects from S3 bucket. Deleted objects:`, Deleted);
  } catch (err) {
    console.error('Error deleting objects:', err);
    throw err;
  }
};


