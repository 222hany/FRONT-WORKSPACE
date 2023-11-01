//============================================팝업 포스트(방명록)============================================
function displayPosts(){
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    //localStorage안에 저장된 항목 수 만큼 반복해서 저장소에 있는 내용을 차례대로 나열하는 for문
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i); //localStorage.key(i) : localStorage에서 저장된 항목 중 i번째 항목의 key(이름)를 가져옴. key(이름)는 데이터를 식별하는 역할.
        if(key.startsWith('post-')){ //현재 진행중인 localStorage항목의 key가 post-라는 이름으로 시작하는지 확인하고 가져오기 위해 설정.
            const post = JSON.parse(localStorage.getItem(key)); //post-로 시작하는 key를 가진 항목의 값을 가져와서 JSON문자열을 JAVASCRIPT객체로 가져옴. 게시물의 데이터를 나타냄.
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href = "#" data-key = ${key}>${post.title}</a>`;
            postList.appendChild(listItem);
        }
    }
    //게시글 링크를 클릭했을때 해당 게시글을 팝업창으로 표시하는 이벤트 리스너
    const postLinks = document.querySelectorAll('#post-list a');
    //저장 된 링크들을 forEach라는 반복문을 사용해서 각 링크에 대한 이벤트 리스너를 등록
    postLinks.forEach((link)=>{
        link.addEventListener('click', (e)=>{ //이벤트 리스너는 링크가 클릭될 때 실행
            e.preventDefault(); //링크 클릭의 기본 동작을 중지. 기본 동작 : 새 창으로 이동하는 것.
            const key = link.getAttribute('data-key'); //클릭한 링크에서 data-key속성 값을 가져와서 key변수에 저장. data-key속성은 위 코드에서 게시물을 식별하기위해 사용했던 localStorage키의 속성과 동일.
            const post = JSON.parse(localStorage.getItem(key));

            //새 창을 열어 게시글 내용 표시
            /*
                window.open(url, name, specs, replace); url : 열릴 페이지의 url. name : 팝업창 이름을 지정. specs :팝업창의 속성이나 설정. replace : 브라우저 기록에 대한 옵션.
            */
            const popupWindow = window.open('', '', 'width=400, height=400');
            popupWindow.document.write(`<h2>${post.title}</h2>`);
            popupWindow.document.write(`<p>${post.content}</p>`);
        });
    });                             
}

document.getElementById('add-post').addEventListener('click', ()=>{
    const popupWindow = window.open('', '', 'width=400, height=400');
    const popupDocument = popupWindow.document;

    //게시글 작성 양식 추가
    popupDocument.write('<h2>게시글 작성</h2>');
    popupDocument.write('<input type = "text" id = "post-title" placeholder = "제목"><br>');
    popupDocument.write('<textarea id = "post-content" placeholder = "내용"></textarea><br>');
    popupDocument.write('<button id = "save-post">저장</button>');

    //저장 버튼을 클릭하면 새로운 게시물을 저장하고 목록 갱신
    popupDocument.getElementById('save-post').addEventListener('click', ()=>{
        const title = popupDocument.getElementById('post-title').value;
        const content = popupDocument.getElementById('post-content').value;

        if(title && content){ //게시물 제목과 내용이 비어있지 않은지 검사. 제목과 내용중 하나라도 입력해야 if문 블록 내 코드가 실행. 입력필드가 비어있을때 게시물을 저장하지 않도록 하기위함.
            const postKey = `post-${Date.now()}`; //새로운 게시물을 저장하기 위해 고유한 key(이름)생성. Date.now()함수를 사용하여 현재 시간을 이용해 고유한 키를 생성, localStorage에서 게시물을 식별하는데 사용.
            const post = {title, content};
            localStorage.setItem(postKey, JSON.stringify(post));
            displayPosts();
            popupWindow.close();
        }
    });
});

//초기 게시글 목록 표시
displayPosts();

//============================================이미지 페이지네이션============================================
const images = [
    '../Pagination/image/이가을 (1).jpg',
    '../Pagination/image/이가을 (2).jpg',
    '../Pagination/image/이가을 (3).jpg',
    '../Pagination/image/이가을 (4).jpg',
    '../Pagination/image/이가을 (5).jpg'
];

const imagesPerpage = 3; //한 페이지에 표시될 이미지 수
let currentPage = 0; //현재 페이지를 나타내는 변수. 초기값은 0으로 설정하여 첫 번째 페이지를 표시.
const imageContainer = document.querySelector('.img-container'); //이미지가 표시 될 div 공간
const prevButton = document.getElementById('prevPage'); //이전 버튼
const nextButton = document.getElementById('nextPage'); //다음 버튼

function displayImg(page){ //이미지 표시 함수의 시작
    const startIndex = page * imagesPerpage; //현재 페이지 번호('page')와 페이지 당 이미지 수('imagePerpage')를 곱해 시작 인덱스를 계산. 페이지 내에서 표시할 이미지의 첫 번째 인덱스.
    const endIndex = startIndex + imagesPerpage; //시작 인덱스에 페이지 당 이미지 수를 더해 종료 인덱스를 계산. 페이지 내에서 표시할 마지막 이미지 다음 인덱스를 나타냄.
    const pageImages = images.slice(startIndex, endIndex); //이미지 배열('images')에서 시작인덱스와 종료인덱스 사이의 이미지를 추출해서 pageImages 배열에 저장. 이 배열은 현재 페이지에 표시 될 이미지들을 담고있음.
    
    imageContainer.innerHTML = ''; //이미지를 표시해 줄 컨테이너 초기화.
    
    pageImages.forEach(images=>{ //배열에 있는 이미지들을 반복해서 처리.
        const imgElement = document.createElement('img'); //각 이미지를 표시하기 위한 <img> 태그 요소를 생성.
        imgElement.src = images; //<img> 태그에 src 속성의 images(현재 이미지의 파일 경로)로 설정.
        imgElement.classList.add('image'); //<img> 태그에 image 클래스를 추가해서 추후 이미지 스타일을 적용할 예정.
        imageContainer.appendChild(imgElement);
    });
}

//버튼 업데이트
function updateButtons(){
    //prevButton.disabled : 이전 버튼 활성화 비활성화 시키는 기능을 나타냄. 첫 번째 페이지일 경우에는 이전 버튼을 비활성화 시켜서 이전 버튼을 클릭하지 못하게 막는다.
    prevButton.disabled = currentPage ===0;
    
    nextButton.disabled = (currentPage + 1) * imagesPerpage >= images.length;
}

//이전 버튼에 대한 클릭 이벤트. 사용자가 이전 버튼을 클릭할 때 이 함수가 실행됨.
prevButton.addEventListener('click', ()=>{
    if(currentPage > 0){ //현재 페이지 번호가 0보다 클 경우에만 실행.
        currentPage --;  //현재 페이지 번호에서 하나를 감소시킴.
        displayImg(currentPage); //현재 페이지에 해당하는 새로운 이미지를 표시.
        updateButtons(); //이전 버튼이 첫 번째 페이지에서 클릭하게 되면 더 이상 이전 버튼으로 가지 못하도록 이전 버튼을 비활성화 시킴.
    }
});

nextButton.addEventListener('click', ()=>{
    if((currentPage + 1) * imagesPerpage < images.length){ //현재 페이지에서 다음 페이지로 이동할 수 있는지 확인
        currentPage++; //현재 페이지의 번호를 하나 증가시켜 다음 페이지로 이동하게 함
        displayImg(currentPage);
        updateButtons();
    }
})

displayImg(currentPage);
updateButtons();

//============================================이미지 업로드============================================
document.getElementById("uploadButton").addEventListener("click", function(){
    var fileInput = document.getElementById("fileInput");
    var uploadImage = document.getElementById("uploadImage");
    var imageContainer = document.getElementById("imageContainer");

    if(fileInput.files.length > 0){
        var file = fileInput.files[0]; //파일 입력 필드에서 선택한 파일 목록 중 첫 번째 파일을 가져온 후 마치 사용자가 한 파일만 선택한 것처럼 보이게 함.
        var reader = new FileReader(); //현재는 빈 값. 빈 값인 파일을 읽기 위한 FileReader() 객체를 생성한 것일 뿐

        reader.onload = function (e){  //FileReader()에는 onload라는 메서드가 존재. 파일 읽기가 완료 될 때 호출.
            uploadImage.src = e.target.result; //업로드 된 이미지를 표시. uploadImage.src : 이미지 주소를 추가. e.target.result : FileReader()가 읽은 파일의 데이터 URL을 나타냄.
            imageContainer.style.display = "block"; //imageContainer에 스타일을 적용하여 이미지를 보여줌.
        };
        reader.readAsDataURL(file); //FileReader()를 사용하여 선택한 file을 DataURL로 읽은 후 문자열로 표현하여 표시.
    }else{
        alert("이미지 파일을 선택하세요.");
    }
})

//===========================================할 일 목록 체크박스=============================================
const result = document.getElementById("result");
const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const list3 = document.getElementById("list3");

list1.addEventListener("change", updateResult);
list2.addEventListener("change", updateResult);
list3.addEventListener("change", updateResult);