// Simple JWT implementation (for demonstration - use a proper library in production)
function base64urlEscape(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64urlEncode(str) {
  return base64urlEscape(btoa(str));
}

function base64urlDecode(str) {
  str += new Array(5 - str.length % 4).join('=');
  return atob(str.replace(/\-/g, '+').replace(/_/g, '/'));
}

async function signJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerBase64 = base64urlEncode(JSON.stringify(header));
  const payloadBase64 = base64urlEncode(JSON.stringify(payload));
  
  const data = headerBase64 + '.' + payloadBase64;
  
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureBase64 = base64urlEscape(btoa(String.fromCharCode(...new Uint8Array(signature))));
  
  return data + '.' + signatureBase64;
}

async function verifyJWT(token, secret) {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    
    const data = headerB64 + '.' + payloadB64;
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    
    const valid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(data));
    
    if (!valid) return null;
    
    const payload = JSON.parse(base64urlDecode(payloadB64));
    
    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}

// Admin login handler
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    const { username, password } = body;
    
    // Check credentials
    if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid credentials' 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Create JWT token
    const payload = {
      username: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    const token = await signJWT(payload, env.JWT_SECRET);
    
    // Store session in database (optional, for tracking)
    const tokenHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    const tokenHashHex = Array.from(new Uint8Array(tokenHash)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    await env.DB.prepare(`
      INSERT INTO admin_sessions (token_hash, expires_at)
      VALUES (?, datetime('now', '+24 hours'))
    `).bind(tokenHashHex).run();
    
    return new Response(JSON.stringify({ 
      success: true, 
      token: token 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred during login' 
    }), {
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

// Export the JWT functions for use in other modules
export { verifyJWT };
