const CART_STORAGE_KEY = 'poisson_cart';

const Cart = {
    // Retorna todos os itens do carrinho
    getItems: () => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    // Adiciona um produto ao carrinho
    add: (product) => {
        const items = Cart.getItems();
        // Adiciona um timestamp único para permitir duplicatas se necessário, ou apenas push
        // Vamos adicionar uma propriedade interna para 'key' caso precisemos remover item específico
        const itemToAdd = {
            ...product,
            cartId: Date.now() + Math.random().toString(36).substr(2, 9)
        };

        items.push(itemToAdd);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

        // Dispara evento para atualizar contadores se houver
        window.dispatchEvent(new Event('cartUpdated'));
    },

    // Remove um produto pelo índice ou cartId
    remove: (cartId) => {
        let items = Cart.getItems();
        items = items.filter(item => item.cartId !== cartId);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(new Event('cartUpdated'));
    },

    // Limpa o carrinho
    clear: () => {
        localStorage.removeItem(CART_STORAGE_KEY);
        window.dispatchEvent(new Event('cartUpdated'));
    },

    // Calcula o total
    total: () => {
        const items = Cart.getItems();
        return items.reduce((acc, item) => acc + item.price, 0);
    },

    // Retorna qtde de itens
    count: () => {
        return Cart.getItems().length;
    }
};
