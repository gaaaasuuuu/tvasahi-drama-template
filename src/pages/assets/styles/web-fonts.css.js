import { directory } from '@settings';

const data = `
  h1 {
    background: url(/${directory}/test.jpg);
    background: #000;
  }
`;

export async function GET({params, request}) {
  return new Response(data)
}
