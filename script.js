const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

let Username = "coalition";
let Password = "skills-test" ;

let auth = btoa(`${Username}:${Password}`);

let patientData ;

async function showData() {
  let data = await fetch(`https://fedskillstest.coalitiontechnologies.workers.dev`,
    {
      method: "GET",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    }
  );
  data = await data.json(data);
  patientData = data;

  displayData()
  
}

showData();

function displayData(){

  patientData?.map( (ele,index)=> {
      console.log( ele);
      let divtag = document.createElement('div');
      divtag.classList.add('card-slice');
      divtag.innerHTML = `<div class="left-part">
                        <div class="patient-img">
                            <img src=${ele?.profile_picture} alt="">
                        </div>
                        <div class="patient-info">
                            <p class="name">${ele?.name}</p>
                            <p>${ele?.gender}, ${ele?.age}</p>
                        </div>
                    </div>
                    <div class="right-part">
                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                    </div>`

      document.querySelector(".list-card").appendChild(divtag);
      // console.log(divtag);

      let selectedPatient = document.querySelector(".right-top");

      selectedPatient.innerHTML = `<div class="selected-patient">
                    <div class="selected-pat-img">
                        <img src=${patientData[3]?.profile_picture} alt="">
                    </div>
                   <h2>${patientData[3]?.name}</h2>
                </div>
                <div class="patient-full-info">
                        <div class="personal-info">
                            <ion-icon name="calendar-clear-outline"></ion-icon>
                            <div>
                                <p>Date of Birth</p>
                                <p>${patientData[3]?.date_of_birth}</p>
                            </div>
                        </div>
                        <div class="personal-info">
                            <ion-icon name="female-outline"></ion-icon>
                            <div>
                                <p>Gender</p>
                                <p>${patientData[3]?.gender}</p>
                            </div>
                        </div>
                        <div class="personal-info">
                            <ion-icon name="call"></ion-icon>
                            <div>
                                <p>Contact Info.</p>
                                <p>${patientData[3]?.phone_number}</p>
                            </div>
                        </div>
                        <div class="personal-info">
                            <ion-icon name="call"></ion-icon>
                            <div>
                                <p>Emergency Contacts</p>
                                <p>${patientData[3]?.emergency_contact}</p>
                            </div>
                        </div>
                        <div class="personal-info">
                            <ion-icon name="shield-half-outline"></ion-icon>
                            <div>
                                <p>Insurance Provider</p>
                                <p>${patientData[3]?.insurance_type}</p>
                            </div>
                        </div>
                </div>
                <div class="btn">
                        Show All infomation
                </div>`
  })
}




