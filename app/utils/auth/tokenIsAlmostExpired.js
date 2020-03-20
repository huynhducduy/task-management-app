import tokenExpiresIn from './tokenExpiresIn';

export default async function() {
  try {
    return (await tokenExpiresIn()) <= 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
