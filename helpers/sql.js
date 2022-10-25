const { BadRequestError } = require("../expressError");

//sqlForPartial accepts data as an object
//Ex. dataToUpdate = {firstName: "Aliya", Age: 32 }
//Object.keys turns the properties into an array ["firstName", "age"]
//Missing data will throw a BadRequestError
//Or else keys.map takes the array plus it's index + 1 and turns into a SQL query and jsToSql 
//makes the JS variables into valid SQL {firstName: "age"} 
//
//Then Object.values takes the values from dataToUpdate and makes it an array: [ "Aliya", "32"]
//
//Then returns { setCols: `"first_name"=$1 , "age"=$2`, values: [ "Aliya", "32" ]} 

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
