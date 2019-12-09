const color = {
  red: string => {
    return '\x1b[31m' + string + '\x1b[37m';
  },

  yellow: string => {
    return '\x1b[33m' + string + '\x1b[37m';
  },

  green: string => {
    return '\x1b[32m' + string + '\x1b[37m';
  },

  cyan: string => {
    return '\x1b[36m' + string + '\x1b[37m';
  }
}

exports.color = color
