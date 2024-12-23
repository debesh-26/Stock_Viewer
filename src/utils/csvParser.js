export function parseCSV(csvText) {
    const rows = csvText.split('\n');
    const headers = rows[0].split(',').map(header => 
      header.trim().replace(/"/g, '')
    );
  
    return rows.slice(1)
      .filter(row => row.trim())
      .map(row => {
        const values = row.split(',').map(value => 
          value.trim().replace(/"/g, '')
        );
        
        return headers.reduce((obj, header, index) => {
          obj[header.toLowerCase().replace(/\s+/g, '_')] = values[index];
          return obj;
        }, {});
      });
  }