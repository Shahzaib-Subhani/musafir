<main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <!-- Navbar -->
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
          <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Add City</li>
        </ol>
        <h6 class="font-weight-bolder mb-0">Add City</h6>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group">
            <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
            <input type="text" class="form-control" placeholder="Type here...">
          </div>
        </div>
       
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
              <h6>Add New FAQ</h6>
              <div id="cityMsg"></div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2 m-auto p-5 " style="width: 90% !important;">

            <!-- form -->
            <form role="form" id="cityForm" class="w-100">
              <label>Question : </label>
              <div class="mb-3">
                <input id="question" type="text" class="form-control" placeholder="Question">
              </div>

              <label>Answer : </label>
              <div class="mb-3">
                <input id="answer" type="text" class="form-control" placeholder="Answer">
              </div>
              
              
              <!--@ table for add dynamic fields -->
              <div class='d-flex flex-wrap justify-content-center dynamic_fields_tr' id="dynamic_fields_tr"></div>
              <div class="text-center">
                <button id="addNewCity" type="button" value="Add" class="btn bg-gradient-info w-100 mt-4 mb-3 ">Add</button>
              </div>
            </form>
            <!--@ form -->
          </div>

          <div class="px-5 mt-5 pb-5">
            <table style="width:100%" id="citiesTable">
              <thead>
                <tr class="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Question</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Status</th>
                  <th scope="col">Change Status</th>
                  
                </tr>
              </thead>
              <tbody id="citiesCollections" class="text-center text-uppercase">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<!-- <script async type="module" src="./firebase/cars.js"></script> -->

<script>
  $(document).ready(function() {
    setTimeout(() => {
      $('#citiesTable').DataTable();
    }, 2000);
  });



 
</script>



<script>
 
  const tableModuel = {};




function updateProfileStsBtn(uid, sts){
  document.getElementById("user"+uid+"1").innerText = "Loading.";
  tableModuel.updateProfileStatus(uid, sts).then(res =>{
    tableModuel.addCitiesCollection();
  })
}
 
</script>

<script type="module">
 import {addCitiesCollection} from "./firebase/faqs.js";
  tableModuel.addCitiesCollection = addCitiesCollection;

  import {
    updateProfileStatus
  } from "./firebase/faqsFunc.js"
 
  tableModuel.updateProfileStatus = updateProfileStatus;
 


 

</script>



<script type="module" src="./firebase/faqs.js"></script>