window.addEventListener('load', start);

var globalNames = ['Um','Dois','Três','Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
    console.log('start js')

    inputName = document.querySelector('#inputName');
    
    preventFormSubmit();
    activateInput();
    render();
    
}

function preventFormSubmit() {
    function handleFormSubmit(e){
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit',handleFormSubmit );
}

function activateInput(){
    function insertName(newName){
        globalNames.push(newName);
    }

    function updateName(newName){
        globalNames[currentIndex] = newName;
    }

    function handleTyping(event){
        if(event.key === 'Enter' && event.target.value.trim() !== ''){
            if(isEditing){
                updateName(event.target.value);
            }
            else{
                insertName(event.target.value);
            }
            
            render();
            isEditing = false;
            clearInput();
        }
            
    }

    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render(){
    function createDeleteButton(index){
        function deleteName(){
            globalNames.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'X';

        button.addEventListener('click', deleteName);

        return button;
    }

    function createSpan(name, index){
        function editItem(){
            isEditing = true;
            currentIndex = index;
            inputName.value = name;
            inputName.focus();
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = currentName;
        span.addEventListener('click', editItem);

        return span;
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');
    
    for(var i = 0 ; i < globalNames.length ; i++){
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton();
        var span = createSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputName.value ='';
    inputName.focus();

}