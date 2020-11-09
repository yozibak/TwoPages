const maxApi = require("max-api")

const handlers = {
  tp: n => {
    let [sequence, loop] = twoPages(n)
    let res = {'sequence': sequence, 'loop': loop}
    maxApi.outlet(res)
  }
}

maxApi.addHandlers(handlers);

const twoPages = n => {
  let [loop, seq, seq2] = part[n]
  let firstSequence = genSequence(seq)
  if(seq2){ //when multiple sequnece loop
    let secondSequence = genSequence(seq2)
    return [firstSequence.concat(secondSequence), loop]
  }
  return [firstSequence, loop]
}


const genSequence = seq => {
  let [re, st, en, type, rst, ren, tgt] = sequences[seq]
  let res
  if(type ===1){
    res = genFunc(re, st, en)
  }else if(type ===2){
    res = genFunc2(rst, ren)(re, st, en)
  }else if (type ===3){
    res = genFunc3(tgt)(re, st, en, rst, ren)
  }else{
    res = ['end']
  }
  return res
}


const genFunc = (re, st, en) => {
  let melody = riff.slice(st,en)
  if(re === 1){
    return melody
  }
  return melody.concat(genFunc(re-1, st+1, en))
}

genFunc2 = (rst,ren) => (re, st, en) => {
  const melody = riff.slice(st,en)
  if(re === 1){
    return riff.slice(rst,ren)
  }
  return melody.concat(genFunc2(rst,ren)(re-1, rst, en))
}

genFunc3 = tgt => (re,st,en,rst,ren) => {
  let [tre, tst, ten, type, trst, tren] = sequences[tgt]
  let res = genFunc2(trst, tren)(tre, tst, ten) //generate tgt sequence
  const gf3 = (re, st, en, rst, ren) => {
    const mld = res.slice(st,en) // use generated seq as melody in func2
    if(re ===1){
      return res.slice(rst,ren)
    }
    return mld.concat(gf3(re-1, rst, en, rst, ren))
  }
  let fnly = gf3(re, st, en, rst, ren)
  return fnly
}

const riff = [55, 60, 62, 63, 65] // set as index [0,1,2,3,4] in sequences

