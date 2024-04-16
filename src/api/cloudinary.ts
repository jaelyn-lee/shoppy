import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'jaelyn-shoppy',
    apiKey: '361562883664332',
    apiSecret: 'Pvquv8w3rk42qNeQ3353Z-aV1HQ',
  },
})

export async function uploadImage(file: object | null) {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET)
  return fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url)
}
