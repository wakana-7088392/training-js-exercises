
import { app, rootDirectory } from './app.js'

rootDirectory = process.argv[2] || '/tmp';
const port = process.argv[3] || 8000;

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});