const sequences = {
  // Number: [Recursion, Start, End, Type, rst, ren, tgt]
  0: [1, 0, 5, 1], // simple recursion
  1: [2, 0, 5, 1],
  2: [3, 0, 5, 1],
  3: [4, 0, 5, 1],

  4: [2, 0, 5, 2, 2, 3], // index x recursion
  5: [2, 0, 5, 2, 2, 4],
  6: [2, 0, 5, 2, 2, 5],
  7: [3, 0, 5, 2, 2, 3],
  8: [3, 0, 5, 2, 2, 4],
  9: [3, 0, 5, 2, 2, 5],
  10:[4, 0, 5, 2, 2, 3],
  11:[4, 0, 5, 2, 2, 4], // looping tail
  12:[5, 0, 5, 2, 2, 4],
  13:[6, 0, 5, 2, 2, 4],
  14:[7, 0, 5, 2, 2, 4],
  15:[8, 0, 5, 2, 2, 4],
  16:[9, 0, 5, 2, 2, 4],
  17:[10,0, 5, 2, 2, 4],
  18:[11,0, 5, 2, 2, 4],
  19:[13,0, 5, 2, 2, 4],
  20:[15,0, 5, 2, 2, 4],
  21:[17,0, 5, 2, 2, 4],
  22:[2 ,0, 4, 2, 0, 3],

  23:[2 ,0, 7, 3, 0, 7, 22], // recursive recursion
  24:[2 ,0, 7, 3, 2, 7, 5],
  25:[3 ,0, 7, 3, 0, 7, 22],
  26:[3 ,0, 7, 3, 2, 7, 5],
  27:[4 ,0, 7, 3, 0, 7, 22],
  28:[4 ,0, 7, 3, 2, 7, 5],
  29:[5 ,0, 7, 3, 0, 7, 22],
  30:[5 ,0, 7, 3, 2, 7, 5],
  31:[6 ,0, 7, 3, 0, 7, 22],
  32:[6 ,0, 7, 3, 2, 7, 5],
  33:[7 ,0, 7, 3, 0, 7, 22],
  34:[7 ,0, 7, 3, 2, 7, 5],
  35:[8 ,0, 7, 3, 0, 7, 22],
  36:[8 ,0, 7, 3, 2, 7, 5],
  37:[9 ,0, 7, 3, 0, 7, 22],
  38:[9 ,0, 7, 3, 2, 7, 5],
  39:[10,0, 7, 3, 0, 7, 22],
  40:[10,0, 7, 3, 2, 7, 5],
  41:[12,0, 7, 3, 0, 7, 22],
  42:[12,0, 7, 3, 2, 7, 5],
  43:[14,0, 7, 3, 0, 7, 22],
  44:[14,0, 7, 3, 2, 7, 5],
  45:[16,0, 7, 3, 0, 7, 22],
  46:[16,0, 7, 3, 2, 7, 5],
  47:[18,0, 7, 3, 0, 7, 22],
  48:[18,0, 7, 3, 2, 7, 5],
  49:[20,0, 7, 3, 0, 7, 22],
  50:[39,0, 7, 3, 2, 7, 5],

  51:[2, 2, 5, 2, 2, 4],
  52:[1, 1, 5, 2, 1, 5],
  52:[2, 1, 5, 2, 1, 5],
  53:[3, 1, 5, 2, 1, 5],
  54:[4, 1, 5, 2, 1, 5],
  55:[6, 1, 5, 2, 1, 5],
  56:[7, 1, 5, 2, 1, 5],
  57:[8, 1, 5, 2, 1, 5],
  58:[10,1, 5, 2, 1, 5],
  59:[12,1, 5, 2, 1, 5],
  60:[14,1, 5, 2, 1, 5],
  61:[16,1, 5, 2, 1, 5],
  62:[18,1, 5, 2, 1, 5],
  63:[20,1, 5, 2, 1, 5],
  64:[21,1, 5, 2, 1, 5],

  65:[0, 0, 0, 4] //end
}

const part = {
  // num: [loop, seq, seq2(optional)] 
  0: [32, 0], 
  1: [18, 1],
  2: [14, 2],
  3: [15, 3],
  4: [17, 2],
  5: [22, 1],
  6: [26, 0],

  7: [26, 4],
  8: [18, 5],
  8: [11, 6],
  8: [16, 7],
  9: [14, 8],
  10:[11, 9],
  11:[7, 10],
  12:[11,11], 
  13:[6, 12],
  14:[1, 13],
  15:[1, 14],
  16:[1, 15],
  17:[1, 16],
  18:[1, 17],
  19:[1, 18],
  20:[1, 19],
  21:[1, 20],
  22:[1, 21],
  23:[1, 20],
  24:[1, 19],
  25:[1, 18],
  26:[1, 17],
  27:[1, 16],
  28:[1, 15],
  29:[7, 12], 
  30:[9, 11],
  31:[11, 8],
  32:[18, 5],
  33:[7, 22, 5], 
  34:[6, 23, 24],
  35:[3, 25, 26],
  36:[1, 27, 28],
  37:[1, 29, 30],
  38:[1, 31, 32],
  39:[1, 33, 34],
  40:[1, 35, 36],
  41:[1, 37, 38],
  42:[1, 39, 40],
  43:[1, 41, 42],
  44:[1, 43, 44],
  45:[1, 45, 46], 
  46:[1, 47, 48],
  47:[1, 49],
  48:[1, 50],

  49:[9, 52, 51], // when root changes
  50:[3, 53, 51],
  51:[4, 54, 51],
  52:[1, 55, 51],
  53:[1, 56, 51],
  54:[1, 57, 51],
  55:[1, 58, 51],
  56:[1, 59, 51],
  57:[1, 60, 51],
  58:[1, 61, 51],
  59:[1, 62, 51],
  60:[1, 63, 51],
  61:[1, 64],

  62:[14, 1],
  63:[ 7, 2],
  64:[10, 3],

  65:[1000, 65] //end
}