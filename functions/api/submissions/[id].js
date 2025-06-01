// Dynamic route for individual submission operations

// Delete a specific submission
export async function onRequestDelete(context) {
  const { request, env, params } = context;
  
  try {
    
    const submissionId = params.id;
    
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
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
