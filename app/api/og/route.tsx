import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
 
    // Dynamic values
    const title = searchParams.get('title')?.slice(0, 100) || 'PostAGI'
    const description = searchParams.get('description')?.slice(0, 200) || 'Building ventures for the world that comes after'
 
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e1b4b',
            backgroundImage: 'linear-gradient(to bottom right, #1e1b4b, #312e81)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
              marginBottom: 40,
              paddingLeft: 40,
              paddingRight: 40,
            }}
          >
            <h1
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: 24,
                  color: '#e0e7ff',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: 800,
                }}
              >
                {description}
              </p>
            )}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#c7d2fe',
              }}
            >
              PostEntrepreneur.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
