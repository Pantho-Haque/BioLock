const server_ip="127.0.0.1:4444";


export function databaseWrite(filename, data) {
  fetch(`http://${server_ip}/database/${filename}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error(error));
}
