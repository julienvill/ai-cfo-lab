import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const authEnabled = process.env.BASIC_AUTH_ENABLED === "true"
  if (!authEnabled) return NextResponse.next()

  const auth = request.headers.get("authorization")
  if (auth) {
    const [scheme, encoded] = auth.split(" ")
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8")
      const separatorIndex = decoded.indexOf(":")
      if (separatorIndex !== -1) {
        const user = decoded.slice(0, separatorIndex)
        const pass = decoded.slice(separatorIndex + 1)
        if (
          user === process.env.BASIC_AUTH_USER &&
          pass === process.env.BASIC_AUTH_PASSWORD
        ) {
          return NextResponse.next()
        }
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AI CFO Lab"' },
  })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
