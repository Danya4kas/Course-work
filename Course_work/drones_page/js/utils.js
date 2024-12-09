function getAddressParameters() {
  let parameters = {};

  const url = new URL(window.location.href);

  url.searchParams.forEach((value, key) => {
    parameters[key] = value;
  });

  return parameters;
}
