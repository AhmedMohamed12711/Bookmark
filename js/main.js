var siteName = document.getElementById('markbookName');
var siteUrl = document.getElementById('markbookURL');
var tableTitle = document.getElementById('tableTitle');
var messageinfo=document.getElementById('message-info');
var closeBtn=document.getElementById('closeBtn');
var titleList = []; // new user


if (localStorage.getItem('Titles')) { //old user
    titleList = JSON.parse(localStorage.getItem('Titles')); 
    display(); 
}

function submitButton() {
    if (siteName.value.trim() === '' || siteUrl.value.trim() === '') {
        window.alert('Please fill in both Site Name and Site URL.');
        return;
    }
    if(validation(siteName)&&validation(siteUrl)){
        var title = {
            id:Date.now(),
            Sname: siteName.value,
            Surl: siteUrl.value
        };
        titleList.push(title);
        localStorage.setItem('Titles', JSON.stringify(titleList));
        clear();
        display();
    }
    else{
        messageinfo.classList.replace('d-none','d-block')
    }

}

function clear() {
    siteName.value = null;
    siteUrl.value = null;
}

function display(list=titleList) {
    
    if (list.length === 0) {
        tableTitle.innerHTML = `<tr><td colspan="4" class="text-center">No bookmarks found</td></tr>`;
        return;
    }

    var box = '';

    for (let i = 0; i < list.length; i++) {
        box +=
            `
        <tr>
            <td class="fw-bold">${i + 1}</td>
            <td>${list[i].Sname}</td>
            <td class="vbtn">
                <button class="" onclick="window.open('${list[i].Surl}', '_blank')">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </button>
            </td>
            <td class="Dbtn">
                <button class="" onclick="deleteRow(${list[i].id})">
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
            </td>
        </tr>
        `;
    }

    tableTitle.innerHTML = box;
}

function deleteRow(id) {
    // titleList.splice(index, 1); 
    titleList=titleList.filter(function(ele){return ele.id !== id})
    localStorage.setItem('Titles', JSON.stringify(titleList)); 
    display(); 
}

function search(term){
    var searchArr=[];
    for(var i=0 ; i<titleList.length; i++){
        if(titleList[i].Sname.trim().toLowerCase().includes(term.trim().toLowerCase())){
            searchArr.push(titleList[i]);
        }
    }
    display(searchArr);
}
function validation(input) {
    var regex = {
    
        markbookName:/^\w{3,}(\s+\w+)*$/, 

        markbookURL: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\/\w\-.]*)*$/ 
    };

    if (regex[input.id] && regex[input.id].test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

function closeMessage(){
    messageinfo.classList.replace('d-block','d-none')
}