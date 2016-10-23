class VmChecker {
  constructor(vm) {
    this.vm = vm;
    this.element = new ElementChecker(vm.$el)
  }
}

module.exports = (vm) => {
  return new VmChecker(vm);
}
