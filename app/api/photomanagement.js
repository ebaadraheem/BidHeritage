import { s3, bucketName } from '../lib/awsConfig';

async function uploadPhotos(photos) {
  try {
    const uploadPromises = photos.map(async (photo) => {
      const buffer = Buffer.from(photo.data); 

      const params = {
        Bucket: bucketName,
        Key: photo.name,
        Body: buffer,
        ContentType: photo.type,
      };

      if (!params.Body) {
        throw new Error(`Body data missing for file ${photo.name}`);
      }

      const data = await s3.upload(params).promise();
      return { name: photo.name, url: data.Location };
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (err) {
    console.error('Error uploading photos:', err);
    throw err;
  }
}
async function deletePhoto(key) {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
  
    try {
      const data = await s3.deleteObject(params).promise();
      return data;
    } catch (err) {
      console.error('Error deleting file:', err);
      throw err;
    }
  }
  

export { uploadPhotos,deletePhoto };
