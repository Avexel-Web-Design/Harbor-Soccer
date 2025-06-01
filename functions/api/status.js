// API status endpoint
export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    // Test database connection
    const testQuery = await env.DB.prepare("SELECT 1 as test").first();
    
    const status = {
      timestamp: new Date().toISOString(),
      status: "ok",
      services: {
        database: testQuery ? "connected" : "error",
        functions: "active"
      },
      version: "1.0.0"
    };
    
    return new Response(JSON.stringify(status, null, 2), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    const status = {
      timestamp: new Date().toISOString(),
      status: "error",
      error: error.message,
      services: {
        database: "error",
        functions: "active"
      }
    };
    
    return new Response(JSON.stringify(status, null, 2), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
