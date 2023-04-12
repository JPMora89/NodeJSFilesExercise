const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err,data) {
        if(err) {
            console.log("ERRORRRRRR");
            process.kill(1)
        }
        console.log(`File contents: ${data}`)
    })
}





async function webCat(url) {
    try {let res = await axios.get(url);
    console.log(res.data)
}   catch (error) {
    console.error(`Sorry: ${error}`)
    process.kill(1)
}
}

path = process.argv[2]

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}