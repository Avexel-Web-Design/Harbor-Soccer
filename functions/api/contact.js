// Contact form submission handler
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Basic rate limiting check (simple IP-based)
    const ip_address = request.headers.get('CF-Connecting-IP') || 
                      request.headers.get('X-Forwarded-For') || 
                      'unknown';
    
    // Check for recent submissions from same IP (basic spam protection)
    const recentSubmissions = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM submissions 
      WHERE ip_address = ? AND submitted_at > datetime('now', '-5 minutes')
    `).bind(ip_address).first();
    
    if (recentSubmissions.count >= 3) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Too many submissions. Please wait a few minutes before submitting again.' 
      }), {
        status: 429,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Retry-After': '300'
        }
      });
    }
    
    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    
    // Enhanced validation
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'All fields are required' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please enter a valid email address' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Check field lengths
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'One or more fields exceed maximum length' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Basic spam detection (simple keyword check)
    const spamKeywords = ['viagra', 'cialis', 'bitcoin', 'cryptocurrency', 'loan', 'casino'];
    const messageText = (name + ' ' + email + ' ' + message).toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageText.includes(keyword));
    
    if (hasSpam) {
      // Log potential spam but don't inform the user
      console.log('Potential spam detected from IP:', ip_address);
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    const user_agent = request.headers.get('User-Agent') || 'unknown';
    
    // Insert into database
    const result = await env.DB.prepare(`
      INSERT INTO submissions (name, email, subject, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(name, email, subject, message, ip_address, user_agent).run();
    
    if (result.success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      throw new Error('Database insert failed');
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred while processing your request' 
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
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
