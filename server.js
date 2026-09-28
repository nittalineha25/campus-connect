// Campus Connect - Full Stack Backend Server (Node.js Native)
// MIB Software Cluster Recruitment Challenge
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');

const CLUBS_FILE = path.join(DATA_DIR, 'clubs.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp'
};

function readJson(file) {
  try {
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading JSON from ' + file, err);
    return [];
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing JSON to ' + file, err);
    return false;
  }
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-user-email'
  });
  res.end(JSON.stringify(data));
}

function getReqUser(req, users) {
  const email = req.headers['x-user-email'] || '';
  if (!email) return null;
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
    email,
    name: email.split('@')[0],
    role: 'student',
    clubId: null
  };
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-user-email'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // API Routes
  if (pathname.startsWith('/api/')) {
    const clubs = readJson(CLUBS_FILE);
    const users = readJson(USERS_FILE);
    const currentUser = getReqUser(req, users);

    // GET /api/clubs
    if (pathname === '/api/clubs' && method === 'GET') {
      const category = parsedUrl.query.category;
      const search = (parsedUrl.query.search || '').toLowerCase().trim();
      const status = parsedUrl.query.status;
      const sort = parsedUrl.query.sort || 'deadline';

      let results = [...clubs];

      if (category && category !== 'All') {
        results = results.filter(c => c.category.toLowerCase() === category.toLowerCase() || (c.subCategory && c.subCategory.toLowerCase().includes(category.toLowerCase())));
      }

      if (search) {
        results = results.filter(c => 
          c.name.toLowerCase().includes(search) ||
          c.tagline.toLowerCase().includes(search) ||
          c.description.toLowerCase().includes(search) ||
          (c.tags && c.tags.some(t => t.toLowerCase().includes(search))) ||
          (c.recruitment && c.recruitment.roles && c.recruitment.roles.some(r => r.toLowerCase().includes(search)))
        );
      }

      if (status === 'urgent') {
        results = results.filter(c => c.urgencyLevel === 'critical' || c.urgencyLevel === 'urgent');
      }

      if (sort === 'deadline') {
        results.sort((a, b) => new Date(a.recruitment.endDate) - new Date(b.recruitment.endDate));
      } else if (sort === 'name') {
        results.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'popularity') {
        results.sort((a, b) => (b.interestedNum || 0) - (a.interestedNum || 0));
      }

      sendJson(res, 200, { success: true, count: results.length, clubs: results });
      return;
    }

    // GET /api/clubs/:id
    const clubMatch = pathname.match(/^\/api\/clubs\/([a-zA-Z0-9-]+)$/);
    if (clubMatch && method === 'GET') {
      const clubId = clubMatch[1];
      const club = clubs.find(c => c.id === clubId);
      if (!club) {
        sendJson(res, 404, { success: false, message: 'Club not found' });
        return;
      }
      sendJson(res, 200, { success: true, club });
      return;
    }

    // PUT /api/clubs/:id/recruitment - Update recruitment window & external link
    const recMatch = pathname.match(/^\/api\/clubs\/([a-zA-Z0-9-]+)\/recruitment$/);
    if (recMatch && method === 'PUT') {
      const clubId = recMatch[1];
      const club = clubs.find(c => c.id === clubId);
      if (!club) {
        sendJson(res, 404, { success: false, message: 'Club not found' });
        return;
      }

      const body = await parseRequestBody(req);
      if (body.startDate) club.recruitment.startDate = body.startDate;
      if (body.endDate) club.recruitment.endDate = body.endDate;
      if (body.displayStartDate) club.recruitment.displayStartDate = body.displayStartDate;
      if (body.displayEndDate) club.recruitment.displayEndDate = body.displayEndDate;
      if (body.externalUrl) club.recruitment.externalUrl = body.externalUrl;
      if (typeof body.isOpen === 'boolean') club.recruitment.isOpen = body.isOpen;
      if (body.statusText) club.recruitment.statusText = body.statusText;
      if (body.weeklyCommitment) club.weeklyCommitment = body.weeklyCommitment;
      if (body.tagline) club.tagline = body.tagline;

      // Add recent activity record
      if (!club.recentActivities) club.recentActivities = [];
      club.recentActivities.unshift({
        id: 'act-' + Date.now(),
        type: 'dates_updated',
        title: 'Registration dates updated',
        detail: (club.recruitment.displayStartDate || 'Sep 28') + ' – ' + (club.recruitment.displayEndDate || 'Oct 04'),
        time: 'Just now',
        status: 'completed',
        author: currentUser ? currentUser.name : 'President'
      });

      writeJson(CLUBS_FILE, clubs);
      sendJson(res, 200, { success: true, message: 'Recruitment details updated successfully', club });
      return;
    }

    // POST /api/clubs/:id/delegate - President grants posting rights to member email
    const delegateMatch = pathname.match(/^\/api\/clubs\/([a-zA-Z0-9-]+)\/delegate$/);
    if (delegateMatch && method === 'POST') {
      const clubId = delegateMatch[1];
      const club = clubs.find(c => c.id === clubId);
      if (!club) {
        sendJson(res, 404, { success: false, message: 'Club not found' });
        return;
      }

      const body = await parseRequestBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const name = (body.name || email.split('@')[0]).trim();
      const roleTitle = (body.role || 'Content Contributor').trim();

      if (!email || !email.includes('@')) {
        sendJson(res, 400, { success: false, message: 'A valid college email address is required.' });
        return;
      }

      if (!club.delegatedMembers) club.delegatedMembers = [];
      const existing = club.delegatedMembers.find(m => m.email.toLowerCase() === email);
      if (existing) {
        existing.role = roleTitle;
        existing.grantedAt = new Date().toISOString();
      } else {
        club.delegatedMembers.push({
          name,
          email,
          role: roleTitle,
          grantedAt: new Date().toISOString()
        });
      }

      // Add to users.json
      let userRecord = users.find(u => u.email.toLowerCase() === email);
      if (userRecord) {
        userRecord.role = 'delegate';
        userRecord.clubId = clubId;
        userRecord.title = roleTitle + ' (' + club.name + ')';
      } else {
        users.push({
          email,
          name,
          role: 'delegate',
          clubId,
          title: roleTitle + ' (' + club.name + ')'
        });
      }

      writeJson(CLUBS_FILE, clubs);
      writeJson(USERS_FILE, users);

      sendJson(res, 200, {
        success: true,
        message: 'Delegated posting rights successfully granted to ' + email,
        delegatedMembers: club.delegatedMembers
      });
      return;
    }

    // DELETE /api/clubs/:id/delegate/:email - Revoke delegated access
    const revokeMatch = pathname.match(/^\/api\/clubs\/([a-zA-Z0-9-]+)\/delegate\/(.+)$/);
    if (revokeMatch && method === 'DELETE') {
      const clubId = revokeMatch[1];
      const targetEmail = decodeURIComponent(revokeMatch[2]).toLowerCase();
      const club = clubs.find(c => c.id === clubId);
      if (!club) {
        sendJson(res, 404, { success: false, message: 'Club not found' });
        return;
      }

      if (club.delegatedMembers) {
        club.delegatedMembers = club.delegatedMembers.filter(m => m.email.toLowerCase() !== targetEmail);
      }

      const uIdx = users.findIndex(u => u.email.toLowerCase() === targetEmail && u.clubId === clubId);
      if (uIdx !== -1) {
        users[uIdx].role = 'student';
        users[uIdx].clubId = null;
        users[uIdx].title = 'Student';
      }

      writeJson(CLUBS_FILE, clubs);
      writeJson(USERS_FILE, users);

      sendJson(res, 200, { success: true, message: 'Revoked access for ' + targetEmail, delegatedMembers: club.delegatedMembers });
      return;
    }

    // PUT /api/clubs/:id/activity/:actId - Handle activity approval / decline
    const actMatch = pathname.match(/^\/api\/clubs\/([a-zA-Z0-9-]+)\/activity\/([a-zA-Z0-9-]+)$/);
    if (actMatch && method === 'PUT') {
      const clubId = actMatch[1];
      const actId = actMatch[2];
      const club = clubs.find(c => c.id === clubId);
      if (!club) {
        sendJson(res, 404, { success: false, message: 'Club not found' });
        return;
      }

      const body = await parseRequestBody(req);
      const action = body.action; // 'approve', 'decline'
      if (club.recentActivities) {
        const item = club.recentActivities.find(a => a.id === actId);
        if (item) {
          item.status = action === 'approve' ? 'approved' : 'declined';
          if (action === 'approve' && item.type === 'member_request') {
            club.stats.members = (club.stats.members || 0) + 1;
          }
          if (action === 'approve' && item.type === 'post_approval') {
            if (club.stats.pendingPosts > 0) club.stats.pendingPosts -= 1;
          }
        }
      }

      writeJson(CLUBS_FILE, clubs);
      sendJson(res, 200, { success: true, message: 'Activity ' + action + 'd successfully', club });
      return;
    }

    // POST /api/clubs/:id/posts - Add post / achievement
    const postMatch = pathname.match(/^\/api\/clubs\/([a-zA-Z0-9-]+)\/posts$/);
    if (postMatch && method === 'POST') {
      const clubId = postMatch[1];
      const club = clubs.find(c => c.id === clubId);
      if (!club) {
        sendJson(res, 404, { success: false, message: 'Club not found' });
        return;
      }

      const body = await parseRequestBody(req);
      const newPost = {
        id: 'post-' + Date.now(),
        title: body.title || 'Club Update',
        description: body.caption || body.description || '',
        image: body.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        year: '2026',
        event: body.event || 'Campus Connect Showcase'
      };

      if (!club.achievements) club.achievements = [];
      club.achievements.unshift(newPost);
      club.stats.projectsShipped = (club.stats.projectsShipped || 0) + 1;

      writeJson(CLUBS_FILE, clubs);
      sendJson(res, 201, { success: true, message: 'Post published to club profile!', post: newPost, club });
      return;
    }

    // GET /api/users
    if (pathname === '/api/users' && method === 'GET') {
      sendJson(res, 200, { success: true, users });
      return;
    }

    // POST /api/auth/login
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseRequestBody(req);
      const email = (body.email || '').trim().toLowerCase();
      if (!email) {
        sendJson(res, 400, { success: false, message: 'College email is required' });
        return;
      }

      let user = users.find(u => u.email.toLowerCase() === email);
      if (!user) {
        // Auto-register as student with college domain
        user = {
          email,
          name: email.split('@')[0],
          role: email.startsWith('president.') ? 'president' : 'student',
          clubId: email.startsWith('president.') ? 'robotics-club' : null,
          title: email.startsWith('president.') ? 'Club President' : '1st-Year Student'
        };
        users.push(user);
        writeJson(USERS_FILE, users);
      }

      sendJson(res, 200, { success: true, user, message: 'Welcome back, ' + user.name + '!' });
      return;
    }

    // POST /api/auth/switch-persona
    if (pathname === '/api/auth/switch-persona' && method === 'POST') {
      const body = await parseRequestBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const user = users.find(u => u.email.toLowerCase() === email);
      if (!user) {
        sendJson(res, 404, { success: false, message: 'User persona not found' });
        return;
      }
      sendJson(res, 200, { success: true, user });
      return;
    }

    // Fallback 404 for unknown API
    sendJson(res, 404, { success: false, message: 'Endpoint not found' });
    return;
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Single Page Application fallback to index.html
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
      });
      res.end(content);
    });
  });
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Campus Connect server running at http://localhost:${PORT}`);
    console.log(`   Accessible on local network and Cloudflare tunnel`);
  });
}

module.exports = server;
