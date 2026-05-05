# Cloudinary Setup Instructions

## Get Cloudinary Credentials

1. Go to https://cloudinary.com/ and sign up for free
2. After login, you'll see your dashboard with:
   - **Cloud Name** (e.g., `dhabc1234`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnop`)

3. Update your `.env.local` file:

```
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
MONGODB_URI=mongodb://localhost:27017/ksf-store
NEXTAUTH_SECRET=any_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

## Alternative: Use Local Storage (Temporary)

If you don't want to setup Cloudinary right now, images will be stored as base64 in MongoDB (not recommended for production).

To enable local image storage, update the upload API at `src/app/api/upload/route.ts` to convert file to base64 instead of uploading to Cloudinary.

## Test Cloudinary Connection

Run this in your browser console after setting credentials:
```javascript
fetch('/api/upload', {
  method: 'POST',
  body: (() => {
    const fd = new FormData();
    // You need an actual file input
    return fd;
  })()
}).then(r => r.json()).then(console.log)
```
