const fs = require('fs');
const axios = require('axios');


function output(text, out) {
    if(out) {
        fs.writeFile(out, text, 'utf8', function(error){
            if(error) {
                console.error("Sorry there was an Error!")
                process.kill(1)
            }
        });
    }   else {
        console.log(text)
    }
}


function cat(path, out) {
    fs.readFile(path, 'utf8', function(err,data) {
        if(err) {
            console.log("ERRORRRRRR");
            process.kill(1)
        }
        else {
            output(data, out)
        }
        console.log(`File contents: ${data}`)
    })
}




async function webCat(url, out) {
    try {let res = await axios.get(url);
        output(res.data, out)
    console.log(res.data)
}   catch (error) {
    console.error(`Sorry: ${error}`)
    process.kill(1)
}
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}