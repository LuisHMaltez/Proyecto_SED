// app.js
const http = require('http');
const url = require('url');
const cors = require('cors');
const { registerUser, loginUser, authenticateToken, authorizeRole, getAllUsers, updateUser, deleteUser } = require('./auth');
const { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require('./suppliers');
const { createProduct, getAllProducts, updateProduct, deleteProduct, advancedSearch } = require('./products');
const { connectDB } = require('./db');
const { ObjectId } = require('mongodb');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('./category');

const PORT = 3000;
require('dotenv').config();

// Conectar a la base de datos
connectDB();

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.setHeader('Content-Type', 'application/json');

    const getRequestBody = async () => {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const parsedBody = body ? JSON.parse(body) : {};
                    resolve(parsedBody);
                } catch (error) {
                    reject(error);
                }
            });
            req.on('error', (error) => {
                reject(error);
            });
        });
    };

    if (method === 'OPTIONS') { 
        res.statusCode = 204; 
        return res.end();
    }


    try {
        const body = await getRequestBody();

        // Rutas de autenticación
        if (path === '/auth/register' && method === 'POST') {
            const { nombre_usuario, nombre, email, telefono, fecha_nacimiento, password, rol_id } = body;
            if (!nombre_usuario ||!nombre|| !email ||!telefono||!fecha_nacimiento|| !password || !rol_id) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Datos incompletos para el registro' }));
            }
            registerUser(nombre_usuario, nombre, email, telefono, fecha_nacimiento, password, rol_id, (err, result) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end(JSON.stringify({ error: 'Error registrando usuario' }));
                }
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Usuario registrado exitosamente', userId: result.id }));
            });
            return;
        }

        if (path === '/auth/login' && method === 'POST') {
            const { email, password } = body;
            if (!email || !password) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Datos incompletos para el login' }));
            }
            loginUser(email, password, (err, result) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end(JSON.stringify({ error: 'Error iniciando sesión' }));
                }
                if (!result) {
                    res.statusCode = 401;
                    return res.end(JSON.stringify({ error: 'Credenciales incorrectas' }));
                }
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Inicio de sesión exitoso', token: result.token }));
            });
            return;
        }

    
        // Middleware de autenticación para rutas protegidas
        if (path.startsWith('/suppliers') || path.startsWith('/products') || path.startsWith('/category') || path.startsWith('/users')) {
            authenticateToken(req, res, async () => {


                if (path === '/users' && method === 'GET') {
                    authorizeRole(['superadmin'])(req, res, () => {
                        getAllUsers((err, users) => {
                            if (err) {
                                res.statusCode = 500;
                                return res.end(JSON.stringify({ error: 'Error obteniendo usuarios' }));
                            }
                            res.statusCode = 200;
                            res.end(JSON.stringify(users));
                        });
                    });
                    return;
                }
        
                const userIdMatch = path.match(/^\/users\/([^/]+)$/);
                if (userIdMatch) {
                    const userId = userIdMatch[1];
        
                    if (method === 'PUT') {
                        authorizeRole(['superadmin', 'admin'])(req, res, () => {
                            const { nombre_usuario, nombre, email, telefono, fecha_nacimiento, rol_id, password } = body;
                            if (!nombre_usuario ||!nombre|| !email ||!telefono||!fecha_nacimiento|| !rol_id ||!password) {
                                res.statusCode = 400;
                                return res.end(JSON.stringify({ error: 'Datos incompletos para actualizar usuario' }));
                            }
                            updateUser(userId,nombre_usuario, nombre, email, telefono, fecha_nacimiento, rol_id, password, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error actualizando usuario' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }
        
                    if (method === 'DELETE') {
                        authorizeRole(['superadmin'])(req, res, () => {
                            deleteUser(userId, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error eliminando usuario' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }
                }

                // CRUD para proveedores
                if (path === '/suppliers' && method === 'GET') {
                    getAllSuppliers((err, suppliers) => {
                        if (err) {
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ error: 'Error obteniendo proveedores' }));
                        }
                        res.statusCode = 200;
                        res.end(JSON.stringify(suppliers));
                    });
                    return;
                }

                if (path === '/suppliers' && method === 'POST') {
                    authorizeRole(['superadmin', 'admin'])(req, res, () => {
                        const { name, contact_info, direccion, registro, encargado, telefono } = body;
                        if (!name || !contact_info ||!direccion||! registro||! encargado||! telefono) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ error: 'Datos incompletos para crear proveedor' }));
                        }
                        createSupplier(name, contact_info, direccion, registro, encargado, telefono, (err, result) => {
                            if (err) {
                                res.statusCode = 500;
                                return res.end(JSON.stringify({ error: 'Error creando proveedor' }));
                            }
                            res.statusCode = 201;
                            res.end(JSON.stringify(result));
                        });
                    });
                    return;
                }

                const supplierIdMatch = path.match(/^\/suppliers\/([^/]+)$/);
                if (supplierIdMatch) {
                    const supplierId = supplierIdMatch[1];

                    if (method === 'PUT') {
                        authorizeRole(['superadmin', 'admin'])(req, res, () => {
                            const { name, contact_info, direccion, registro, encargado, telefono } = body;
                            if (!name || !contact_info||!direccion||! registro||! encargado||! telefono) {
                                res.statusCode = 400;
                                return res.end(JSON.stringify({ error: 'Datos incompletos para actualizar proveedor' }));
                            }
                            updateSupplier(supplierId, name, contact_info, direccion, registro, encargado, telefono, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error actualizando proveedor' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }

                    if (method === 'DELETE') {
                        authorizeRole(['superadmin'])(req, res, () => {
                            deleteSupplier(supplierId, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error eliminando proveedor' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }
                }

                ////////////////////////////

                if (path === '/category' && method === 'GET') {
                    getAllCategories((err, category) => {
                        if (err) {
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ error: 'Error obteniendo proveedores' }));
                        }
                        res.statusCode = 200;
                        res.end(JSON.stringify(category));
                    });
                    return;
                }

                if (path === '/category' && method === 'POST') {
                    authorizeRole(['superadmin', 'admin'])(req, res, () => {
                        const { name, descripcion, ubicacion, disponible, tipo, area } = body;
                        if (!name || !descripcion || !ubicacion ||!disponible ||!tipo ||!area) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ error: 'Datos incompletos para crear proveedor' }));
                        }
                        createCategory(name, descripcion, ubicacion, disponible, tipo, area, (err, result) => {
                            if (err) {
                                res.statusCode = 500;
                                return res.end(JSON.stringify({ error: 'Error creando proveedor' }));
                            }
                            res.statusCode = 201;
                            res.end(JSON.stringify(result));
                        });
                    });
                    return;
                }

                const categoryIdMatch = path.match(/^\/category\/([^/]+)$/);
                if (categoryIdMatch) {
                    const categoryId = categoryIdMatch[1];

                    if (method === 'PUT') {
                        authorizeRole(['superadmin', 'admin'])(req, res, () => {
                            const { name, descripcion, ubicacion, disponible, tipo, area } = body;
                            if (!name || !descripcion || !ubicacion ||!disponible ||!tipo ||!area) {
                                res.statusCode = 400;
                                return res.end(JSON.stringify({ error: 'Datos incompletos para actualizar proveedor' }));
                            }
                            updateCategory(categoryId, name, descripcion, ubicacion, disponible, tipo, area, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error actualizando proveedor' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }

                    if (method === 'DELETE') {
                        authorizeRole(['superadmin'])(req, res, () => {
                            deleteCategory(categoryId, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error eliminando proveedor' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }
                }


                ////////////////////////////
                // Ruta de búsqueda avanzada de productos (debe ir antes de las rutas con parámetros)
                if (path === '/products/search' && method === 'GET') {
                    advancedSearch(parsedUrl.query, (err, results) => {
                        if (err) {
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ error: 'Error en la búsqueda avanzada de productos' }));
                        }
                        res.statusCode = 200;
                        res.end(JSON.stringify(results));
                    });
                    return;
                }

                // CRUD para productos
                if (path === '/products' && method === 'GET') {
                    getAllProducts((err, products) => {
                        if (err) {
                            console.error('Error al obtener productos:', err);
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ 
                                error: 'Error obteniendo productos',
                                details: process.env.NODE_ENV === 'development' ? err.message : undefined
                            }));
                        }
                        
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        res.end(JSON.stringify(products));
                    });
                    return;
                }

                if (path === '/products' && method === 'POST') {
                    authorizeRole(['superadmin', 'admin'])(req, res, () => {
                        const { name, price, category_id, description, stock, supplier_id } = body;

                        if (!name || !price || !category_id || !description || !stock || !supplier_id) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ error: 'Datos incompletos para crear producto' }));
                        }

                        createProduct(name, price, category_id, description, stock, supplier_id, (err, result) => {
                            if (err) {
                                res.statusCode = 500;
                                return res.end(JSON.stringify({ error: 'Error creando producto' }));
                            }
                            res.statusCode = 201;
                            res.end(JSON.stringify(result));
                        });
                    });
                    return;
                }

                const productIdMatch = path.match(/^\/products\/([^/]+)$/);
                if (productIdMatch) {
                    const productId = productIdMatch[1];

                    if (method === 'PUT') {
                        authorizeRole(['superadmin', 'admin'])(req, res, () => {
                            const { name, description, price, stock, supplier_id } = body;
                            if (!name || !description || !price || !stock || !supplier_id) {
                                res.statusCode = 400;
                                return res.end(JSON.stringify({ error: 'Datos incompletos para actualizar producto' }));
                            }
                            updateProduct(productId, name, description, price, stock, supplier_id, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error actualizando producto' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }

                    if (method === 'DELETE') {
                        authorizeRole(['superadmin'])(req, res, () => {
                            deleteProduct(productId, (err, result) => {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ error: 'Error eliminando producto' }));
                                }
                                res.statusCode = 200;
                                res.end(JSON.stringify(result));
                            });
                        });
                        return;
                    }
                }
            });
            return;
        }

        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error en el servidor' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});