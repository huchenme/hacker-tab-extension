function load(callback) {
  if (process.env.NODE_ENV === 'development') {
    import('./dev-tools').finally(callback);
  } else {
    callback();
  }
}

export default load;
