const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

const dateFnc = () => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${hour}:${min}`;
}

const messages = [
    {
      text: "Hi there!",
      user: "Amanda",
      added: dateFnc()
    },
    {
      text: "Hello Amanda!",
      user: "Charles",
      added: dateFnc()
    }
];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded( { extended: true } ));

app.get("/", (req, res) => {
    res.render("index", { title: "Mini message board", messages: messages});
})
app.get("/new", (req, res) => {
    res.render("form");
})
app.post("/new", (req, res) => {
    const { senderMsg, senderName } = req.body;
    messages.push({ text: senderMsg, user: senderName, added: dateFnc() });
    res.redirect("/");
})

app.listen(PORT, console.log(`App running on ${PORT}`));

module.exports = app;