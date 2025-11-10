const http = require('http');

function req(method, path, data) {
  const body = data ? JSON.stringify(data) : null;
  const options = {
    hostname: 'localhost',
    port: 4000,
    path,
    method,
    headers: body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {}
  };
  return new Promise((resolve, reject) => {
    const r = http.request(options, res => {
      let chunks = '';
      res.setEncoding('utf8');
      res.on('data', c => (chunks += c));
      res.on('end', () => {
        try {
          const parsed = chunks ? JSON.parse(chunks) : null;
          resolve({ statusCode: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body: chunks });
        }
      });
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

(async () => {
  try {
    console.log('Creating reservation...');
    const create = await req('POST', '/api/reservations', {
      hotel: 'Hotel Plaza',
      guest: 'Juan Perez',
      roomType: 'suite',
      checkIn: '2025-12-01',
      checkOut: '2025-12-05',
      price: 450,
      status: 'booked'
    });
    console.log('Create response:', create.statusCode, create.body);

    console.log('Listing all...');
    const all = await req('GET', '/api/reservations');
    console.log('All response:', all.statusCode, all.body);

    const id = create.body && create.body.id;
    if (id) {
      console.log('Get by id:', id);
      const one = await req('GET', '/api/reservations/' + id);
      console.log('Get response:', one.statusCode, one.body);
    }
  } catch (err) {
    console.error('Request error:', err.message || err);
  }
})();
