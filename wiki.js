const express = require('express');
const { marked } = require('marked');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pages = {};

app.get('/', (req, res) => {
  const pageList = Object.values(pages).map(p =>
    '<li><a href="/wiki/' + p.path + '">' + p.title + '</a></li>'
  ).join('') || '<li>No pages yet</li>';

  res.send('<!DOCTYPE html><html><head><title>Cloud Links Wiki</title>' +
    '<style>body{font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px}' +
    'h1{color:#1e40af}nav{background:#f1f5f9;padding:15px;border-radius:8px;margin-bottom:20px}' +
    'li{margin:6px 0}a{color:#1e40af}</style></head>' +
    '<body><h1>Cloud Links Wiki</h1><nav><h3>Pages</h3><ul>' + pageList + '</ul></nav>' +
    '<p>A cloud authority wiki for SEO and link building knowledge.</p></body></html>');
});

app.get('/wiki/:path(*)', (req, res) => {
  const page = pages[req.params.path];
  if (!page) return res.status(404).send('Page not found');
  const html = marked(page.content || '');
  res.send('<!DOCTYPE html><html><head><title>' + page.title + ' - Cloud Links Wiki</title>' +
    '<style>body{font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px}</style></head>' +
    '<body><p><a href="/">Back</a></p><h1>' + page.title + '</h1><div>' + html + '</div></body></html>');
});

app.post('/api/pages', (req, res) => {
  const { path, title, content } = req.body;
  if (!path || !title) return res.status(400).json({ error: 'path and title required' });
  pages[path] = { path, title, content: content || '', updatedAt: new Date() };
  res.json({ success: true, path, url: '/wiki/' + path });
});

app.get('/api/pages', (req, res) => {
  res.json(Object.values(pages).map(p => ({ path: p.path, title: p.title })));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('Cloud Links Wiki running on port', PORT));
