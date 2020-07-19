import * as yup from 'yup'
import axios from 'axios'

const YOIGO_OPERATOR_RESPONSE = {
  id: '005',
  name: 'YOIGO'
}

function checkOperator({ brand, value }) {
  return axios
    .get(`https://odissey.sta.k8s.masmovil.com/operators/mobile/${value}`, {
      headers: {
        'x-brand': brand,
      },
    })
    .then((response) => {
      return (response.data.id === YOIGO_OPERATOR_RESPONSE.id
        && response.data.name === YOIGO_OPERATOR_RESPONSE.name
        && response.data.confirmed)
    })
    .catch((error) => console.warn('error'))
}

class StringSchema extends yup.string {
  phoneNumber(msg) {
    return this.test({
      name: 'phoneNumber',
      exclusive: true,
      message: msg || 'Introduce un número de teléfono válido',
      test: (value) => value === undefined || /[6|7|8|9][0-9]{8}/.test(value),
    })
  }

  checkMobileOperator({ brand, msg }) {
    return this.test({
      name: 'checkOperator',
      exclusive: true,
      message: msg || `No es un teléfono de ${brand}`,
      test: async (value) => {
        if (/[6|7|8|9][0-9]{8}/.test(value) && value.length === 9) {
          return checkOperator({ brand, value })
        }
      },
    })
  }
}


const validators = {
  string: () => new StringSchema()
}

export default validators