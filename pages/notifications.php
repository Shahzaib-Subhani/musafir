<main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <!-- Navbar -->
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
          <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Add Notification</li>
        </ol>
        <h6 class="font-weight-bolder mb-0">Add Notifcation</h6>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group">
            <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
            <input type="text" class="form-control" placeholder="Type here...">
          </div>
        </div>
        <ul class="navbar-nav  justify-content-end">


<li class="nav-item dropdown pe-2 d-flex align-items-center">
  <a href="index.php?page=profile" class="nav-link text-body p-0" >
   <img src="assets/img/avatar.png" alt="" width="25">
  </a>
  <!-- <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
    <li class="mb-2">
      <a class="dropdown-item border-radius-md" href="javascript:;">
        <div class="d-flex py-1">
          <div class="my-auto">
            <img src="assets/img/team-2.jpg" class="avatar avatar-sm  me-3 ">
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="text-sm font-weight-normal mb-1">
              <span class="font-weight-bold">New message</span> from Laur
            </h6>
            <p class="text-xs text-secondary mb-0 ">
              <i class="fa fa-clock me-1"></i>
              13 minutes ago
            </p>
          </div>
        </div>
      </a>
    </li>
    <li class="mb-2">
      <a class="dropdown-item border-radius-md" href="javascript:;">
        <div class="d-flex py-1">
          <div class="my-auto">
            <img src="assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark  me-3 ">
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="text-sm font-weight-normal mb-1">
              <span class="font-weight-bold">New album</span> by Travis Scott
            </h6>
            <p class="text-xs text-secondary mb-0 ">
              <i class="fa fa-clock me-1"></i>
              1 day
            </p>
          </div>
        </div>
      </a>
    </li>
    <li>
      <a class="dropdown-item border-radius-md" href="javascript:;">
        <div class="d-flex py-1">
          <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>credit-card</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                  <g transform="translate(1716.000000, 291.000000)">
                    <g transform="translate(453.000000, 454.000000)">
                      <path class="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                      <path class="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z">
                      </path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="text-sm font-weight-normal mb-1">
              Payment successfully completed
            </h6>
            <p class="text-xs text-secondary mb-0 ">
              <i class="fa fa-clock me-1"></i>
              2 days
            </p>
          </div>
        </div>
      </a>
    </li>
  </ul> -->
</li>
</ul>
       
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 p-5">
            <div>
              <h6>Add New Notification</h6>
              <div id="cityMsg"></div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2 m-auto p-5 " style="width: 90% !important;">

            <!-- form -->
            <form role="form" id="cityForm" class="w-100">
              <label>Title : </label>
              <div class="mb-3">
                <input id="title" type="text" class="form-control" placeholder="Title" required>
              </div>

              <label>Description : </label>
              <div class="mb-3">
                <input id="desc" type="text" class="form-control" placeholder="Description" required>
              </div>

              <label>Category : </label>
              <div class="mb-3">
                <select name="" id="category" class="form-control" required>
                    <option value="" selected disabled>Select Category</option>
                    <option value="warning">Warning</option>
                    <option value="general">General</option>
                    <option value="help">Guide/Help</option>
                </select>
              </div>

              <label>User : </label>
              <div class="mb-3 d-flex justify-content-evenly">
                <div class="usertab">
                
              <input type="radio" value="specific" name="user" id="specific">
              <label for="" id="new">Specific Users</label>
                </div>
              <div class="usertab">
              
              <input type="radio" value="all" name="user" id="all">
              <label for="">All Users</label>
              </div>
                
              </div>

              <div class="mb-3 d-flex justify-content-center">
                  <div class="multiselect">
                              <div class="selectBox" onclick="showCheckboxes()">
                                <select name="" id="userCollection" class="form-control"  required>
                                <option selected disabled value='' > Select User </option>
                                </select>
                                <div class="overSelect"></div>
                              </div>
                              <div id="checkboxes">
                                
                              </div>
                            </div>
                  </div>
              
              
              <!--@ table for add dynamic fields -->
              <div class='d-flex flex-wrap justify-content-center dynamic_fields_tr' id="dynamic_fields_tr"></div>
              <div class="text-center">
                <button id="addNewCity" type="button" value="Add" class="btn bg-gradient-info w-100 mt-4 mb-3 ">Add</button>
              </div>
            </form>
            <!--@ form -->
          </div>

         
        </div>
      </div>
    </div>
  </div>
</main>



<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<!-- <script async type="module" src="./firebase/cars.js"></script> -->

<script>
  // $(document).ready(function() {
  //   setTimeout(() => {
  //     $('#citiesTable').DataTable();
  //   }, 2000);
  // });
  function hideSection(){
   
    if(document.getElementById('specific').checked > 0){
      $('#userCollection').show();
     
    }
    if(document.getElementById('all').checked > 0){
      $('#userCollection').hide();
      
    }
  
  }

  $(document).ready(function(){
    $('#userCollection').hide();
    $('#specific').click(function(){
      hideSection();
    })
    $('#all').click(function(){
      hideSection();
    })
  })


 
  var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

 
</script>



<script>
 
  const tableModuel = {};




// function updateProfileStsBtn(uid, sts){
//   document.getElementById("user"+uid+"1").innerText = "Loading.";
//   tableModuel.updateProfileStatus(uid, sts).then(res =>{
//     tableModuel.addCitiesCollection();
//   })
// }
 
</script>

<script type="module">
 import {addCitiesCollection} from "./firebase/notification.js";
  tableModuel.addCitiesCollection = addCitiesCollection;

//   import {
//     updateProfileStatus
//   } from "./firebase/faqsFunc.js"
 
//   tableModuel.updateProfileStatus = updateProfileStatus;
 


 

</script>



