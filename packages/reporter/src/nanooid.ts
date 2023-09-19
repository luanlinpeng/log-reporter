
/**
 * 
 * @returns 唯一标识 
 */

export function nanooid() {

  const date = new Date();
  const y = date.getFullYear();
  let m: any = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d: any = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  const h = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return y + m + d + h + minute + second +  Math.random().toString(36).substr(2);;

}