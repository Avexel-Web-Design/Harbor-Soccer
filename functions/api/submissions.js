// Submissions management API
import { verifyJWT } from './auth/login.js';

async function authenticateRequest(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  return await verifyJWT(token, env.JWT_SECRET);
}

// Get all submissions
export async function onRequestGet(context) {
  const { request, env } = context;
  
  try {
    // Authenticate request
    const payload = await authenticateRequest(request, env);
    if (!payload) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized' 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Get submissions from database
    const result = await env.DB.prepare(`
      SELECT id, name, email, subject, message, submitted_at, ip_address
      FROM submissions 
      ORDER BY submitted_at DESC
    `).all();
    
    return new Response(JSON.stringify({ 
      success: true, 
      submissions: result.results 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Get submissions error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred while fetching submissions' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Delete a submission
export async function onRequestDelete(context) {
  const { request, env, params } = context;
  
  try {
    // Authenticate request
    const payload = await authenticateRequest(request, env);
    if (!payload) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized' 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    const submissionId = params.id;
    if (!submissionId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Submission ID is required' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Delete submission from database
    const result = await env.DB.prepare(`
      DELETE FROM submissions WHERE id = ?
    `).bind(submissionId).run();
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Submission not found' 
      }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Submission deleted successfully' 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Delete submission error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred while deleting submission' 
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
      'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
