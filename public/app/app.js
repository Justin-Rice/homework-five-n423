var _db;

function initFirebase(){
    firebase.auth().signInAnonymously()
  .then(() => {
    _db = firebase.firestore();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    _db = "";
  });
   // _db =firebase.firestore();


}

    initListenrs = () =>{
        $(".hiphop").click(function(e){
            $(".albums").html('')
            _db
            .collection("Albums")
            .where("genre" ,"==" ,"Hip hop")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    getAlbum(doc);
                   
                });
            });
        })
        $(".rb").click(function(e){
            $(".albums").html('')
            _db
            .collection("Albums")
            .where("genre" ,"==" ,"R&B")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    getAlbum(doc);
                   
                });
            });
        })

        $(".soundtrack").click(function(e){
            $(".albums").html('')
            _db
            .collection("Albums")
            .where("genre" ,"==" ,"Soundtrack")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    getAlbum(doc);
                   
                });
            });
        })

        $(".all").click(function(e){
            $(".albums").html('')
            _db
            .collection("Albums")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    getAlbum(doc);
                   
                });
            });
        })
    }

function loadData(){
    _db
    .collection("Albums")
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
           
           $(".albums").append(`
           <div class="album">
              <h1>${doc.data().title}</h1>
              <div class="cover" style="background-image: url(${doc.data().cover});">
            </div>
            <div class="cont">
              <p><span>Genre: </span>${doc.data().genre}</p>
              <p><span>Artist: </span>${doc.data().artist}</p>
            </div>



           </div>
           `)
           //console.log(doc.data()) 
        })

    }, 
    function(error){
        console.log("error", error);
    });

   

}

function getAlbum(doc){
    $(".albums").append(`
    <div class="album">
       <h1>${doc.data().title}</h1>
       <div class="cover" style="background-image: url(${doc.data().cover});">
     </div>
     <div class="cont">
       <p><span>Genre: </span>${doc.data().genre}</p>
       <p><span>Artist: </span>${doc.data().artist}</p>
     </div>
    </div>
    `)


}


$(document).ready(function(){
    try{
        let app = firebase.app();
        initFirebase();
        loadData();
        initListenrs();

    } catch{
        console.error("gwa");
    }

}); 