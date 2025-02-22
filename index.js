const express = require("express");
const app = express();
const PORT = 3000;

const resultType = {
    "add": "Sum is",
    "subtract": "Difference is",
    "multiply": "Product is",
    "divide": "Quotient is",
};

function handleOperation(operation, num1, num2) {
    let res;
    if(operation === "add") res = num1 + num2;
    else if(operation === "subtract") res = num1 - num2;
    else if(operation === "multiply") res = num1 * num2;
    else if(operation === "divide") res = num1 / num2;
    else res = NaN;
    return res;
}

app.get("/:operation", (req, res) => {  // query parameters 
    const operation = req.params.operation;
    const num1 = parseInt(req.query.a);    // alt way -> destructing -> const { query: { a, b } } = req;
    const num2 = parseInt(req.query.b);
    const ans = handleOperation(operation, num1, num2);
    if(isNaN(ans)) {
        res.status(404).send("Bad Request. Invalid query or routing paramter");
    } else {
        res.send(`${resultType[operation]}: ${ans}`);
    }
});

app.listen(PORT);
