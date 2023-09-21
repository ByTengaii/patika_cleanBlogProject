const express = require('express');
const app = express();
const port = 3000;

app.get('/', (res, req) => {
    const blog = {
        id : 1,
        tittle : "Blog tittle",
        description : "Blog description"
    }
    req.send(blog);
})

app.listen(port,() => {
    console.log(`Server start at ${port}`);
});