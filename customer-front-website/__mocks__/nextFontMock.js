// Mock for next/font/google
module.exports = new Proxy(
  {},
  {
    get: function getter() {
      return () => ({
        className: 'mockClassName',
        variable: 'mockVariable',
        style: { fontFamily: 'mockFontFamily' },
      });
    },
  }
);
