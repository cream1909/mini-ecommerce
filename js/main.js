document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');//อ้างอิง loader 
    let allProducts = [];

    loader.style.display = 'block'; //แสดง loader ก่อนโหลด

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price.toLocaleString()} บาท</p>
            `;//เพิ่ม , ให้กับราคาที่หลักพันขึ้นไป
            productList.appendChild(card);
        });
        loader.style.display = 'none';//ซ่อน loader หลังแสดงสินค้า
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase().trim(); // Trim เพื่อลบช่องว่าง
        if (searchTerm === '') {
            displayProducts(allProducts); // โชว์สินค้าทั้งหมดถ้าไม่มีการค้นหา
            return;
        }
        const filteredProducts = allProducts.filter(product => {
            // Simple search, not very efficient
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
});