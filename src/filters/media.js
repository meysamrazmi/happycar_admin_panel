import { HTTP }  from '../common/http-common'

function media(value) {
  return HTTP.mediaUrl + value;
}

export default media