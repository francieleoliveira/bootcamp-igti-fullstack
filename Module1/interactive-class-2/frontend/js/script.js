
let globalUsers = [];
let globalCountries = [];
let globalUsersCountries = [];


async function start(){
    // await fetchUsers();
    // await fetchCountries();

    //using promise
    await promiseUsers();
    await promiseCountries();

    hideSpinner();
    mergeUsersAndCountries();
    render();
}

async function promiseUsers(){
    return new Promise(async (resolve,reject) => {
        await fetchUsers();

        setTimeout(()=>{
            resolve();
        }, 5000);
      
    });
}

async function promiseCountries(){
    return new Promise(async (resolve,reject) => {
        await fetchCountries();

        setTimeout(()=> {
            resolve();
        }, 5000);
        
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
        const country = globalCountries.find(country => country.countryId === user.userCountry);

        const {countryName, countryFlag} = country;

        globalUsersCountries.push({
            ...user,
            countryName,
            countryFlag,
        });
    });
}

function render(){
    const divUsers = document.querySelector('#divUsers');

    divUsers.innerHTML = `
        <div class='row'>
            ${globalUsersCountries.map(({countryFlag, userPicture, userName, countryName}) => {
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

start();