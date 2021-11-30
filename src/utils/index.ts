
export const isFalsy = (value : unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) =>
  value === 'undefined' ||
  value === 'null' ||
  (typeof value === 'number' && isNaN(value)) ||
  value === ''

export const cleanObject = (obj : { [key: string]: unknown})=> {
  const result = {...obj}
  Object.keys(obj).forEach(key =>{
    const value = obj[key];
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const resetRoute = () => window.location.href = window.location.origin