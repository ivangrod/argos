import Link from "next/link";

export default function Home() {

  return (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
              <h1>Welcome to SVQOBS</h1>
              <Link href="/sections/incidences">Go to map</Link>
          </div>
  );
}
