const zlib = require('zlib');
const fs = require('fs');

const readableStream = fs.createReadStream('data.txt.gz');

const gunzip = zlib.createGunzip();

const writableStream = fs.createWriteStream('decompressed.txt');

readableStream.pipe(gunzip).pipe(writableStream);

console.log('File decompression started');

writableStream.on('finish', () => {
    console.log('File has been decompressed');
});
