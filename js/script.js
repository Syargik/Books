function getInfo() {
    fetch(`http://localhost:3000/books`)
        .then(res => console.log(res.json()))
}