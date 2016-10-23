class ElementChecker {
  constructor(el) {
    this.el = el;
  }

  containsText(txt) {
    expect(this.el.innerHTML).to.contain(txt)
  }
}

module.exports = (el) => {
  return new ElementChecker(el);
}