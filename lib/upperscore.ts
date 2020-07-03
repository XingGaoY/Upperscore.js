export function eachArray<T>(obj: Array<T>, func: Function, thisArg?: any): Array<T> {
  const T = thisArg;
  // Good things here is ts is definitely typed and a lot type checking is done in compile time
  // JS polyfill has type check, more rubust

  // Notice it did not use `typeof thisArg !== undefined`, but length of args

  for (let i = 0; i < obj.length; i++) {
    func.call(T, obj[i], i, obj);
  }
  return obj;
}

export function mapArray<T>(obj: Array<T>, func: Function, thisArg?: any): Array<T> {
  const ret: Array<T> = new Array(obj.length); const
    T = thisArg;

  for (let i = 0; i < obj.length; i++) {
    const modified = func.call(T, obj[i], i, obj);
    ret[i] = modified;
  }

  return ret;
}

// here return value and initialValue is not type T
// explanation see uniTest: 'Calculate number of occurence in array'
export function reduceArray<T, K>(obj: Array<T>, func: Function, initialValue?: K): K {
  let memo: K; let
    i = 0;

  if (initialValue) {
    memo = initialValue;
  } else if (obj.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value.');
  } else {
    memo = obj[0] as any;
    i++;
  }

  for (; i < obj.length; i++) {
    memo = func(memo, obj[i], i, obj);
  }

  return memo;
}

function createPredicateIndexFinder(dir: number): Function {
  return function<T> (obj: Array<T>, predicate: Function, thisArg?: any) {
    let index = dir === 1 ? 0 : obj.length - 1;
    for (; index >= 0 && index < obj.length; index += dir) {
      const iValue = obj[index];
      if (predicate.call(thisArg, iValue, index, obj)) {
        return index;
      }
    }

    return -1;
  };
}
const findIndexArray = createPredicateIndexFinder(1);
const findLastIndexArray = createPredicateIndexFinder(-1);

export { findIndexArray, findLastIndexArray };