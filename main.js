const title=document.getElementById("title");
const price=document.getElementById("price");
const taxes=document.getElementById("taxes");
const ads=document.getElementById("ads");
const discount=document.getElementById("discount");
const total=document.getElementById("total");
const count=document.getElementById("count");
const category=document.getElementById("category");
const create=document.getElementById("create");
let mood="create";
let tmp;

// ######### total ############
function gitTotal(){
    if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
} else {
    total.innerHTML = '';
    total.style.background="#a00d02";
}
}

// ########### create ############
let dataPro;
if(localStorage.product !=null)
{dataPro= JSON.parse(localStorage.product);}
else
{dataPro=[];}

create.onclick=()=>{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if(mood==="create" && title.value && price.value && category.value){
        if(newPro.count>1){
        for(i=0;i<newPro.count;i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    clear();
    }else{
        dataPro[tmp]=newPro;
        clear();
        mood="create"
        count.style.display="inline";
        create.innerHTML="Create";
    }
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    read()
}

// ########## clear ###############
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

// ############### Read ############

function read(){
    let table='';
    for(let i=0 ; i < dataPro.length;i++){
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updata(${i})">Updata</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                    </tr>`;             
                }
        document.getElementById("tbody").innerHTML=table;

        let btnd=document.getElementById("dAll");
        if(dataPro.length>0){
            btnd.innerHTML=`<td><button onclick="deleteAll()">DeleteAll (${dataPro.length})</button></td>`;
        }else{
            btnd.innerHTML='';
        }
        gitTotal();
            }
read()

// ################## delete ########################
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro);
    read();
}

function deleteAll(){
    localStorage.clear;
    dataPro.splice(0);
    localStorage.product= JSON.stringify(dataPro);
    read();
}

// ################## updata ########################
function updata(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    count.style.display="none";
    create.innerHTML="Updata";
    gitTotal();
    mood="Updata";
    tmp=i;
    window.scroll({top:0,behavior:"smooth"});
}
// ############# Search ############################
let searchMood="title";
let search=document.getElementById("search");

function searchBy(id){
    id=="searchTitle"?searchMood="title":searchMood="category";
    search.placeholder=`Search be ${searchMood}`;
    search.focus();
    search.value="";
    read();

}

function Search(value){
    let table;
    for(let i=0;i<dataPro.length;i++){
            if( searchMood=="title" && (dataPro[i].title).includes(value.toLowerCase())){
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updata(${i})">Updata</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                    </tr>`;             
                }
            
        
    else if((dataPro[i].category).includes(value.toLowerCase())){
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updata(${i})">Updata</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                    </tr>`;             
                }
            
        }
    
    document.getElementById("tbody").innerHTML=table;
}