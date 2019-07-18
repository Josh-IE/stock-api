module.exports = {
  /**
   * deletePriceKey() deletes the 'price' key of all the objects
   * in the passed array.
   * @param {object} array list of objects.
   * @return {array} array list of the transformed objects.
   */
  deletePriceKey(array) {
    array.forEach(function (object, index) {
      delete object.price
    })
    return array
  }
}