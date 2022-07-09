/* ===================
    Firebase Configrations
====================== */
import {
    initializeApp,
    getAuth,
    signInWithEmailAndPassword,
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    app,
    db
} from "./config.js";






/* ===================
    Get All Users
===================== */
var userNumber = 0;

async function getAllUsers() {
    const q = query(collection(db, "users") );
    const querySnapshot = await getDocs(q);
    var usersListRow = "";
    querySnapshot.forEach((doc) => {
      userNumber += 1;
        var user = doc.data();
        // console.log(userNumber, "I am user");

        // Date Setting
        var second = user.CreatedAt?.seconds;
        var nenoseconds = user.CreatedAt?.nanoseconds;
        const fireBaseTime = new Date(
            second * 1000 + nenoseconds / 1000000,
        );
        const date = fireBaseTime.toDateString();
        const atTime = fireBaseTime.toLocaleTimeString();

        var registerAs1 = (user?.registerAs?.[0]) ?? "-";
        var registerAs2 = (user?.registerAs?.[1]) ?? "-";

        registerAs1 = registerAs1[0].toUpperCase() + registerAs1.slice(1).toLowerCase();
        registerAs2 = registerAs2[0].toUpperCase() + registerAs2.slice(1).toLowerCase();


        usersListRow += `<tr>
        <td>
          <div class="d-flex px-2 py-1">
            <div>
              <img src="${user.photo || './assets/img/avatar.png'}" class="avatar avatar-sm me-3" alt="user1">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">${user.name || "Not Set" }</h6>
              <p class="text-xs text-secondary mb-0">${user.uid || "Not Set" }</p>
            </div>
          </div>
        </td>
        <td>
         <p class="text-xs font-weight-bold  text-center  mb-0">${registerAs1 ? registerAs1: "registerAs1" }</p>
          <p class="text-xs text-secondary text-center captilize mb-0">${registerAs2 ? registerAs2: 'registerAs2' }</p>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-${user.status === true ? 'success': 'danger'}">${user.status == true ? 'Approved': 'Not Approved'}</span>
          
        </td>
        <td class="align-middle text-center">
           <span class="text-secondary  text-xs font-weight-bold">${ date !== 'Invalid Date' ? date : 'Date Not Set' }   </span>
        </td>
        <td class="align-middle text-center ">
        
          <button onclick="updateUserStsBtn('${user.uid}','${user.status}')"  id="user${user.uid}"  class='btn btn-xm p-2  bg-gradient-${user.status === true ? 'danger': 'success'}' style="margin-bottom:-0px" ${user.status === true ? "data-bs-toggle='modal' data-bs-target='#exampleModal'" : '' }  >
          ${user.status === true ? 'Disable': 'Approve'}
          </button>
        

        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm text-${user.profileStatus == "verified" ? 'success': 'danger'}">${user.profileStatus == "verified" ? 'Approved': 'Not Approved'}</span>
        </td>
        <td class="align-middle text-center ">
          <button onclick="updateProfileStsBtn('${user.uid}','${user.profileStatus}')" id="user${user.uid}1"  class='btn btn-xm p-2  bg-gradient-${user.profileStatus == "verified" ? 'warning': 'info'}' style="margin-bottom:-0px">
          ${user.profileStatus == "verified" ? 'Disable': 'Approve'}
          </button>
        </td>
      </tr>
      
      `;
    });
    document.getElementById("usersListDiv").innerHTML = usersListRow
   
}

window.onload = getAllUsers();

  export {
    getAllUsers,
    userNumber
}

let loginButton = document.getElementById("login");


/* ===========================
        Login Function
============================== */
if (loginButton) {

    loginButton.addEventListener("click", () => {

        loginButton.innerText = "Logging...";

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        const auth = getAuth(app);

        /*================================
            Authentication process
        ================================== */
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                async function checkIfUserExist(id) {
                    const q = query(collection(db, "users"), where("uid", "==", id));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        if (doc.data().role === "admin") {
                            window.localStorage.setItem("admin", JSON.stringify(doc.data()))
                            loginButton.innerText = "Login Successfull";
                            document.getElementById("loginMsg").innerHTML = "<p class='success-msg'>Login Successfull Redirecting To Dashboard...</p>";
                            setTimeout(() => {
                                window.location.href = "index.php?page=dashboard"
                            }, 1000);
                        }
                    });
                }
                checkIfUserExist(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                var errorMessage = error.message;
                errorMessage = errorMessage.split("(");
                errorMessage = errorMessage[1];
                errorMessage = errorMessage.split(")");
                errorMessage = errorMessage[0];
                errorMessage = errorMessage.split("/");
                errorMessage = errorMessage[1];
                errorMessage = errorMessage.toUpperCase();
                errorMessage = errorMessage.replaceAll("-", " ");
                let loginButton = document.getElementById("login");
                loginButton.innerText = errorMessage + "! Try Again";
                document.getElementById("loginMsg").innerHTML = `<p class='danger-msg'>${errorMessage}</p>`;
            });
    })

}


