function reverseArray(arr) {
  var temp = [];
  var arrLen = arr.length;
  for(var i=1; i<=arr.length; i++) {
    temp[i-1] = arr[arrLen - i];
  }
  return temp;
}

function reverseArrayInPlace(arr) {
  var j = arr.length - 1;
  for(var i = 0; i < arr.length/2; i++) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    j--;
  }
}

console.log(reverseArray([5,4,3,2,1]));

var arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);
reverseArrayInPlace(arr);
console.log(arr)
