const {BadRequestError} = require("../expressError");
const {sqlForPartialUpdate} = require("./sql");
const { SECRET_KEY } = require("../config");

describe ("sqlForPartialUpdate", ()=> {
    test ("works", () => {
        const dataToUpdate = ({
            firstName: 'Aliya', 
            age: 32
        });
        const jsToSql = ({
            firstName: "first_name",
            age: "age",
        });
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect (result).toEqual({
        setCols: '"first_name"=$1, "age"=$2',
        values: ["Aliya", 32],
        }
    );
});
});