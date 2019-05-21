function currency(value) {
  return parseFloat(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' تومان'
}

export default currency