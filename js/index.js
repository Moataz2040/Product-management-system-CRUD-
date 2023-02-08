var productName = document.getElementById("name");
var productPrice = document.getElementById("price");
var productType = document.getElementById("type");
var productDesc = document.getElementById("description");
var tbody = document.getElementById("body");
var productList;

if(localStorage.getItem("productList") == null){
    productList = []
}else{
    productList = JSON.parse(localStorage.getItem("productList"));
    display(productList);
}

function addProduct(){
    var product ={
        name:productName.value,
        price:productPrice.value,
        type:productType.value,
        desc:productDesc.value
    };
    productList.push(product);
    display(productList);
    resetForm();
    localStorage.setItem("productList",JSON.stringify(productList));
}
// list is the parameters of display we can
// add any list in display like productlist.
function display(list){
    var cartona =``;
    for(var i = 0 ; i < list.length ; i++){
        cartona = cartona + `
        <tr>
        <td>${i+1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].type}</td>
        <td>${list[i].desc}</td>
        <td>
            <button onclick ="updateProduct1(${i})" class="btn btn-warning btn-sm">Update</button>
        </td>
        <td>
            <button onclick ="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
    </tr>
    `
    }
    tbody.innerHTML = `${cartona}`;
}
function resetForm(){
    productName.value=""
    productPrice.value=""
    productType.value=""
    productDesc.value=""
}
function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productList));
    display(productList);
}
function searchByName(term) {
    var foundedItems = []
    for(var i = 0; i <productList.length;i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()) == true){
        foundedItems.push(productList[i])
        }
    }
    display(foundedItems)
}
function updateProduct1(index){
    var addButton = document.getElementById("addButton");
    addButton.innerHTML = `<button onclick="updateProduct2(${index})" class="btn btn-warning">Update</button>`
    listUpdate=JSON.parse(localStorage.getItem(`productList`));
    var product ={
        name:listUpdate[index].name,
        price:listUpdate[index].price,
        type:listUpdate[index].type,
        desc:listUpdate[index].desc
    };
    productName.value=`${product.name}`
    productPrice.value=`${product.price}`
    productType.value=`${product.type}`
    productDesc.value=`${product.desc}`
    console.log(productList)
}
function updateProduct2(index){
    var product ={
        name:productName.value,
        price:productPrice.value,
        type:productType.value,
        desc:productDesc.value
    };
    productList.splice(index,1,product);
    localStorage.setItem("productList",JSON.stringify(productList));
    display(productList);
    console.log(productList)
    resetForm();
    addButton.innerHTML = `<button onclick="addProduct()" class="btn btn-dark" >ADD</button>`
}

