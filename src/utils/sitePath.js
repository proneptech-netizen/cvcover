const BASE_URL = import.meta.env.BASE_URL || '/'

export function sitePath(path = '/') {
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`
  const clean = String(path).replace(/^\/+/, '')
  return clean ? `${base}${clean}` : base
}

export function routePath(pathname = window.location.pathname) {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL
  let path = pathname
  if (base && base !== '/' && path.startsWith(base)) path = path.slice(base.length) || '/'
  path = `/${path.replace(/^\/+|\/+$/g, '')}`
  return path === '//' ? '/' : path
}
