const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let documents = [
  { id: 1, title: 'Sample Document', content: 'This is a sample document.', type: 'Contract', createdAt: new Date() },
];

app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.get('/api/documents/:id', (req, res) => {
  const document = documents.find(doc => doc.id === parseInt(req.params.id));
  if (!document) return res.status(404).send('Document not found');
  res.json(document);
});

app.post('/api/documents', (req, res) => {
  console.log(req.body)
  const newDocument = {
    id: documents.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  documents.push(newDocument);
  res.status(201).json(newDocument);
});

app.get('/api/document/search', (req, res) => {
  console.log(req.query)
  const query = req.query.q.toLowerCase();
  const results = documents.filter(doc => 
    doc.title.toLowerCase().includes(query) || doc.content.toLowerCase().includes(query)
  );
  console.log(results)
  res.json(results);
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));