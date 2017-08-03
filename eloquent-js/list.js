function arrayToList(arr) {
  if(arr.length === 0){
    return {
      value: arr[0],
      rest: null
    };
  } else {
    return {
      value: arr[0],
      rest: arrayToList(arr.slice(1))
    }
  }
}

function prepend(val, list) {
  return {
    value: val,
    rest: list
  }
}

function nth(n, list) {
  if(n === 0) return list.value;
  else return nth(n-1, list.rest);
}

var list = arrayToList([1,2,3,4,5]);

console.log(list);

console.log (nth(2, list));
