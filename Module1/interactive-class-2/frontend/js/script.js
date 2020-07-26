
let globalUsers = [];
let globalCountries = [];
let globalUsersCountries = [];
let globalFilteredUserCountries = [];


async function start(){
    // await fetchUsers();
    // await fetchCountries();

    //using promise
    // console.time('medição');
    // await promiseUsers();
    // await promiseCountries();
    // console.timeEnd('medição');

    //using fetch
    console.time('PromiseAll');
    const p1 = promiseUsers();
    const p2 = promiseCountries();
    await Promise.all([p1,p2]);
    console.timeEnd('PromiseAll');

    hideSpinner();
    mergeUsersAndCountries();
    render();

    enableFilter();
}

async function promiseUsers(){
    return new Promise(async (resolve,reject) => {
        await fetchUsers();

        setTimeout(()=>{
            resolve();
        }, 1000);
      
    });
}

async function promiseCountries(){
    return new Promise(async (resolve,reject) => {
        await fetchCountries();

        setTimeout(()=> {
            resolve();
        }, 2000);
        
    });
}

async function fetchUsers(){
    const response = await fetch('http://localhost:3002/users');
    const json = await response.json();

    globalUsers = json.map(({name,picture,login, nat}) => {
        return {
            userId: login.uuid,
            userCountry: nat,
            userName: name.first,
            userPicture: picture.large
        };
    });
}

async function fetchCountries(){
    const response = await fetch('http://localhost:3001/countries');
    const json = await response.json();

    globalCountries = json.map(({name,flag,alpha2Code}) => {
        return {
            countryId: alpha2Code,
            countryName: name,
            countryFlag: flag,
        };
    });
}

function hideSpinner(){
    document.querySelector('#spinner').classList.add('hide');
}

function mergeUsersAndCountries(){
    console.log('render');
    globalUsersCountries=[];

    globalUsers.forEach(user => {
        // const country = globalCountries.find(country => country.countryId === user.userCountry);

        const country = globalCountries.filter(
            (country) => country.countryId === user.userCountry;
        )[0];

        const {countryName, countryFlag} = country;

        globalUsersCountries.push({
            ...user,
            countryName,
            countryFlag,
        });
    });
    globalUsersCountries.sort((a,b) => a.userName.localeCompare(b.userName));
    globalFilteredUserCountries = [...globalUsersCountries]
}

function render(){
    const divUsers = document.querySelector('#divUsers');

    divUsers.innerHTML = `
        <div class='row'>
            ${globalFilteredUserCountries.map(({countryFlag, userPicture, userName, countryName}) => {
                return `
                    <div class='col s6 m4 l3'>
                        <div class='flex-row bordered'>
                            <img class='avatar' src='${userPicture}' alt='${userName}'/>
                            <div>
                                <span> ${userName}</span>
                                <img class='flag' src='${countryFlag}' alt='${countryName}'/>
                            </div>
                        </div>
                    </div>
                `;
            }
            ).join('')}
        </div>
    `
}

function enableFilter(){
    const buttonFilter = document.querySelector('#buttonFilter');
    
    buttonFilter.addEventListener('click', handleFilter);
    buttonFilter.addEventListener('keyup', handleKeyUp);
}

function handleFilter(){
    const inputFilter = document.querySelector('#inputFilter');
    const filterValue = inputFilter.value.trim();

    globalFilteredUserCountries = globalUsersCountries.filter(item => {
        return item.userName.toLowerCase().includes(filterValue);
    });

    render();
}

function handleKeyUp(event){
    const { key } = event;

    if(key !== 'Enter'){
        return;
    }

    handleFilter();
}

start();