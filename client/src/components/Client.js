/* eslint-disable no-undef */
function tableData(pageNo,cb) {
  return fetch(`api/tedData?page=${pageNo}`, {
    accept: "application/json"
  })
    .then(parseJSON)
    .then(cb);
}

function parseJSON(response) {
  return response.json();
}

const Client = { tableData };
export default Client;
