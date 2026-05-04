export async function getProducts() {
  const res = await fetch('/api/products', { cache: 'no-store' });
  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`/api/products/${id}`, { cache: 'no-store' });
  return res.json();
}

export async function createProduct(data: any) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id: string, data: any) {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function getOrders() {
  const res = await fetch('/api/orders', { cache: 'no-store' });
  return res.json();
}

export async function updateOrderStatus(id: string, status: string) {
  const res = await fetch('/api/orders', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status }),
  });
  return res.json();
}

export async function getUsers() {
  const res = await fetch('/api/users', { cache: 'no-store' });
  return res.json();
}

export async function updateUser(uid: string, data: any) {
  const res = await fetch('/api/users', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: uid, ...data }),
  });
  return res.json();
}

export async function addToCart(userId: string, productId: string, quantity: number) {
  return fetch('/api/users', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id: userId, 
      action: 'addToCart', 
      productId, 
      quantity 
    }),
  });
}

export async function removeFromCart(userId: string, productId: string) {
  return fetch('/api/users', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id: userId, 
      action: 'removeFromCart', 
      productId 
    }),
  });
}

export async function createOrder(orderData: any) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return res.json();
}
